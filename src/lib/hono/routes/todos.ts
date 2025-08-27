import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createTodoSchema } from '../schemas/todo-schema';

// 메모리 저장소 (나중에 전역으로 이동 가능)
let todos: Array<{ id: number; title: string; completed: boolean }> = [];
let nextId = 1;

const todosRoute = new Hono()
  .get('/', (c) => {
    return c.json({ todos });
  })
  .get('/:id', (c) => {
    const id = Number(c.req.param('id'));
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404);
    }

    return c.json({ todo });
  })
  .post('/', zValidator('json', createTodoSchema), async (c) => {
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
