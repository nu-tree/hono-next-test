import { logger } from '@/lib/hono/middleware/logger';
import todosRoute from '@/lib/hono/routes/todos';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app.use('*', logger);

app.get('/hello', (c) => {
  return c.json({ message: 'Hello, World!' });
});

app.route('/todos', todosRoute);

const handler = handle(app);
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

export type AppType = typeof app;
