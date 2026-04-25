import { useState } from 'react'
import { FiSearch, FiMapPin } from 'react-icons/fi'

function SearchBar({ onSearch, onLocationClick }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setInput('')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto px-4 pt-8">
      <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Város keresése..."
          className="flex-1 px-4 py-3 rounded-2xl bg-white/20 text-white placeholder-white/70 outline-none backdrop-blur-md border border-white/30 focus:border-white transition"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl backdrop-blur-md border border-white/30 transition"
        >
          <FiSearch size={20} />
        </button>
      </form>
      <button
        onClick={onLocationClick}
        className="flex items-center justify-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl backdrop-blur-md border border-white/30 transition"
      >
        <FiMapPin size={20} />
        Helyzetem
      </button>
    </div>
  )
}

export default SearchBar