import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { TodoTable } from '@/components/TodoTable';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data } = authClient.useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authClient.signOut();
    navigate({ to: '/login' });
  };

  const userName = data?.user?.name ?? data?.user?.email ?? 'User';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Hello, {userName}!</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <TodoTable />
      </div>
    </div>
  );
}
