import dotenv from 'dotenv';

import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import {
    printError,
    printHelp,
    printSuccess,
    printWarning,
    printWeather,
} from './services/log.service.js';
import {
    DICTIONARY,
    getKeyValue,
    saveKeyValue,
} from './services/storage.service.js';

dotenv.config();

const saveToken = async (token) => {
    if (!token.length) {
        console.log('Не передан токен');
        return;
    }
    try {
        await saveKeyValue(DICTIONARY.token, token);
        printSuccess('Токен сохранён');
    } catch (e) {
        printError('Токен не сохранён: ' + e.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        console.log('Не передан город');
        return;
    }
    try {
        await saveKeyValue(DICTIONARY.city, city);
        printSuccess('Город сохранён');
    } catch (e) {
        printError('Город не сохранён: ' + e.message);
    }
};

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? (await getKeyValue(DICTIONARY.city));
        const currentWeather = await getWeather(city);
        printWeather(currentWeather, getIcon(currentWeather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status == 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
};

const initCli = async () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    } else if (args.s) {
        return saveCity(args.s);
    } else if (args.t) {
        return saveToken(args.t);
    }
    try {
        getForecast();
    } catch (e) {
        printError(e.message);
    }
};

initCli();
