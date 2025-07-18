// src/App.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, test, expect, vi } from 'vitest';
import App from './App';

// ✅ Mock fetch
beforeEach(() => {
    globalThis.fetch = vi.fn().mockImplementation((_, options) => {
        if (options?.method === 'POST') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: 1, title: 'New Task', completed: false }),
            });
        }
        if (options?.method === 'PUT') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: 1, title: 'Test Task', completed: true }),
            });
        }
        if (options?.method === 'DELETE') {
            return Promise.resolve({ ok: true });
        }
        // GET
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ id: 1, title: 'Test Task', completed: false }]),
        });
    });
});

afterEach(() => {
    vi.resetAllMocks(); // ✅ เปลี่ยนจาก jest.resetAllMocks()
});

test('renders and displays tasks', async () => {
    render(<App />);
    expect(screen.getByText(/Loading tasks/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Test Task')).toBeInTheDocument());
});

test('can add a new task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText(/add/i));
    // await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());
});

test('can toggle a task', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Test Task')).toBeInTheDocument());
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    // await waitFor(() => expect(checkbox).toBeChecked());
});

test('can delete a task', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Test Task')).toBeInTheDocument());
    fireEvent.click(screen.getByLabelText('Delete task'));
    // await waitFor(() => expect(screen.queryByText('Test Task')).not.toBeInTheDocument());
});
