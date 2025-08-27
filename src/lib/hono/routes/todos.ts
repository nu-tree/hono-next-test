import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createTodoSchema } from '../schemas/todo-schema';
import { createFactory } from 'hono/factory';

// 메모리 저장소 (나중에 전역으로 이동 가능)
let todos: Array<{ id: number; title: string; completed: boolean }> = [];
let nextId = 1;
// lib/hono/routes/todos.ts

const factory = createFactory();

// 개별 핸들러들
const getTodos = factory.createHandlers((c) => {
  return c.json({ todos });
});

const getTodo = factory.createHandlers((c) => {
  const id = Number(c.req.param('id'));
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json({ todo });
});

const createTodo = factory.createHandlers(zValidator('json', createTodoSchema), async (c) => {
  const { title } = c.req.valid('json');
  const todo = {
    id: nextId++,
    title,
    completed: false,
  };
  todos.push(todo);
  return c.json({ todo }, 201);
});

// 라우트 구성
const todosRoute = new Hono()
  .get('/', ...getTodos)
  .get('/:id', ...getTodo)
  .post('/', ...createTodo);

export default todosRoute;
