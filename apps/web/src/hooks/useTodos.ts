import { useQuery } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/api-client';
import { TodoDTO, fromTodoDTO, type Todo } from '@repo/shared-models';
import { z } from 'zod';

async function fetchTodos(): Promise<Todo[]> {
  const res = await api.get('/api/todos');
  const parsed = z.array(TodoDTO).parse(res.data.todos);
  return parsed.map(fromTodoDTO);
}

export function useTodos() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ['todos', userId],
    queryFn: fetchTodos,
    enabled: !!userId,
  });
}
