import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printWarning = (warn) => {
    console.log(chalk.bgYellowBright('WARNING') + ' ' + warn);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen('SUCCESS!') + ' ' + message);
};

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgCyanBright('Weather')} Погода в городе ${res.name}, ${res.weather[0].description}. ${icon}
        Температура: ${res.main.temp}°C, ощущается как ${res.main.feels_like}°C.
        Влажность: ${res.main.humidity}%.
        Скорость ветра: ${res.wind.speed} м/с`,
    );
};

const printHelp = () => {
    console.log(
        dedent(
            chalk.bgCyan('HELP') +
                '\n' +
                'Без параметров - вывод погоды' +
                '\n' +
                '-s [CYTY] для установки города' +
                '\n' +
                '-h [HELP] для вывода помощи' +
                '\n' +
                '-t [API_KEY] для сохранения токена',
        ),
    );
};

export { printError, printHelp, printSuccess, printWarning, printWeather };
