// services/storage.service.js
import { homedir } from 'os';
import { join } from 'path';
import { promises as fs } from 'fs';

const FILE_PATH = join(homedir(), 'weather-data.json');

const isFileExists = async (path) => {
  try {
    await fs.stat(path);
    return true;
  } catch {
    return false;
  }
};

const readJSON = async (path) => {
  if (!(await isFileExists(path))) {
    return {};
  }

  try {
    const content = await fs.readFile(path, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Не удалось прочитать или распарсить файл ${path}:`, error.message);
    return {};
  }
};

const saveKeyValue = async (key, value) => {
  const data = await readJSON(FILE_PATH);
  data[key] = value;
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
};

const getKeyValue = async (key) => {
  const data = await readJSON(FILE_PATH);
  return data[key];
};

export { saveKeyValue, getKeyValue };