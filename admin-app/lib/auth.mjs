import auth from 'basic-auth';
import { timingSafeEqual } from 'node:crypto';

function safeEqual(a, b) {
  const ba = Buffer.from(a || '');
  const bb = Buffer.from(b || '');
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function basicAuthMiddleware() {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) {
    console.error('ADMIN_USER / ADMIN_PASSWORD not set — admin routes will refuse all requests');
  }

  return (req, res, next) => {
    const credentials = auth(req);
    if (
      credentials &&
      safeEqual(credentials.name, user || '') &&
      safeEqual(credentials.pass, pass || '')
    ) return next();

    res.set('WWW-Authenticate', 'Basic realm="Hovera Admin"');
    res.status(401).send('Authentication required.');
  };
}
