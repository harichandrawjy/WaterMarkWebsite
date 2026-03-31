import type { AnalysisResult, Page } from '../App'
import './Results.css'

interface ResultsProps {
  result: AnalysisResult | null
  navigate: (page: Page) => void
}

function MetricCard({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`metric-card card ${highlight ? 'metric-card--highlight' : ''}`}>
      <div className="metric-card__label">{label}</div>
      <div className="metric-card__value">{value}</div>
      {sub && <div className="metric-card__sub">{sub}</div>}
    </div>
  )
}

export default function Results({ result, navigate }: ResultsProps) {
  if (!result) {
    return (
      <div className="results-page">
        <div className="container">
          <div className="no-result">
            <div className="no-result__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="no-result__title">No Analysis Yet</h2>
            <p className="no-result__desc">Upload a file and run the analysis to see results here.</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('upload')}>
              Upload File →
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { status, confidence, psnr, wmAccuracy, ber, tamperedRegions, frameResults, fileName, fileType } = result
  const isTampered = status === 'tampered'

  return (
    <div className="results-page">
      <div className="container">
        {/* Header */}
        <div className="results-header">
          <div className="results-header__left">
            <div className="results-breadcrumb">
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('upload')}>← New Analysis</button>
            </div>
            <h1 className="page-title" style={{ marginBottom: 8 }}>Analysis Report</h1>
            <p className="results-filename">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.8"/>
                <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              {fileName}
            </p>
          </div>
          <div className={`verdict-badge ${isTampered ? 'verdict-badge--tampered' : 'verdict-badge--authentic'}`}>
            <div className="verdict-icon">
              {isTampered
                ? <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" stroke="currentColor" strokeWidth="1.8"/><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                : <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            </div>
            <div>
              <div className="verdict-label">{isTampered ? 'TAMPERED' : 'AUTHENTIC'}</div>
              <div className="verdict-conf">{(confidence * 100).toFixed(1)}% confidence</div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="metrics-grid">
          <MetricCard label="Detection Status" value={isTampered ? 'Tampered' : 'Authentic'} sub="Watermark integrity check" highlight={isTampered} />
          <MetricCard label="PSNR" value={`${psnr.toFixed(1)} dB`} sub="Image quality after watermarking" />
          <MetricCard label="WM Accuracy" value={`${(wmAccuracy * 100).toFixed(1)}%`} sub="Watermark bit recovery rate" />
          <MetricCard label="BER" value={ber.toFixed(4)} sub="Bit error rate (lower = better)" />
          <MetricCard label="Tampered Regions" value={String(tamperedRegions.length)} sub={isTampered ? 'Areas of concern found' : 'No regions flagged'} />
          <MetricCard label="Media Type" value={fileType === 'video' ? 'Video' : 'Image'} sub="Analyzed file format" />
        </div>

        {/* Tampered Regions */}
        {isTampered && tamperedRegions.length > 0 && (
          <section className="results-section">
            <h2 className="results-section__title">Tampered Regions</h2>
            <div className="regions-table-wrap card">
              <table className="regions-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Label</th>
                    <th>Position (x, y)</th>
                    <th>Size (w × h)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tamperedRegions.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><code className="code-tag">{r.label}</code></td>
                      <td>({r.x}, {r.y})</td>
                      <td>{r.w} × {r.h} px</td>
                      <td><span className="badge badge-danger">Tampered</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Frame Timeline (Video) */}
        {fileType === 'video' && frameResults && (
          <section className="results-section">
            <h2 className="results-section__title">Frame Timeline</h2>
            <p className="results-section__sub">Per-frame tampering detection across the video</p>
            <div className="card timeline-card">
              <div className="frame-timeline">
                {frameResults.map((f) => (
                  <div key={f.frame} className={`frame-block ${f.status === 'tampered' ? 'frame-block--bad' : 'frame-block--ok'}`} title={`Frame ${f.frame}: ${f.status} (${(f.confidence * 100).toFixed(0)}%)`}>
                    <span className="frame-num">{f.frame}</span>
                  </div>
                ))}
              </div>
              <div className="timeline-legend">
                <span className="legend-item"><span className="legend-dot legend-dot--ok"></span>Authentic</span>
                <span className="legend-item"><span className="legend-dot legend-dot--bad"></span>Tampered</span>
              </div>
            </div>
          </section>
        )}

        {/* Watermark Heatmap (visual placeholder) */}
        <section className="results-section">
          <h2 className="results-section__title">Attention Map</h2>
          <p className="results-section__sub">Regions where watermark signal was strongest / weakest</p>
          <div className="card heatmap-card">
            <div className="heatmap-placeholder">
              <div className="heatmap-grid">
                {Array.from({ length: 64 }, (_, i) => {
                  const inRegion = tamperedRegions.some(r => {
                    const col = i % 8; const row = Math.floor(i / 8)
                    return col >= Math.floor(r.x / 40) && col < Math.floor((r.x + r.w) / 40) &&
                           row >= Math.floor(r.y / 30) && row < Math.floor((r.y + r.h) / 30)
                  })
                  const heat = inRegion ? 0.9 + Math.random() * 0.1 : 0.1 + Math.random() * 0.3
                  const r2 = Math.floor(255 * heat)
                  const g2 = Math.floor(80 * (1 - heat))
                  return <div key={i} className="heatmap-cell" style={{ background: `rgb(${r2},${g2},20)`, opacity: 0.6 + heat * 0.4 }} />
                })}
              </div>
              <div className="heatmap-label">
                Attention Heatmap — brighter red = higher tampering signal
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="results-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('upload')}>
            Analyze Another File
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => {
            const data = JSON.stringify(result, null, 2)
            const blob = new Blob([data], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url; a.download = 'waterguard_report.json'; a.click()
          }}>
            Download Report (JSON)
          </button>
        </div>
      </div>
    </div>
  )
}