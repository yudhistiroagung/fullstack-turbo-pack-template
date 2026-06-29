import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTodos } from '@/hooks/useTodos';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { AddTodoModal } from '@/components/AddTodoModal';

export function TodoTable() {
  const { data: todos, isLoading, error } = useTodos();
  const updateTodo = useUpdateTodo();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return <p className="text-center text-muted-foreground py-8">Loading todos...</p>;
  }

  if (error) {
    return <p className="text-center text-destructive py-8">Failed to load todos.</p>;
  }

  const filteredTodos = (todos ?? []).filter((todo) =>
    todo.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleMarkDone = (id: string) => {
    updateTodo.mutate({ id, fields: { status: 'done' } });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Add Todo row */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setModalOpen(true)}>Add Todo</Button>
      </div>

      {/* Empty state */}
      {(!todos || todos.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <p className="text-lg text-muted-foreground">no todo yet</p>
          <Button onClick={() => setModalOpen(true)}>Add Todo</Button>
        </div>
      )}

      {/* Todo table */}
      {todos && todos.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTodos.map((todo) => (
              <TableRow key={todo._id}>
                <TableCell
                  className={todo.status === 'done' ? 'line-through text-muted-foreground' : ''}
                >
                  {todo.name}
                </TableCell>
                <TableCell>
                  {todo.status !== 'done' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkDone(todo._id)}
                      disabled={updateTodo.isPending}
                    >
                      Done
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
            {filteredTodos.length === 0 && search && (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground">
                  No todos match "{search}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <AddTodoModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
