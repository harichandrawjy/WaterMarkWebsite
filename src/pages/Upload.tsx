import { useState, useRef, useCallback } from 'react'
import type { AnalysisResult } from '../App'
import './Upload.css'

interface UploadProps {
  onComplete: (result: AnalysisResult) => void
}

type UploadState = 'idle' | 'dragging' | 'preview' | 'analyzing' | 'done'

const ANALYSIS_STEPS = [
  'Preprocessing media...',
  'Extracting watermark signal...',
  'Running HIDDeN decoder...',
  'Checking integrity map...',
  'Running EfficientNet-B4 + ViT...',
  'Localizing tampered regions...',
  'Generating report...',
]

function mockAnalyze(fileName: string, fileType: 'image' | 'video'): AnalysisResult {
  const tampered = Math.random() > 0.4
  return {
    status: tampered ? 'tampered' : 'authentic',
    confidence: tampered ? 0.82 + Math.random() * 0.15 : 0.88 + Math.random() * 0.1,
    psnr: 28 + Math.random() * 5,
    wmAccuracy: tampered ? 0.52 + Math.random() * 0.15 : 0.88 + Math.random() * 0.1,
    ber: tampered ? 0.35 + Math.random() * 0.1 : 0.03 + Math.random() * 0.05,
    tamperedRegions: tampered
      ? [
          { x: 80, y: 60, w: 200, h: 180, label: 'face_swap' },
          { x: 310, y: 140, w: 90, h: 70, label: 'inpainting' },
        ]
      : [],
    frameResults: fileType === 'video'
      ? Array.from({ length: 12 }, (_, i) => ({
          frame: i + 1,
          status: tampered && (i === 4 || i === 5 || i === 6) ? 'tampered' : 'authentic',
          confidence: 0.75 + Math.random() * 0.2,
        }))
      : undefined,
    fileName,
    fileType,
  }
}

export default function Upload({ onComplete }: UploadProps) {
  const [state, setState] = useState<UploadState>('idle')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [stepIdx, setStepIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/') && !f.type.startsWith('video/')) return
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
    setState('preview')
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setState('idle')
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [])

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setState('dragging') }
  const onDragLeave = () => setState('idle')

  const startAnalysis = async () => {
    if (!file) return
    setState('analyzing')
    setStepIdx(0)
    setProgress(0)

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400))
      setStepIdx(i)
      setProgress(Math.round(((i + 1) / ANALYSIS_STEPS.length) * 100))
    }

    const fileType = file.type.startsWith('video/') ? 'video' : 'image'
    const result = mockAnalyze(file.name, fileType)
    await new Promise(r => setTimeout(r, 300))
    onComplete(result)
  }

  const reset = () => {
    setFile(null); setPreview(null); setState('idle'); setProgress(0); setStepIdx(0)
  }

  return (
    <div className="upload-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Tamper Detection</h1>
          <p className="page-subtitle">Upload an image or video — we'll embed a watermark and verify its integrity instantly.</p>
        </div>

        <div className="upload-layout">
          {/* Drop Zone */}
          <div className="upload-main">
            {state === 'analyzing' ? (
              <div className="analysis-box card">
                <div className="analysis-spinner"></div>
                <h3 className="analysis-title">Analyzing Media</h3>
                <p className="analysis-step">{ANALYSIS_STEPS[stepIdx]}</p>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="progress-label">{progress}%</span>
                <div className="analysis-steps-list">
                  {ANALYSIS_STEPS.map((s, i) => (
                    <div key={i} className={`analysis-step-item ${i < stepIdx ? 'done' : i === stepIdx ? 'active' : ''}`}>
                      <span className="step-check">
                        {i < stepIdx ? '✓' : i === stepIdx ? '◉' : '○'}
                      </span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ) : state === 'preview' && file ? (
              <div className="preview-box card">
                <div className="preview-box__header">
                  <div className="preview-meta">
                    <span className="preview-filename">{file.name}</span>
                    <span className="badge badge-accent">{file.type.startsWith('video/') ? 'Video' : 'Image'}</span>
                    <span className="preview-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={reset}>✕ Remove</button>
                </div>
                {preview && (
                  file.type.startsWith('video/')
                    ? <video className="preview-media" src={preview} controls />
                    : <img className="preview-media" src={preview} alt="preview" />
                )}
                <div className="preview-box__footer">
                  <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={startAnalysis}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="m10 8 6 4-6 4V8z" fill="currentColor"/>
                    </svg>
                    Run Analysis
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`dropzone card ${state === 'dragging' ? 'dropzone--active' : ''}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
                />
                <div className="dropzone__icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="dropzone__title">Drop your file here</h3>
                <p className="dropzone__desc">or click to browse</p>
                <div className="dropzone__types">
                  <span className="badge badge-accent">JPG</span>
                  <span className="badge badge-accent">PNG</span>
                  <span className="badge badge-accent">MP4</span>
                  <span className="badge badge-accent">AVI</span>
                  <span className="badge badge-accent">MOV</span>
                </div>
                <p className="dropzone__limit">Max file size: 100 MB</p>
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <aside className="upload-sidebar">
            <div className="card sidebar-card">
              <h4 className="sidebar-card__title">What we detect</h4>
              <ul className="detect-list">
                {['Face swapping / deepfake', 'Object removal', 'Inpainting / copy-move', 'Splicing attacks', 'Frame insertion/deletion', 'Pixel-level manipulation'].map((item, i) => (
                  <li key={i} className="detect-list__item">
                    <span className="detect-list__dot"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card sidebar-card sidebar-card--highlight">
              <h4 className="sidebar-card__title">Privacy Notice</h4>
              <p className="sidebar-card__text">
                Your media is processed locally and never stored permanently.
                All analysis data is deleted after 24 hours.
              </p>
            </div>

            <div className="card sidebar-card">
              <h4 className="sidebar-card__title">Supported formats</h4>
              <div className="format-grid">
                {['JPEG', 'PNG', 'WebP', 'BMP', 'MP4', 'AVI', 'MOV', 'MKV'].map(f => (
                  <span key={f} className="format-tag">{f}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}