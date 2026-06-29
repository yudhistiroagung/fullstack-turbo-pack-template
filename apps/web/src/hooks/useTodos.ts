import { useQuery } from '@tanstack/react-query';
import { config } from '@/config';

export interface Todo {
  _id: string;
  name: string;
  status: 'pending' | 'done';
  createdAt?: string;
  updatedAt?: string;
}

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${config.apiUrl}/api/todos`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  const data = await res.json();
  return data.todos;
}

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
}
