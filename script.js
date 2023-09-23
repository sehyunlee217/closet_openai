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
    console.log(data.weather[0].description);
    console.log(data.main);
}

checkWeather();

// const completion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ "role": "user", "content": `What to wear for ` }]
// });

// console.log(completion.choices[0].message);
