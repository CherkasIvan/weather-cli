import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    console.log('Не передан токен');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранён');
  } catch (e) {
    printError('Токен не сохранён: ' + e.message);
  }
};

const initCli = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  } else if (args.s) {
    console.log('save City');
  } else if (args.t) {
    await saveToken(args.t);
  } else {
    const city = 'Moscow';
    try {
      const weather = await getWeather(city);
      console.log(weather);
    } catch (e) {
      printError(e.message);
    }
  }
};

initCli();