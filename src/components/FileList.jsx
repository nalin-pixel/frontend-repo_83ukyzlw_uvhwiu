import { useEffect, useState } from 'react'

export default function FileList() {
  const [files, setFiles] = useState([])
  const [links, setLinks] = useState({})
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const fetchFiles = async () => {
    const res = await fetch(`${backend}/api/files`)
    const data = await res.json()
    setFiles(data)
  }

  useEffect(()=>{ fetchFiles() },[])

  const createLink = async (fileId) => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/links`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ file_id: fileId, expires_in_minutes: 60, max_downloads: 3 })
      })
      const data = await res.json()
      setLinks(prev => ({...prev, [fileId]: data.url}))
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = async (fileId) => {
    await fetch(`${backend}/api/files/${fileId}`, { method:'DELETE' })
    await fetchFiles()
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Your Files</h3>
      <div className="space-y-3">
        {files.map(f => (
          <div key={f._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900/50 rounded p-3">
            <div className="text-blue-100 text-sm">
              <div className="font-medium">{f.original_name}</div>
              <div className="opacity-70">{(f.size/1024).toFixed(1)} KB</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>createLink(f._id)} className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-3 py-1.5 rounded disabled:opacity-50" disabled={loading}>Create Link</button>
              <button onClick={()=>deleteFile(f._id)} className="bg-rose-600 hover:bg-rose-500 text-white text-sm px-3 py-1.5 rounded">Delete</button>
            </div>
          </div>
        ))}
        {files.length===0 && <p className="text-blue-200/70 text-sm">No files yet. Upload one above.</p>}
      </div>
      {Object.keys(links).length>0 && (
        <div className="mt-4 bg-slate-900/60 rounded p-3 text-blue-100 text-sm">
          <div className="font-semibold mb-1">Links</div>
          {Object.entries(links).map(([id, url]) => (
            <div key={id} className="break-all">
              {window.location.origin}{url}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
