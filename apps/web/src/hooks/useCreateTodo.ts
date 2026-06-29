import { useMutation, useQueryClient } from '@tanstack/react-query';
import { config } from '@/config';
import type { Todo } from './useTodos';

async function createTodo(name: string): Promise<Todo> {
  const res = await fetch(`${config.apiUrl}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
