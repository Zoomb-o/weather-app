function WeeklyForecast({ forecast }) {
  if (!forecast) return null

  const seen = {}
  const daily = []

  for (const item of forecast.list) {
    const date = new Date(item.dt * 1000).toLocaleDateString()
    if (!seen[date]) {
      seen[date] = true
      daily.push(item)
    }
  }

  const days = daily.slice(0, 7)

  const formatDay = (unix) => {
    return new Date(unix * 1000).toLocaleDateString('hu-HU', { weekday: 'long' })
  }

  const formatDate = (unix) => {
    return new Date(unix * 1000).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">📅 7 Napos Előrejelzés</h3>
        <div className="flex flex-col gap-3">
          {days.map((item) => (
            <div
              key={item.dt}
              className="flex items-center justify-between bg-white/10 rounded-2xl px-4 py-3"
            >
              <div className="w-28">
                <p className="font-semibold capitalize">{formatDay(item.dt)}</p>
                <p className="text-white/70 text-sm">{formatDate(item.dt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                  className="w-10 h-10"
                />
                <p className="text-white/70 text-sm capitalize hidden sm:block">
                  {item.weather[0].description}
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <span>💧 {item.main.humidity}%</span>
                <span>💨 {Math.round(item.wind.speed * 3.6)}km/h</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{Math.round(item.main.temp)}°C</p>
                <p className="text-white/70 text-sm">
                  Max:{Math.round(item.main.temp_max)}° Min:{Math.round(item.main.temp_min)}°
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeeklyForecast