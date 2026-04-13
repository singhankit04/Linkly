import React, { useState } from 'react'
import axiosInstance from './utils/axiosInstance'

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
      const res = await axiosInstance.post(`/api/create`, { longUrl })

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
    <div className="font-sans max-w-xl mx-auto mt-12 p-6">
      <h1 className="text-2xl font-semibold mb-4">URL Shortener</h1>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Paste a long URL here"
          aria-label="Long URL"
          className="flex-1 px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Shorten'}
        </button>
      </form>

      {error && (
        <div className="text-red-600 mt-3">{error}</div>
      )}

      {shortUrl && (
        <div className="mt-4 flex items-center gap-2">
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

export default App