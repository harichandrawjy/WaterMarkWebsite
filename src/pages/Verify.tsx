import { useState, useRef, useCallback } from 'react'
import type { AnalysisResult } from '../App'

interface VerifyProps {
  onComplete: (r: AnalysisResult) => void
}

type Stage = 'idle' | 'dragging' | 'preview' | 'verifying'

const VERIFY_STEPS = [
  'Reading watermarked file...',
  'Extracting watermark bits...',
  'Running HIDDeN decoder...',
  'Comparing against reference...',
  'Computing BER per region...',
  'Running EfficientNet-B4 + ViT...',
  'Localizing tampered regions...',
  'Generating report...',
]

function mockResult(name: string, type: 'image' | 'video'): AnalysisResult {
  const tampered = Math.random() > 0.4
  return {
    status: tampered ? 'tampered' : 'authentic',
    confidence: tampered ? 0.82 + Math.random() * 0.15 : 0.88 + Math.random() * 0.1,
    psnr: 28 + Math.random() * 5,
    wmAccuracy: tampered ? 0.52 + Math.random() * 0.15 : 0.88 + Math.random() * 0.1,
    ber: tampered ? 0.35 + Math.random() * 0.1 : 0.03 + Math.random() * 0.05,
    tamperedRegions: tampered
      ? [{ x: 80, y: 60, w: 200, h: 180, label: 'face_swap' }, { x: 310, y: 140, w: 90, h: 70, label: 'inpainting' }]
      : [],
    frameResults: type === 'video'
      ? Array.from({ length: 12 }, (_, i) => ({
          frame: i + 1,
          status: tampered && (i === 4 || i === 5 || i === 6) ? 'tampered' : 'authentic',
          confidence: 0.75 + Math.random() * 0.2,
        }))
      : undefined,
    fileName: name,
    fileType: type,
  }
}

const DETECT_ITEMS = [
  'Face swapping / deepfake',
  'Object removal',
  'Inpainting / copy-move',
  'Splicing attacks',
  'Frame insertion / deletion',
  'Pixel-level manipulation',
]

export default function Verify({ onComplete }: VerifyProps) {
  const [stage,    setStage]    = useState<Stage>('idle')
  const [file,     setFile]     = useState<File | null>(null)
  const [preview,  setPreview]  = useState<string | null>(null)
  const [stepIdx,  setStepIdx]  = useState(0)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/') && !f.type.startsWith('video/')) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setStage('preview')
  }

  const onDrop     = useCallback((e: React.DragEvent) => { e.preventDefault(); setStage('idle'); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }, [])
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setStage('dragging') }

  const startVerify = async () => {
    if (!file) return
    setStage('verifying')
    setStepIdx(0); setProgress(0)

    for (let i = 0; i < VERIFY_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 400))
      setStepIdx(i)
      setProgress(Math.round(((i + 1) / VERIFY_STEPS.length) * 100))
    }

    await new Promise(r => setTimeout(r, 300))
    onComplete(mockResult(file.name, file.type.startsWith('video/') ? 'video' : 'image'))
  }

  const reset = () => { setFile(null); setPreview(null); setStage('idle'); setProgress(0); setStepIdx(0) }

  return (
    <div className="max-w-[1100px] mx-auto px-7 pb-20">

      {/* Header */}
      <div className="text-center pt-16 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-danger/10 text-danger text-[12px] font-semibold rounded-full mb-5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Step 2 — Watermark Verification
        </div>
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-normal mb-4 leading-tight">Verify Integrity</h1>
        <p className="text-secondary text-[1.05rem] max-w-lg mx-auto">
          Upload your watermarked image or video. We'll extract the watermark signal and detect
          exactly where and when any tampering occurred.
        </p>
      </div>

      {/* How it works strip */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { n: '01', title: 'Upload watermarked file', desc: 'The file you previously encoded' },
          { n: '02', title: 'We extract & verify',     desc: 'Decoder checks every region\'s watermark' },
          { n: '03', title: 'See the full report',     desc: 'Tampered regions highlighted with details' },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-danger/10 text-danger flex items-center justify-center text-[12px] font-bold shrink-0">{s.n}</div>
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

          {stage === 'verifying' ? (
            /* ── VERIFYING progress ── */
            <div className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center gap-5 text-center">
              <div className="w-14 h-14 border-[3px] border-border border-t-danger rounded-full animate-spin-slow" />
              <h3 className="font-display text-[1.6rem] font-normal">Verifying Watermark</h3>
              <p className="text-secondary text-[13.5px] min-h-[20px]">{VERIFY_STEPS[stepIdx]}</p>
              <div className="w-full max-w-sm h-1.5 bg-subtle rounded-full overflow-hidden">
                <div className="h-full bg-danger rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[13px] text-secondary">{progress}%</span>
              <div className="flex flex-col gap-2 w-full max-w-sm mt-2 text-left">
                {VERIFY_STEPS.map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 text-[12.5px] transition-colors
                    ${i < stepIdx ? 'text-success' : i === stepIdx ? 'text-primary font-medium' : 'text-muted'}`}>
                    <span className="w-4 shrink-0 text-center">{i < stepIdx ? '✓' : i === stepIdx ? '◉' : '○'}</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

          ) : stage === 'preview' && file ? (
            /* ── PREVIEW before verifying ── */
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

              {/* Warning if not a watermarked file */}
              <div className="mx-5 mt-4 px-4 py-3 bg-warning/5 border border-yellow-200 rounded-xl flex items-start gap-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-warning shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" stroke="currentColor" strokeWidth="1.8"/><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <p className="text-[12px] text-secondary">
                  Make sure this file was previously watermarked using our <strong className="text-primary">Encode</strong> page.
                  Verifying a non-watermarked file will always return a tampered result.
                </p>
              </div>

              <div className="p-5">
                <button onClick={startVerify}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-medium rounded-xl hover:bg-[#333] transition-all text-[15px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Run Verification
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
                  ? 'border-danger bg-danger/5'
                  : 'border-border-strong bg-card hover:border-danger hover:bg-danger/5'}`}>
              <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden"
                onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
              <div className="w-[72px] h-[72px] rounded-full bg-subtle text-danger flex items-center justify-center mx-auto mb-5">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-display text-[1.5rem] font-normal mb-2">Drop your watermarked file here</h3>
              <p className="text-secondary text-[14px] mb-5">or click to browse</p>
              <div className="flex gap-2 justify-center flex-wrap mb-3">
                {['JPG','PNG','MP4','AVI','MOV'].map(t => (
                  <span key={t} className="px-2.5 py-1 bg-danger/10 text-danger text-[11px] font-semibold rounded-full">{t}</span>
                ))}
              </div>
              <p className="text-[12px] text-muted">Max file size: 100 MB</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h4 className="font-semibold text-[13px] mb-3 text-primary">What we detect</h4>
            <ul className="flex flex-col gap-2">
              {DETECT_ITEMS.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[12.5px] text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-danger shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h4 className="font-semibold text-[13px] mb-3 text-primary">What you get back</h4>
            <ul className="flex flex-col gap-3">
              {[
                { icon: '✅', text: 'Authentic / Tampered verdict with confidence score' },
                { icon: '📍', text: 'Exact pixel regions that were altered' },
                { icon: '🎞️', text: 'Per-frame timeline for video files' },
                { icon: '🌡️', text: 'Attention heatmap of watermark signal' },
                { icon: '📄', text: 'Downloadable JSON report' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-secondary">
                  <span className="text-base shrink-0">{item.icon}</span>{item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-danger/5 border border-red-200 rounded-2xl p-5">
            <h4 className="font-semibold text-[13px] mb-2 text-primary">Privacy Notice</h4>
            <p className="text-[12.5px] text-secondary leading-relaxed">
              Uploaded files are processed only for analysis and deleted immediately after.
              No media is stored on our servers.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}