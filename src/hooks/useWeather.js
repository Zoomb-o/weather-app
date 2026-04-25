import { useState, useEffect } from 'react'
import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords,
  getAirQuality,
  getOneCall
} from '../utils/weatherApi'

const useWeather = () => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [airQuality, setAirQuality] = useState(null)
  const [uvIndex, setUvIndex] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchExtras = async (lat, lon) => {
    try {
      const aq = await getAirQuality(lat, lon)
      setAirQuality(aq)
    } catch (e) {
      console.log('Air quality not available')
    }
    try {
      const oneCall = await getOneCall(lat, lon)
      setUvIndex(oneCall.current?.uvi ?? null)
      setAlerts(oneCall.alerts || [])
    } catch (e) {
      console.log('One Call API not available')
    }
  }

  const fetchByCity = async (cityName) => {
    try {
      setLoading(true)
      setError(null)
      const weatherData = await getWeatherByCity(cityName)
      const forecastData = await getForecastByCity(cityName)
      setWeather(weatherData)
      setForecast(forecastData)
      await fetchExtras(weatherData.coord.lat, weatherData.coord.lon)
    } catch (err) {
      setError('A város nem található. Kérjük próbálja újra.')
    } finally {
      setLoading(false)
    }
  }

  const fetchByLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true)
          setError(null)
          const { latitude, longitude } = position.coords
          const weatherData = await getWeatherByCoords(latitude, longitude)
          const forecastData = await getForecastByCoords(latitude, longitude)
          setWeather(weatherData)
          setForecast(forecastData)
          await fetchExtras(latitude, longitude)
        } catch (err) {
          setError('Nem sikerült lekérni a helyi időjárást.')
        } finally {
          setLoading(false)
        }
      },
      () => setError('A helymeghatározás nem engedélyezett.')
    )
  }

  useEffect(() => {
    fetchByLocation()
  }, [])

  return { weather, forecast, airQuality, uvIndex, alerts, loading, error, fetchByCity, fetchByLocation }
}

export default useWeather