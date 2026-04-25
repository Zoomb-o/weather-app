function HourlyForecast({ forecast }) {
  if (!forecast) return null

  const hourly = forecast.list.slice(0, 8)

  const formatHour = (unix) => {
    return new Date(unix * 1000).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">⏱️ Következő 24 Óra</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent" style={{ scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
          {hourly.map((item) => (
            <div
              key={item.dt}
              className="flex flex-col items-center gap-2 bg-white/10 rounded-2xl p-3 min-w-[80px]"
            >
              <p className="text-white/70 text-sm">{formatHour(item.dt)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-10 h-10"
              />
              <p className="font-semibold">{Math.round(item.main.temp)}°C</p>
              <p className="text-white/70 text-xs">{item.main.humidity}%💧</p>
              <p className="text-white/70 text-xs">{Math.round(item.wind.speed * 3.6)}km/h</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HourlyForecast