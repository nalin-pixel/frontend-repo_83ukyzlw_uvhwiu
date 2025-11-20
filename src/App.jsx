import { useState } from 'react'
import UploadArea from './components/UploadArea'
import FileList from './components/FileList'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="relative min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white tracking-tight">Seal File Service</h1>
            <p className="text-blue-300/80 mt-2">Securely upload files and share expiring links with controls</p>
          </header>

          <div className="grid gap-6">
            <UploadArea onUploaded={() => {}} />
            <FileList />
          </div>

          <footer className="text-center mt-10 text-sm text-blue-300/60">
            Links expire automatically. Keep sensitive data safe.
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
