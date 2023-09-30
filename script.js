// configure .env for API_KEY
import { config } from "dotenv";
config();

// OpenAI section
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Geolocation API


// WeatherAPI section
const lat = 43.6739407203168;
const long = -79.393235083052;

const weatherapiKey = process.env.WEATHER_API_KEY;
const weatherapiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ lat }&lon=${ long }&appid=${ weatherapiKey }`;

async function checkWeather() {
    const res = await fetch(weatherapiURL);
    let data = await res.json();

    const weather = (data.weather[0].description);
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;

    const weatherData = { weather: weather, min: minTemp, max: maxTemp };

    return weatherData;
}


async function returnOutfit() {
    try {
        const weatherData = await checkWeather();

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                "role": "user",
                "content": `What to wear during low: ${ weatherData.min } celcius , high: ${ weatherData.max } celcius,
                for ${ weatherData.weather }`
            }]
        });
        console.log(completion.choices[0].message.content);
    } catch (err) {
        console.log(err);
    }
}

returnOutfit();