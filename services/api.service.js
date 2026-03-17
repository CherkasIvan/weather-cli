import https from "https";
import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error('Не задан ключ API, задайте его через -t [WEATHER_API_KEY_TOKEN]');
  }


  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metric'
      }
    }
  )

  return data
  // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  // url.searchParams.append('q', city);
  // url.searchParams.append('appid', token); 
  // url.searchParams.append('lang', 'ru');
  // url.searchParams.append('units', 'metric');

  // return new Promise((resolve, reject) => {
  //   https.get(url, (response) => {
  //     let data = '';
  //     response.on('data', (chunk) => data += chunk);
  //     response.on('end', () => {
  //       if (response.statusCode === 200) {
  //         resolve(JSON.parse(data));
  //       } else {
  //         reject(new Error(`Ошибка API: ${response.statusCode} ${data}`));
  //       }
  //     });
  //   }).on('error', (err) => reject(err));
  // });
};

export { getWeather };