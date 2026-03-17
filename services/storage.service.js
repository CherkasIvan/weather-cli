import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), 'weather-data.json');
export const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
};

export const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
  // 1. Проверяем переменную окружения, если ключ — token
  if (key === TOKEN_DICTIONARY.token && process.env.WEATHER_API_KEY_TOKEN) {
    return process.env.WEATHER_API_KEY_TOKEN;
  }
  // 2. Иначе читаем из файла
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};