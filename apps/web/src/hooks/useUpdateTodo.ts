import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TodoDTO, fromTodoDTO, type Todo } from '@repo/shared-models';

import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/api-client';

interface UpdateTodoFields {
  status?: 'pending' | 'done';
  name?: string;
}

async function updateTodo(id: string, fields: UpdateTodoFields): Promise<Todo> {
  const res = await api.patch(`/api/todos/${id}`, fields);
  const dto = TodoDTO.parse(res.data);
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
