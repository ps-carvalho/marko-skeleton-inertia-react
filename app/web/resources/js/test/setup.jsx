import '@testing-library/jest-dom/vitest';
import React, { useState } from 'react';
import { beforeEach, vi } from 'vitest';

const inertiaState = {
  formErrors: {},
  formPost: vi.fn(),
  page: {
    component: 'Dashboard',
    props: {
      user: {
        name: 'Marko User',
        email: 'demo@example.com',
      },
    },
  },
  routerPost: vi.fn(),
};

globalThis.__markoInertiaReact = inertiaState;

vi.mock('@inertiajs/react', () => ({
  Head: ({ title }) => React.createElement('title', null, title),
  Link: ({ href, children, ...props }) =>
    React.createElement('a', { href, ...props }, children),
  router: {
    post: (...args) => globalThis.__markoInertiaReact.routerPost(...args),
  },
  useForm: (initialData) => {
    const [data, setDataState] = useState(initialData);

    return {
      data,
      errors: globalThis.__markoInertiaReact.formErrors,
      processing: false,
      post: globalThis.__markoInertiaReact.formPost,
      setData: (key, value) =>
        setDataState((current) => ({ ...current, [key]: value })),
    };
  },
  usePage: () => globalThis.__markoInertiaReact.page,
}));

beforeEach(() => {
  inertiaState.formErrors = {};
  inertiaState.formPost.mockClear();
  inertiaState.routerPost.mockClear();
  inertiaState.page = {
    component: 'Dashboard',
    props: {
      user: {
        name: 'Marko User',
        email: 'demo@example.com',
      },
    },
  };
});
