import nextConnect from 'next-connect';
import dbMiddleware from './db';

export default function createHandler(...middlewares: any[]) {
  return nextConnect().use(dbMiddleware, ...middlewares);
}
