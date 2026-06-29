import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { authClient } from '@/lib/auth-client';

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const { data } = await authClient.getSession();

    if (!data?.user && location.pathname !== '/login') {
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <>
      <Toaster />
      <Outlet />
    </>
  ),
});
