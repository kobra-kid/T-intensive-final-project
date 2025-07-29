// backend/utils/fileUtils.js
import { readFile, writeFile } from 'fs/promises';

export async function readJson(path) {
  try {
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (e) {
    return [];
  }
}

export async function writeJson(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2));
}
