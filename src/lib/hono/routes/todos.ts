import { Hono } from 'hono';

// 메모리 저장소 (나중에 전역으로 이동 가능)
let todos: Array<{ id: number; title: string; completed: boolean }> = [];
let nextId = 1;

const todosRoute = new Hono();

todosRoute.get('/', (c) => {
  return c.json({ todos });
});

todosRoute.get('/:id', (c) => {
  const id = Number(c.req.param('id'));
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json({ todo });
});

todosRoute.post('/', async (c) => {
  const { title } = await c.req.json();

  const todo = {
    id: nextId++,
    title,
    completed: false,
  };

  todos.push(todo);
  return c.json({ todo }, 201);
});

export default todosRoute;
