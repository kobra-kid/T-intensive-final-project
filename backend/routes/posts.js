// backend/routes/posts.js
import { readJson, writeJson } from '../utils/fileUtils.js';
import { randomUUID } from 'crypto';
import path from 'path';

const postsPath = path.resolve('data/posts.json');
const usersPath = path.resolve('data/users.json');

export default async function (fastify, opts) {
  // Получить все посты пользователя
  fastify.get('/users/:userId/posts', async (request, reply) => {
    const { userId } = request.params;
    const posts = await readJson(postsPath);
    const userPosts = posts.filter(p => p.userId === userId);
    return userPosts;
  });

  // Создать пост
  fastify.post('/users/:userId/posts', async (request, reply) => {
    const { userId } = request.params;
    const { content } = request.body;

    if (!content) {
      return reply.status(400).send({ error: 'Content is required' });
    }

    const users = await readJson(usersPath);
    const userExists = users.some(u => u.id === userId);
    if (!userExists) {
      return reply.status(404).send({ error: 'User not found' });
    }

    const newPost = {
      id: randomUUID(),
      userId,
      content,
      likes: 0,
      comments: []
    };

    const posts = await readJson(postsPath);
    posts.push(newPost);
    await writeJson(postsPath, posts);

    return reply.status(201).send(newPost);
  });

  // Фид — пока все посты
  fastify.get('/feed', async (request, reply) => {
    const posts = await readJson(postsPath);
    return posts;
  });
}
