import { useState } from 'react'

export default function UploadArea({ onUploaded }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const handleUpload = async (e) => {
    e.preventDefault()
    setError('')
    if (!file) return
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${backend}/api/upload`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      onUploaded?.(data)
      setFile(null)
    } catch (err) {
      setError('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-3 items-stretch">
        <input type="file" onChange={(e)=>setFile(e.target.files?.[0]||null)} className="flex-1 bg-slate-900/60 text-blue-100 rounded px-3 py-2" />
        <button disabled={loading || !file} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium px-4 py-2 rounded">
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  )
}
