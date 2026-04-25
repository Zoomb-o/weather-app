function UVAirCard({ uvIndex, airQuality }) {
  if (!uvIndex && !airQuality) return null

  const getUVInfo = (uv) => {
    if (uv === null || uv === undefined) return { label: 'N/A', color: '#888', bg: 'rgba(136,136,136,0.2)' }
    if (uv <= 2) return { label: 'Alacsony', color: '#4ade80', bg: 'rgba(74,222,128,0.2)' }
    if (uv <= 5) return { label: 'Mérsékelt', color: '#facc15', bg: 'rgba(250,204,21,0.2)' }
    if (uv <= 7) return { label: 'Magas', color: '#fb923c', bg: 'rgba(251,146,60,0.2)' }
    if (uv <= 10) return { label: 'Nagyon magas', color: '#f87171', bg: 'rgba(248,113,113,0.2)' }
    return { label: 'Extrém', color: '#c084fc', bg: 'rgba(192,132,252,0.2)' }
  }

  const getAQIInfo = (aqi) => {
    switch (aqi) {
      case 1: return { label: 'Jó', color: '#4ade80', bg: 'rgba(74,222,128,0.2)' }
      case 2: return { label: 'Megfelelő', color: '#a3e635', bg: 'rgba(163,230,53,0.2)' }
      case 3: return { label: 'Közepes', color: '#facc15', bg: 'rgba(250,204,21,0.2)' }
      case 4: return { label: 'Rossz', color: '#fb923c', bg: 'rgba(251,146,60,0.2)' }
      case 5: return { label: 'Nagyon rossz', color: '#f87171', bg: 'rgba(248,113,113,0.2)' }
      default: return { label: 'N/A', color: '#888', bg: 'rgba(136,136,136,0.2)' }
    }
  }

  const aqi = airQuality?.list?.[0]?.main?.aqi
  const pm25 = airQuality?.list?.[0]?.components?.pm2_5
  const pm10 = airQuality?.list?.[0]?.components?.pm10
  const o3 = airQuality?.list?.[0]?.components?.o3
  const no2 = airQuality?.list?.[0]?.components?.no2

  const uvInfo = getUVInfo(uvIndex)
  const aqiInfo = getAQIInfo(aqi)

  const uvPercent = Math.min((uvIndex / 11) * 100, 100)
  const aqiPercent = aqi ? ((aqi - 1) / 4) * 100 : 0

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">🌞 UV Index & Levegőminőség</h3>

        <div className="flex flex-col gap-4">

          {/* UV Index */}
          {uvIndex !== null && uvIndex !== undefined && (
            <div className="w-full rounded-2xl p-4" style={{ background: uvInfo.bg }}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white/70 text-sm">☀️ UV Index</p>
                <span className="font-bold text-lg" style={{ color: uvInfo.color }}>
                  {uvIndex !== null ? uvIndex.toFixed(1) : 'N/A'}
                </span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${uvPercent}%`,
                    background: 'linear-gradient(90deg, #4ade80, #facc15, #f87171, #c084fc)'
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold" style={{ color: uvInfo.color }}>{uvInfo.label}</p>
                <p className="text-white/50 text-xs">
                  {uvIndex <= 2 ? 'Napvédő nem szükséges' :
                   uvIndex <= 5 ? 'SPF 30+ ajánlott' :
                   uvIndex <= 7 ? 'SPF 50+ szükséges' :
                   'Kerülje a közvetlen napfényt!'}
                </p>
              </div>
            </div>
          )}

          {/* Air Quality */}
          {aqi && (
            <div className="w-full rounded-2xl p-4" style={{ background: aqiInfo.bg }}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white/70 text-sm">💨 Levegőminőség</p>
                <span className="font-bold text-lg" style={{ color: aqiInfo.color }}>
                  AQI {aqi}
                </span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${aqiPercent}%`,
                    background: 'linear-gradient(90deg, #4ade80, #facc15, #f87171)'
                  }}
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold" style={{ color: aqiInfo.color }}>{aqiInfo.label}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                <div className="bg-white/10 rounded-xl p-2 text-center">
                  <p className="text-white/50 text-xs">PM2.5</p>
                  <p className="text-sm font-semibold">{pm25?.toFixed(1)}</p>
                  <p className="text-white/40 text-xs">μg/m³</p>
                </div>
                <div className="bg-white/10 rounded-xl p-2 text-center">
                  <p className="text-white/50 text-xs">PM10</p>
                  <p className="text-sm font-semibold">{pm10?.toFixed(1)}</p>
                  <p className="text-white/40 text-xs">μg/m³</p>
                </div>
                <div className="bg-white/10 rounded-xl p-2 text-center">
                  <p className="text-white/50 text-xs">O₃</p>
                  <p className="text-sm font-semibold">{o3?.toFixed(1)}</p>
                  <p className="text-white/40 text-xs">μg/m³</p>
                </div>
                <div className="bg-white/10 rounded-xl p-2 text-center">
                  <p className="text-white/50 text-xs">NO₂</p>
                  <p className="text-sm font-semibold">{no2?.toFixed(1)}</p>
                  <p className="text-white/40 text-xs">μg/m³</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UVAirCard