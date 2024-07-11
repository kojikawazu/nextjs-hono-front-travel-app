import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';

import auth from './route-auth-callback';

const app = new Hono().basePath('/api');

// CORS設定
const CORS_ADDRESS = process.env.CORS_ADDRESS as string;
app.use('*', cors({
  origin: CORS_ADDRESS,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

app.route('/auth', auth);

export const GET = handle(app);
export const POST = handle(app);
