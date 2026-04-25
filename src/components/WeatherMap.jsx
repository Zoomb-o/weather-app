import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function WeatherMap({ weather }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  const lat = weather?.coord?.lat
  const lon = weather?.coord?.lon
  const cityName = weather?.name
  const country = weather?.sys?.country
  const weatherKey = import.meta.env.VITE_WEATHER_API_KEY
  const mapKey = import.meta.env.VITE_MAP_API_KEY

  useEffect(() => {
    if (!lat || !lon || !mapRef.current) return

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    const map = L.map(mapRef.current).setView([lat, lon], 6)
    mapInstanceRef.current = map

    L.tileLayer(
      `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${mapKey}`,
      { attribution: '© MapTiler' }
    ).addTo(map)

    L.tileLayer(
      `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${weatherKey}`,
      { opacity: 0.6, attribution: '© OpenWeatherMap' }
    ).addTo(map)

    const icon = L.divIcon({
      html: `
        <div style="
          background: #f97316;
          width: 16px;
          height: 16px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        "></div>
      `,
      className: '',
      iconAnchor: [8, 16],
    })

    L.marker([lat, lon], { icon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align:center; font-weight:bold;">
          📍 ${cityName}
        </div>
      `)
      .openPopup()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [lat, lon])

  if (!weather) return null

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">🗺️ Műholdas & Felhőtérkép</h3>
        <p className="text-white/70 text-sm mb-4">Élő műholdas nézet felhőréteggel</p>
        <div ref={mapRef} className="rounded-2xl overflow-hidden" style={{ height: '400px' }} />
        <div className="flex gap-4 mt-3 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white/40"></div>
            <span>Felhőzet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-400/60"></div>
            <span>Műholdas nézet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-400"></div>
            <span>Tartózkodási hely</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherMap