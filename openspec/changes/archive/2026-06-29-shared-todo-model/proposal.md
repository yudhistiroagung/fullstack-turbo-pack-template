## Why

The `Todo` type is currently defined in a frontend hook file (`useTodos.ts`) and imported by other hooks through relative paths. On the backend, the repository layer returns raw MongoDB documents with no shape validation. This creates a fragile contract — any DB schema change silently breaks the frontend at runtime. A shared Zod-validated Todo model, consumed by both API and web, provides a single source of truth and catches mismatches at the parsing boundary.

## What Changes

- Create a new `@repo/shared-models` workspace package with Zod schemas for the `Todo` model
- Derive TypeScript types from Zod schemas (single source of truth)
- **API**: Parse raw MongoDB documents through `TodoSchema` in the repository layer before returning to service/handler
- **Web**: Parse API responses through `TodoSchema` in the fetch layer before returning to hooks
- Remove the inline `Todo` interface from `useTodos.ts`; all consumers import from `@repo/shared-models`
- Add `@repo/shared-models` dependency to both `apps/api` and `apps/web`

## Capabilities

### New Capabilities

- `shared-todo-schema`: Shared Zod-validated Todo model package that defines the canonical Todo shape, derived TypeScript type, and parsing utilities used by both API repository layer and web fetch layer.

### Modified Capabilities

<!-- No existing specs change behavior -- this is a structural refactor under the hood. -->

## Impact

- Affected packages: `packages/shared-models` (new), `apps/api`, `apps/web`
- All files importing `Todo` type from `./useTodos` need import path updated
- API repository layer gains Zod parsing (`TodoSchema.parse()`) on return values
- Web fetch functions gain Zod parsing on response bodies
- Build: turbo pipeline must build `@repo/shared-models` before `apps/api` and `apps/web`
