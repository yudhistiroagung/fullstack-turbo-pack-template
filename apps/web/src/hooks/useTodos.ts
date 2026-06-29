import { useQuery } from '@tanstack/react-query';
import { config } from '@/config';
import { authClient } from '@/lib/auth-client';

export interface Todo {
  _id: string;
  name: string;
  status: 'pending' | 'done';
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${config.apiUrl}/api/todos`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch todos');
  const data = await res.json();
  return data.todos;
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
