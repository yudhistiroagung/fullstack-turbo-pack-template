import { createFileRoute } from '@tanstack/react-router';
import { greet } from '@repo/shared-utils';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-4">{greet('TanStack!')}</h1>
      <p className="text-lg mb-2">
        App Title: {import.meta.env.VITE_APP_TITLE}
      </p>
      <p className="text-lg mb-4">
        App Version: {import.meta.env.VITE_APP_VERSION}
      </p>
      <p className="text-muted-foreground mb-6">
        API URL: {import.meta.env.VITE_API_URL}
      </p>
      <Button>Click Me!</Button>
    </div>
  );
}
