import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const getWeatherByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units: 'metric' }
  })
  return response.data
}

export const getForecastByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: API_KEY, units: 'metric' }
  })
  return response.data
}

export const getWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon, appid: API_KEY, units: 'metric' }
  })
  return response.data
}

export const getForecastByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { lat, lon, appid: API_KEY, units: 'metric' }
  })
  return response.data
}

export const getAirQuality = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/air_pollution`, {
    params: { lat, lon, appid: API_KEY }
  })
  return response.data
}

export const getOneCall = async (lat, lon) => {
  const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
    params: { lat, lon, appid: API_KEY, exclude: 'minutely,hourly,daily', units: 'metric' }
  })
  return response.data
}