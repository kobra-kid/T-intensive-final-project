// backend/routes/users.js
import { readJson, writeJson } from '../utils/fileUtils.js';
import { randomUUID } from 'crypto';
import path from 'path';

const usersPath = path.resolve('data/users.json');

export default async function (fastify, opts) {
  // Получить всех пользователей
  fastify.get('/', async (request, reply) => {
    const users = await readJson(usersPath);
    return users;
  });

  // Создать нового пользователя
  fastify.post('/', async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.status(400).send({ error: 'Missing username or password' });
    }

    const users = await readJson(usersPath);

    if (users.find(u => u.username === username)) {
      return reply.status(409).send({ error: 'User already exists' });
    }

    const newUser = {
      id: randomUUID(),
      username,
      password,
      bio: '',
      avatar: '',
      following: []
    };

    users.push(newUser);
    await writeJson(usersPath, users);
    
    const token = fastify.jwt.sign({ id: newUser.id, username: newUser.username });

    return reply.status(201).send({
      token,
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });
  });
}
