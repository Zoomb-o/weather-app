import { useState } from 'react'

function WeatherAlerts({ alerts }) {
  const [expanded, setExpanded] = useState(null)

  if (!alerts || alerts.length === 0) return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="bg-green-500/20 backdrop-blur-md rounded-3xl border border-green-400/30 p-4 text-white flex items-center gap-3">
        <span className="text-2xl">✅</span>
        <div>
          <p className="font-semibold">Nincsenek aktív figyelmeztetések</p>
          <p className="text-white/60 text-sm">Az időjárás biztonságos a térségben</p>
        </div>
      </div>
    </div>
  )

  const getSeverityInfo = (event) => {
    const e = event.toLowerCase()
    if (e.includes('extreme') || e.includes('tornado') || e.includes('hurricane')) {
      return { color: '#f87171', bg: 'rgba(248,113,113,0.15)', border: 'rgba(248,113,113,0.4)', icon: '🚨' }
    }
    if (e.includes('warning') || e.includes('storm') || e.includes('flood')) {
      return { color: '#fb923c', bg: 'rgba(251,146,60,0.15)', border: 'rgba(251,146,60,0.4)', icon: '⚠️' }
    }
    return { color: '#facc15', bg: 'rgba(250,204,21,0.15)', border: 'rgba(250,204,21,0.4)', icon: '📢' }
  }

  const formatTime = (unix) => {
    return new Date(unix * 1000).toLocaleString('hu-HU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">⚠️ Időjárási Figyelmeztetések</h3>

        <div className="flex flex-col gap-3">
          {alerts.map((alert, index) => {
            const severity = getSeverityInfo(alert.event)
            const isExpanded = expanded === index

            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden"
                style={{ background: severity.bg, border: `1px solid ${severity.border}` }}
              >
                {/* Alert Header */}
                <button
                  className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() => setExpanded(isExpanded ? null : index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{severity.icon}</span>
                    <div>
                      <p className="font-semibold" style={{ color: severity.color }}>
                        {alert.event}
                      </p>
                      <p className="text-white/60 text-xs">
                        {formatTime(alert.start)} — {formatTime(alert.end)}
                      </p>
                    </div>
                  </div>
                  <span className="text-white/50 text-sm">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </button>

                {/* Alert Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/10">
                    <p className="text-white/80 text-sm mt-3 leading-relaxed">
                      {alert.description}
                    </p>
                    {alert.sender_name && (
                      <p className="text-white/40 text-xs mt-2">
                        Forrás: {alert.sender_name}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WeatherAlerts