import { useMutation, useQueryClient } from '@tanstack/react-query';
import { config } from '@/config';
import { authClient } from '@/lib/auth-client';
import { TodoDTO, fromTodoDTO, type Todo } from '@repo/shared-models';

interface UpdateTodoFields {
  status?: 'pending' | 'done';
  name?: string;
}

async function updateTodo(id: string, fields: UpdateTodoFields): Promise<Todo> {
  const res = await fetch(`${config.apiUrl}/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to update todo');
  const data = await res.json();
  const dto = TodoDTO.parse(data);
  return fromTodoDTO(dto);
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: ({ id, fields }: { id: string; fields: UpdateTodoFields }) =>
      updateTodo(id, fields),
    onMutate: async ({ id, fields }) => {
      await queryClient.cancelQueries({ queryKey: ['todos', userId] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos', userId]);

      queryClient.setQueryData<Todo[]>(['todos', userId], (old) =>
        old?.map((todo) =>
          todo._id === id ? { ...todo, ...fields } : todo,
        ),
      );

      return { previousTodos };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos', userId], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', userId] });
    },
  });
}
