import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { todoNameSchema, type TodoNameForm } from '@/schemas/todo-schema';
import { useCreateTodo } from '@/hooks/useCreateTodo';

interface AddTodoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTodoModal({ open, onOpenChange }: AddTodoModalProps) {
  const createTodo = useCreateTodo();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoNameForm>({
    resolver: zodResolver(todoNameSchema),
  });

  const onSubmit = (data: TodoNameForm) => {
    createTodo.mutate(data.name, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Todo Name</Label>
            <Input id="name" placeholder="Enter todo name..." {...register('name')} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={createTodo.isPending}>
              {createTodo.isPending ? 'Creating...' : 'Submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
