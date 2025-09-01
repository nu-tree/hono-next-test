import { TodoList } from '@/components/pages/todos/todo-list';
import { honoClient } from '@/lib/hono/client/hono-client';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/todos`);
  console.log(res);
  console.log(res.body);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">할일 목록</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
