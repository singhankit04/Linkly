import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShortUrl('')
    setCopied(false)
    if (!longUrl) {
      setError('Please paste a URL to shorten.')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/create`, { longUrl })
      
      const shortUrl = res.data.shortUrl
      setShortUrl(shortUrl)
      
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unexpected error')
    }
  }

  const handleCopy = async () => {
    if (!shortUrl) return
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Copy failed — try selecting and copying manually.')
    }
  }

  return (
    <div style={{fontFamily:'Arial, sans-serif',maxWidth:700,margin:'48px auto',padding:20}}>
      <h1 style={{marginBottom:16}}>URL Shortener</h1>

      <form onSubmit={handleSubmit} style={{display:'flex',gap:8}}>
        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Paste a long URL here"
          aria-label="Long URL"
          style={{flex:1,padding:'8px 12px',fontSize:16}}
        />
        <button type="submit" disabled={loading} style={{padding:'8px 12px'}}>
          {loading ? 'Generating...' : 'Shorten'}
        </button>
      </form>

      {error && (
        <div style={{color:'crimson',marginTop:12}}>{error}</div>
      )}

      {shortUrl && (
        <div style={{marginTop:16,display:'flex',alignItems:'center',gap:8}}>
          <a href={shortUrl} target="_blank" rel="noreferrer" style={{color:'#0366d6'}}>{shortUrl}</a>
          <button onClick={handleCopy} style={{padding:'6px 10px'}}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

export default App