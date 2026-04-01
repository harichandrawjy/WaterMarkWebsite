import { useState, useRef, useCallback } from 'react'

type Stage = 'idle' | 'dragging' | 'preview' | 'encoding' | 'done'

const ENCODE_STEPS = [
  'Reading media file...',
  'Generating watermark payload...',
  'Running HIDDeN encoder...',
  'Applying attention bottleneck...',
  'Embedding semi-fragile layer...',
  'Finalizing watermarked output...',
]

export default function Encode() {
  const [stage,      setStage]      = useState<Stage>('idle')
  const [file,       setFile]       = useState<File | null>(null)
  const [preview,    setPreview]    = useState<string | null>(null)
  const [stepIdx,    setStepIdx]    = useState(0)
  const [progress,   setProgress]   = useState(0)
  const [wmPreview,  setWmPreview]  = useState<string | null>(null)
  const [psnr,       setPsnr]       = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/') && !f.type.startsWith('video/')) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setStage('preview')
  }

  const onDrop     = useCallback((e: React.DragEvent) => { e.preventDefault(); setStage('idle'); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }, [])
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setStage('dragging') }

  const startEncoding = async () => {
    if (!file) return
    setStage('encoding')
    setStepIdx(0); setProgress(0)

    for (let i = 0; i < ENCODE_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 400))
      setStepIdx(i)
      setProgress(Math.round(((i + 1) / ENCODE_STEPS.length) * 100))
    }

    // Mock: reuse the original as the "watermarked" preview
    // In production, this would be the URL returned by your FastAPI endpoint
    setWmPreview(preview)
    setPsnr(28 + Math.random() * 5)
    setStage('done')
  }

  const handleDownload = () => {
    if (!wmPreview || !file) return
    const a = document.createElement('a')
    a.href = wmPreview
    a.download = `watermarked_${file.name}`
    a.click()
  }

  const reset = () => {
    setFile(null); setPreview(null); setWmPreview(null)
    setStage('idle'); setProgress(0); setStepIdx(0); setPsnr(0)
  }

  return (
    <div className="max-w-[1100px] mx-auto px-7 pb-20">

      {/* Header */}
      <div className="text-center pt-16 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-light text-accent text-[12px] font-semibold rounded-full mb-5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
          Step 1 — Watermark Embedding
        </div>
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-normal mb-4 leading-tight">Encode Watermark</h1>
        <p className="text-secondary text-[1.05rem] max-w-lg mx-auto">
          Upload your original image or video. We'll embed an invisible semi-fragile watermark
          so any future tampering can be detected and localized.
        </p>
      </div>

      {/* How it works strip */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { n: '01', title: 'Upload original', desc: 'Your clean, unmodified media' },
          { n: '02', title: 'We embed watermark', desc: 'HIDDeN encoder adds invisible signal' },
          { n: '03', title: 'Download protected', desc: 'Use or share the watermarked file' },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[12px] font-bold shrink-0">{s.n}</div>
            <div>
              <div className="font-semibold text-[13px]">{s.title}</div>
              <div className="text-[12px] text-secondary">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

        {/* Main area */}
        <div>

          {/* ── DONE: show result ── */}
          {stage === 'done' && wmPreview && file ? (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">

              {/* Success banner */}
              <div className="flex items-center gap-3 px-6 py-4 bg-success/5 border-b border-green-200">
                <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m20 6-11 11-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-success">Watermark embedded successfully</p>
                  <p className="text-[12px] text-secondary">PSNR: {psnr.toFixed(1)} dB — image quality preserved</p>
                </div>
              </div>

              {/* Side-by-side preview */}
              <div className="grid grid-cols-2 gap-px bg-border">
                <div className="bg-card">
                  <p className="text-[11px] font-semibold text-muted uppercase tracking-wider px-4 py-2.5 border-b border-border">Original</p>
                  <img src={preview!} alt="original" className="w-full max-h-[360px] object-contain bg-black block" />
                </div>
                <div className="bg-card">
                  <p className="text-[11px] font-semibold text-accent uppercase tracking-wider px-4 py-2.5 border-b border-border flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                    Watermarked
                  </p>
                  <img src={wmPreview} alt="watermarked" className="w-full max-h-[360px] object-contain bg-black block" />
                </div>
              </div>

              {/* Metadata row */}
              <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
                {[
                  { label: 'PSNR', value: `${psnr.toFixed(1)} dB` },
                  { label: 'Watermark', value: 'Embedded ✓' },
                  { label: 'File', value: file.name.length > 20 ? file.name.slice(0, 18) + '…' : file.name },
                ].map((m, i) => (
                  <div key={i} className="px-5 py-3 text-center">
                    <div className="text-[11px] text-muted uppercase tracking-wider mb-0.5">{m.label}</div>
                    <div className="font-semibold text-[13.5px] text-primary">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 p-5 border-t border-border">
                <button onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-[#333] transition-all text-[14px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  Download Watermarked File
                </button>
                <button onClick={reset}
                  className="px-5 py-3.5 border-[1.5px] border-border-strong text-primary font-medium rounded-xl hover:border-primary hover:bg-subtle transition-all text-[14px]">
                  Encode Another
                </button>
              </div>

              {/* Reminder */}
              <div className="mx-5 mb-5 px-4 py-3 bg-warning/5 border border-yellow-200 rounded-xl flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-warning shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" stroke="currentColor" strokeWidth="1.8"/><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <p className="text-[12.5px] text-secondary leading-relaxed">
                  <strong className="text-primary">Keep the original safe.</strong> Share or use the watermarked version.
                  If it gets tampered with, upload it to the <strong className="text-primary">Verify</strong> page to detect and localize changes.
                </p>
              </div>

            </div>

          ) : stage === 'encoding' ? (
            /* ── ENCODING progress ── */
            <div className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center gap-5 text-center">
              <div className="w-14 h-14 border-[3px] border-border border-t-accent rounded-full animate-spin-slow" />
              <h3 className="font-display text-[1.6rem] font-normal">Embedding Watermark</h3>
              <p className="text-secondary text-[13.5px] min-h-[20px]">{ENCODE_STEPS[stepIdx]}</p>
              <div className="w-full max-w-sm h-1.5 bg-subtle rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[13px] text-secondary">{progress}%</span>
              <div className="flex flex-col gap-2 w-full max-w-sm mt-2 text-left">
                {ENCODE_STEPS.map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 text-[12.5px] transition-colors
                    ${i < stepIdx ? 'text-success' : i === stepIdx ? 'text-primary font-medium' : 'text-muted'}`}>
                    <span className="w-4 shrink-0 text-center">{i < stepIdx ? '✓' : i === stepIdx ? '◉' : '○'}</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

          ) : stage === 'preview' && file ? (
            /* ── PREVIEW before encoding ── */
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border gap-3 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-medium text-[13.5px] text-primary">{file.name}</span>
                  <span className="px-2.5 py-0.5 bg-accent-light text-accent text-[11px] font-semibold rounded-full">
                    {file.type.startsWith('video/') ? 'Video' : 'Image'}
                  </span>
                  <span className="text-[12px] text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <button onClick={reset}
                  className="text-[13px] text-secondary hover:text-primary hover:bg-subtle px-3 py-1.5 rounded-lg transition-all">
                  ✕ Remove
                </button>
              </div>

              {preview && (
                file.type.startsWith('video/')
                  ? <video className="w-full max-h-[400px] object-contain bg-black block" src={preview} controls />
                  : <img   className="w-full max-h-[400px] object-contain bg-black block" src={preview} alt="preview" />
              )}

              <div className="p-5">
                <button onClick={startEncoding}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover transition-all text-[15px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  Embed Watermark
                </button>
              </div>
            </div>

          ) : (
            /* ── DROP ZONE ── */
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={() => setStage('idle')}
              className={`border-2 border-dashed rounded-2xl p-20 text-center cursor-pointer transition-all duration-200
                ${stage === 'dragging'
                  ? 'border-accent bg-accent-light'
                  : 'border-border-strong bg-card hover:border-accent hover:bg-accent-light'}`}>
              <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden"
                onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-5 bg-subtle text-accent">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-display text-[1.5rem] font-normal mb-2">Drop your original file here</h3>
              <p className="text-secondary text-[14px] mb-5">or click to browse</p>
              <div className="flex gap-2 justify-center flex-wrap mb-3">
                {['JPG','PNG','MP4','AVI','MOV'].map(t => (
                  <span key={t} className="px-2.5 py-1 bg-accent-light text-accent text-[11px] font-semibold rounded-full">{t}</span>
                ))}
              </div>
              <p className="text-[12px] text-muted">Max file size: 100 MB</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h4 className="font-semibold text-[13px] mb-3 text-primary">What happens to your file?</h4>
            <ul className="flex flex-col gap-3">
              {[
                { icon: '👁️', text: 'Watermark is completely invisible to the human eye' },
                { icon: '🗜️', text: 'Survives normal compression, resizing, and sharing' },
                { icon: '🔓', text: 'Breaks when pixels are maliciously altered' },
                { icon: '📐', text: 'PSNR quality kept above 28 dB' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-secondary">
                  <span className="text-base shrink-0">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-accent-light border border-blue-200 rounded-2xl p-5">
            <h4 className="font-semibold text-[13px] mb-2 text-primary">Next step</h4>
            <p className="text-[12.5px] text-secondary leading-relaxed">
              After downloading the watermarked file, share or use it freely.
              If you suspect it was tampered with later, upload it to the
              <strong className="text-accent"> Verify</strong> page to detect and localize any changes.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h4 className="font-semibold text-[13px] mb-3 text-primary">Use cases</h4>
            <div className="flex flex-col gap-2">
              {['Insurance claim photos', 'Medical imaging', 'Police bodycam footage', 'Official documents', 'News photography'].map((u, i) => (
                <div key={i} className="flex items-center gap-2 text-[12.5px] text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{u}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}