import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import AppLayout from '../layouts/AppLayout';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Login from './Login';
import Profile from './Profile';

const user = {
  name: 'Marko User',
  email: 'demo@example.com',
  role: 'Admin',
  joined: 'January 2024',
  location: 'San Francisco, CA',
  bio: 'Full-stack developer exploring Marko.',
};

describe('React skeleton pages', () => {
  test('Landing renders the primary calls to action', () => {
    render(<Landing />);

    expect(screen.getByText('Marko Inertia React')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Open dashboard' }),
    ).toHaveAttribute('href', '/dashboard');
  });

  test('Login submits credentials through Inertia form state', () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('demo@example.com'), {
      target: { value: 'demo@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(globalThis.__markoInertiaReact.formPost).toHaveBeenCalledWith(
      '/login',
    );
  });

  test('Dashboard renders user data and activity props', () => {
    render(
      <Dashboard
        user={user}
        chartData={[45, 62, 38]}
        activities={[{ title: 'Deployment complete', time: '2 hours ago' }]}
      />,
    );

    expect(screen.getByText('Welcome back, Marko User!')).toBeInTheDocument();
    expect(screen.getByText('Deployment complete')).toBeInTheDocument();
  });

  test('Profile renders account details', () => {
    render(<Profile user={user} />);

    expect(screen.getByText('demo@example.com')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  test('AppLayout renders navigation and posts logout', () => {
    render(
      <AppLayout>
        <p>Child page</p>
      </AppLayout>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));

    expect(screen.getByText('Child page')).toBeInTheDocument();
    expect(globalThis.__markoInertiaReact.routerPost).toHaveBeenCalledWith(
      '/logout',
    );
  });
});
