// route.ts
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import todosRoute from '@/lib/hono/routes/todos';
import { logger } from '@/lib/hono/middleware/logger';
import { rateLimiter } from 'hono-rate-limiter';

const app = new Hono().basePath('/api');
// Apply the rate limiting middleware to all requests.
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => c.req.header('x-api-key') || 'anonymous',
  })
);
app.use('*', logger);
const routes = app.route('/todos', todosRoute);

const handler = handle(app);
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };

export type AppType = typeof routes;
