import { useState, useEffect } from 'react'
import useWeather from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import WeeklyForecast from './components/WeeklyForecast'
import TemperatureChart from './components/TemperatureChart'
import PressureChart from './components/PressureChart'
import PrecipitationChart from './components/PrecipitationChart'
import WindChart from './components/WindChart'
import WeatherMap from './components/WeatherMap'
import WeatherBackground from './components/WeatherBackground'
import UVAirCard from './components/UVAirCard'
import WeatherAlerts from './components/WeatherAlerts'

function App() {
  const { weather, forecast, airQuality, uvIndex, alerts, loading, error, fetchByCity, fetchByLocation } = useWeather()
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  const addFavourite = () => {
    if (!weather) return
    const city = weather.name
    if (!favourites.includes(city)) {
      setFavourites([...favourites, city])
    }
  }

  const removeFavourite = (city) => {
    setFavourites(favourites.filter((f) => f !== city))
  }

  const isFavourite = weather && favourites.includes(weather.name)

  return (
    <>
      <WeatherBackground weather={weather} />
      <div className="min-h-screen pb-16">

        {/* Fejléc */}
        <div className="text-center pt-12 pb-4">
          <h1 className="text-white text-5xl font-bold tracking-tight">
            🌤️ WeatherVision
          </h1>
          <p className="text-white/50 mt-2 text-sm tracking-widest uppercase">
            Valós idejű időjárás információk
          </p>
        </div>

        {/* Keresés */}
        <SearchBar onSearch={fetchByCity} onLocationClick={fetchByLocation} />

        {/* Kedvenc városok */}
        {favourites.length > 0 && (
          <div className="w-full max-w-2xl mx-auto px-4 mt-4">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-2">⭐ Kedvenc városok</p>
            <div className="flex flex-wrap gap-2">
              {favourites.map((city) => (
                <div key={city} className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-white text-sm backdrop-blur-md border border-white/30">
                  <button onClick={() => fetchByCity(city)} className="hover:text-yellow-300 transition">
                    {city}
                  </button>
                  <button onClick={() => removeFavourite(city)} className="text-white/50 hover:text-red-400 transition ml-1">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Töltés */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/70">Időjárás adatok betöltése...</p>
          </div>
        )}

        {/* Hiba */}
        {error && (
          <div className="w-full max-w-2xl mx-auto px-4 mt-6">
            <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-4 text-red-200 text-center">
              ⚠️ {error}
            </div>
          </div>
        )}

        {/* Tartalom */}
        {weather && !loading && (
          <>
            <div className="w-full max-w-2xl mx-auto px-4 mt-4 flex justify-end">
              <button
                onClick={isFavourite ? () => removeFavourite(weather.name) : addFavourite}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm backdrop-blur-md border transition ${
                  isFavourite
                    ? 'bg-yellow-400/30 border-yellow-400/50 text-yellow-300 hover:bg-red-400/20 hover:text-red-300 hover:border-red-400/50'
                    : 'bg-white/20 border-white/30 text-white hover:bg-yellow-400/20 hover:text-yellow-300'
                }`}
              >
                {isFavourite ? '⭐ Kedvencekből eltávolítás' : '☆ Kedvencekhez adás'}
              </button>
            </div>

            <CurrentWeather weather={weather} />
            <WeatherAlerts alerts={alerts} />
            <UVAirCard uvIndex={uvIndex} airQuality={airQuality} />
            {forecast && <HourlyForecast forecast={forecast} />}
            <WeatherMap weather={weather} />

            <div className="w-full max-w-2xl mx-auto px-4 mt-10">
              <h2 className="text-white text-2xl font-bold">📊 Időjárás Grafikonok</h2>
              <p className="text-white/50 text-sm mt-1">Előrejelzési trendek a következő 24 órára</p>
            </div>

            {forecast && <TemperatureChart forecast={forecast} />}
            {forecast && <PressureChart forecast={forecast} />}
            {forecast && <PrecipitationChart forecast={forecast} />}
            {forecast && <WindChart forecast={forecast} />}

            <div className="w-full max-w-2xl mx-auto px-4 mt-10">
              <h2 className="text-white text-2xl font-bold">📅 Heti Áttekintés</h2>
              <p className="text-white/50 text-sm mt-1">Napi előrejelzés</p>
            </div>

            {forecast && <WeeklyForecast forecast={forecast} />}

            <div className="text-center mt-12 text-white/30 text-xs">
              Adatok: OpenWeatherMap • Térképek: MapTiler
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App