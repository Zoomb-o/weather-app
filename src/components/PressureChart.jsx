import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const nowLinePlugin = {
  id: 'nowLine',
  afterDraw(chart) {
    const { ctx, data, chartArea: { top, bottom }, scales: { x } } = chart
    const now = Date.now()
    const times = data.labels.map(label => {
      const [h, m] = label.split(':').map(Number)
      const d = new Date()
      d.setHours(h, m, 0, 0)
      return d.getTime()
    })
    let nowIndex = times.findIndex((t, i) => t >= now || i === times.length - 1)
    if (nowIndex < 0) nowIndex = 0
    const xPos = x.getPixelForTick(nowIndex)
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(xPos, top)
    ctx.lineTo(xPos, bottom)
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgba(255,255,255,0.9)'
    ctx.setLineDash([6, 3])
    ctx.stroke()
    ctx.fillStyle = 'white'
    ctx.font = 'bold 11px sans-serif'
    ctx.fillText('Most', xPos + 4, top + 14)
    ctx.restore()
  }
}

function PressureChart({ forecast }) {
  if (!forecast) return null

  const items = forecast.list.slice(0, 8)

  const labels = items.map((item) =>
    new Date(item.dt * 1000).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit', hour12: false })
  )

  const data = {
    labels,
    datasets: [
      {
        label: 'Légnyomás (hPa)',
        data: items.map((item) => item.main.pressure),
        borderColor: '#818cf8',
        backgroundColor: 'rgba(129,140,248,0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { color: 'white', callback: (val) => val + ' hPa' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">🌬️ Légnyomás - Következő 24 Óra</h3>
        <p className="text-white/70 text-sm mb-4">Légköri nyomás hPa-ban</p>
        <Line data={data} options={options} plugins={[nowLinePlugin]} />
      </div>
    </div>
  )
}

export default PressureChart