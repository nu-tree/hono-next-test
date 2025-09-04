// route.ts
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import todosRoute from '@/lib/hono/routes/todos';
import { logger } from '@/lib/hono/middleware/logger';
import { rateLimiter } from 'hono-rate-limiter';
import { cache, clearAllCache } from '@/lib/hono/middleware/cache';

const app = new Hono().basePath('/api');

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-6',
    keyGenerator: (c) => c.req.header('x-forwarded-for') || 'unknown', // IP별,
  })
);

app.use('*', logger);

// 전역 캐시는 제거하고 각 라우트에서 개별적으로 설정
// app.use('*', cache({ ttl: 30 }));

// 캐시 클리어 엔드포인트 (개발/테스트용)
app.delete('/cache', async (c) => {
  await clearAllCache();
  return c.json({ message: 'All cache cleared' });
});

const routes = app.route('/todos', todosRoute);

const handler = handle(app);
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };

export type AppType = typeof routes;
