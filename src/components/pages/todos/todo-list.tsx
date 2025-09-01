'use client';

import { useState } from 'react';
import { honoClient } from '@/lib/hono/client/hono-client';
import type { Todo } from '@/lib/hono/schemas/todo-schema';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await honoClient.api.todos.$get();
    const data = await res.json();
    setTodos(data.todos);
    console.log(data); // 타입 안전!
  };

  const createTodo = async () => {
    const res = await honoClient.api.todos.$post({
      json: { title: 'New todo' },
    });

    if (res.ok) {
      fetchTodos();
    }
  };

  return (
    <div className="p-4">
      <button onClick={fetchTodos} className="px-4 py-2 bg-blue-500 text-white">
        할 일 조회
      </button>
      <button onClick={createTodo} className="px-4 py-2 bg-green-500 text-white">
        할 일 추가
      </button>

      <div className="mt-4">
        {todos.map((todo) => (
          <div key={todo.id} className="p-2 border">
            {todo.title}
          </div>
        ))}
      </div>
    </div>
  );
};
