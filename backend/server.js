// backend/server.js
import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';

import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';


const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
  origin: '*' // разрешить всем источникам обращаться к API
});


fastify.register(jwt, {
  secret: 'supersecretkey' // для простоты, в реальном проекте — ENV переменная
});

fastify.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});


// Регистрируем маршруты
fastify.register(usersRoutes, { prefix: '/api/users' });
fastify.register(postsRoutes, { prefix: '/api' }); // посты идут по /api/users/:id/posts и /api/feed

// Стартуем сервер
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
