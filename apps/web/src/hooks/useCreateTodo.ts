import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TodoDTO, fromTodoDTO, type Todo } from '@repo/shared-models';

import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/api-client';

async function createTodo(name: string): Promise<Todo> {
  const res = await api.post('/api/todos', { name });
  const dto = TodoDTO.parse(res.data);
  return fromTodoDTO(dto);
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', userId] });
    },
    onError: () => {
      toast.error('Failed to create todo. Please try again.');
    },
  });
}
