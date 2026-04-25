function WeatherBackground({ weather }) {
  if (!weather) return null

  const code = weather.weather[0].id
  const isNight = weather.dt < weather.sys.sunrise || weather.dt > weather.sys.sunset

  const getBackground = () => {
    if (isNight) return 'linear-gradient(135deg, #0a0a2e, #1a1a4e, #0d0d3b)'
    if (code >= 200 && code < 300) return 'linear-gradient(135deg, #1a1a2e, #2d2d44, #3d3d5c)' // Thunder
    if (code >= 300 && code < 600) return 'linear-gradient(135deg, #1e3a5f, #2d5a8e, #3d7ab5)' // Rain
    if (code >= 600 && code < 700) return 'linear-gradient(135deg, #b0c4de, #d0dff0, #e8f0f8)' // Snow
    if (code >= 700 && code < 800) return 'linear-gradient(135deg, #8e9eab, #a0b0bc, #b8c8d4)' // Fog
    if (code === 800) return 'linear-gradient(135deg, #1a6b9a, #2e86c1, #f39c12)' // Clear
    if (code > 800) return 'linear-gradient(135deg, #2c3e50, #3d5166, #4a6741)' // Cloudy
    return 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
  }

  const getParticles = () => {
    if (isNight) return <Stars />
    if (code >= 200 && code < 300) return <Thunder />
    if (code >= 300 && code < 600) return <Rain />
    if (code >= 600 && code < 700) return <Snow />
    if (code === 800) return <Sunny />
    if (code > 800) return <Clouds />
    return null
  }

  return (
    <>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
        }
        @keyframes sway {
          0%, 100% { transform: translateY(-10px) translateX(0px); opacity: 1; }
          50% { transform: translateY(50vh) translateX(20px); opacity: 0.5; }
          100% { transform: translateY(100vh) translateX(0px); opacity: 0.3; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes flash {
          0%, 90%, 100% { opacity: 0; }
          92%, 98% { opacity: 1; }
        }
        @keyframes drift {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: getBackground(),
        zIndex: -1,
        transition: 'background 2s ease',
        overflow: 'hidden'
      }}>
        {getParticles()}
      </div>
    </>
  )
}

function Stars() {
  return (
    <>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          borderRadius: '50%',
          background: 'white',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
          animationDelay: Math.random() * 3 + 's'
        }} />
      ))}
    </>
  )
}

function Rain() {
  return (
    <>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '2px',
          height: Math.random() * 20 + 10 + 'px',
          background: 'rgba(174,214,241,0.6)',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `fall ${Math.random() * 0.8 + 0.4}s linear infinite`,
          animationDelay: Math.random() * 2 + 's'
        }} />
      ))}
    </>
  )
}

function Snow() {
  return (
    <>
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 8 + 4 + 'px',
          height: Math.random() * 8 + 4 + 'px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.8)',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `sway ${Math.random() * 3 + 3}s ease-in-out infinite`,
          animationDelay: Math.random() * 5 + 's'
        }} />
      ))}
    </>
  )
}

function Thunder() {
  return (
    <>
      <Rain />
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(255,255,200,0.15)',
        animation: 'flash 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(255,255,200,0.15)',
        animation: 'flash 7s ease-in-out infinite',
        animationDelay: '2s'
      }} />
    </>
  )
}

function Sunny() {
  return (
    <div style={{
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '250px',
      height: '250px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,220,50,0.6), rgba(255,150,0,0.2), transparent)',
      animation: 'pulse 4s ease-in-out infinite',
    }} />
  )
}

function Clouds() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 200 + 150 + 'px',
          height: Math.random() * 60 + 40 + 'px',
          borderRadius: '50px',
          background: 'rgba(255,255,255,0.1)',
          top: Math.random() * 50 + '%',
          left: '-200px',
          animation: `drift ${Math.random() * 20 + 20}s linear infinite`,
          animationDelay: Math.random() * 10 + 's'
        }} />
      ))}
    </>
  )
}

export default WeatherBackground