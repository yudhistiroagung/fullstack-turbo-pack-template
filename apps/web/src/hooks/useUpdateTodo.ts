import { useMutation, useQueryClient } from '@tanstack/react-query';
import { config } from '@/config';
import type { Todo } from './useTodos';

interface UpdateTodoFields {
  status?: 'pending' | 'done';
  name?: string;
}

async function updateTodo(id: string, fields: UpdateTodoFields): Promise<Todo> {
  const res = await fetch(`${config.apiUrl}/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, fields }: { id: string; fields: UpdateTodoFields }) =>
      updateTodo(id, fields),
    onMutate: async ({ id, fields }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old?.map((todo) =>
          todo._id === id ? { ...todo, ...fields } : todo,
        ),
      );

      return { previousTodos };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
