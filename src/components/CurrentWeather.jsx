import { WiHumidity, WiStrongWind, WiBarometer } from 'react-icons/wi'
import { FiEye } from 'react-icons/fi'

function CurrentWeather({ weather }) {
  if (!weather) return null

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, humidity, pressure, temp_min, temp_max },
    weather: [{ description, icon }],
    wind: { speed },
    visibility
  } = weather

  const formatTime = (unix) => {
    return new Date(unix * 1000).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })
  }

  const now = Date.now() / 1000
  const totalDay = sunset - sunrise
  const elapsed = Math.min(Math.max(now - sunrise, 0), totalDay)
  const progress = (elapsed / totalDay) * 100

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-6 text-white">

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold">{name}, {country}</h2>
            <p className="text-white/70 mt-1 capitalize">{description}</p>
            <p className="text-white/70 text-sm mt-1">
              {new Date().toLocaleDateString('hu-HU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-20 h-20"
          />
        </div>

        <div className="mt-4">
          <p className="text-8xl font-thin">{Math.round(temp)}°C</p>
          <p className="text-white/70 mt-1">Hőérzet: {Math.round(feels_like)}°C</p>
          <p className="text-white/70 text-sm">Max: {Math.round(temp_max)}°C  Min: {Math.round(temp_min)}°C</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center gap-1">
            <WiHumidity size={28} />
            <p className="text-sm text-white/70">Páratartalom</p>
            <p className="font-semibold">{humidity}%</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center gap-1">
            <WiStrongWind size={28} />
            <p className="text-sm text-white/70">Szél</p>
            <p className="font-semibold">{Math.round(speed * 3.6)} km/h</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center gap-1">
            <WiBarometer size={28} />
            <p className="text-sm text-white/70">Légnyomás</p>
            <p className="font-semibold">{pressure} hPa</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center gap-1">
            <FiEye size={22} />
            <p className="text-sm text-white/70">Látótávolság</p>
            <p className="font-semibold">{(visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        {/* Sunrise/Sunset Progress Bar */}
        <div className="mt-6 bg-white/10 rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-3">
            <div className="flex flex-col items-start">
              <p className="text-white/70">🌅 Napkelte</p>
              <p className="font-semibold">{formatTime(sunrise)}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white/70">☀️ Nappalok</p>
              <p className="font-semibold text-yellow-300">
                {Math.floor(totalDay / 3600)}ó {Math.floor((totalDay % 3600) / 60)}p
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-white/70">🌇 Naplemente</p>
              <p className="font-semibold">{formatTime(sunset)}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #f97316, #facc15, #f97316)'
              }}
            />
            {/* Sun icon marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-lg leading-none"
              style={{ left: `${progress}%` }}
            >
              ☀️
            </div>
          </div>

          {/* Day progress label */}
          <p className="text-center text-white/50 text-xs mt-2">
            {progress >= 100
              ? 'A nap már lenyugodott'
              : progress <= 0
              ? 'A nap még nem kelt fel'
              : `A nap ${Math.round(progress)}%-a telt el`}
          </p>
        </div>

      </div>
    </div>
  )
}

export default CurrentWeather