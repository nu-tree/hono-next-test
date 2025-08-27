// route.ts
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import todosRoute from '@/lib/hono/routes/todos';
import { logger } from '@/lib/hono/middleware/logger';

const app = new Hono().basePath('/api');
app.use('*', logger);

const router = app.route('/todos', todosRoute);

const handler = handle(app);
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };

export type AppType = typeof router;
