## Context

The `Todo` TypeScript interface is currently defined in `apps/web/src/hooks/useTodos.ts` and imported via relative paths by `useCreateTodo.ts` and `useUpdateTodo.ts`. The API repository (`TodoRepository`) returns raw MongoDB documents without any shape validation — `find().toArray()` and `findOne()` return untyped documents. This means:

- The frontend trusts the API response shape implicitly. If the DB document shape changes, the frontend breaks silently at runtime.
- The backend has no type-safe boundary between the database and the service/handler layer.
- There is no single source of truth for the `Todo` schema — the type is defined ad-hoc in a hook file.

The monorepo already has a `packages/shared-utils` directory structure, but no shared types package.

## Goals / Non-Goals

**Goals:**
- Define the canonical `Todo` schema using Zod in a shared package (`@repo/shared-models`)
- Export a derived TypeScript type from the Zod schema (single source of truth)
- Parse MongoDB documents through the schema in the API repository layer
- Parse API response bodies through the schema in the web fetch layer
- Remove the inline `Todo` interface from `useTodos.ts`

**Non-Goals:**
- Do not introduce runtime validation for `userId`, `createdAt`, `updatedAt` — these are auxiliary fields
- Do not create Zod schemas for other models (e.g., User, Session) — Todo only
- Do not change API response shapes or endpoint contracts

## Decisions

### Decision 1: New package `@repo/shared-models` (not extend `@repo/shared-utils`)

**Rationale:** `@repo/shared-utils` currently exports utility functions. Mixing Zod schemas/types with utilities blurs package boundaries. A separate `@repo/shared-models` package gives clear ownership and allows the package to depend on `zod` without forcing `@repo/shared-utils` users to pull in Zod.

**Alternative considered:** Add schemas to `@repo/shared-utils`. Rejected because it couples unrelated concerns and adds a `zod` dependency to any consumer of shared utilities.

### Decision 2: Zod `parse()` at boundary layers (not `.safeParse()`)

**Rationale:** Shape mismatches at the DB or API boundary indicate a bug — they should throw hard and fast, not silently degrade. This aligns with the fail-fast principle. If parsing fails, the error surfaces immediately with a clear message about what field mismatch occurred.

**Alternative considered:** `.safeParse()` and fallback behavior. Rejected because a schema mismatch is a programmer error, not a recoverable runtime condition.

### Decision 3: Schema exports both `TodoSchema` and `Todo` type

**Rationale:** The Zod `z.infer<typeof TodoSchema>` pattern gives us a TypeScript type derived from the runtime schema. Consumers import `Todo` (the type) for TypeScript compilation and `TodoSchema` for runtime parsing. This ensures type definitions never drift from the schema.

### Decision 4: Keep `_id` as string type (not `ObjectId`)

**Rationale:** MongoDB's `ObjectId` is a BSON type that serializes to a string over JSON. The web only sees strings. The shared schema should reflect the JSON representation. The API repository will convert `_id` to string before parsing.

## Risks / Trade-offs

- **Risk:** Zod `parse()` adds runtime overhead on every repository read and every API response. **Mitigation:** Zod v4 parsing is fast (~microseconds); the overhead is negligible compared to network/DB latency. For batch operations, parsing per-document is acceptable given typical todo list sizes.
- **Risk:** `@repo/shared-models` introduces a new workspace package, increasing build complexity. **Mitigation:** Proper turbo pipeline configuration ensures `shared-models` builds first, then apps depend on its output.
