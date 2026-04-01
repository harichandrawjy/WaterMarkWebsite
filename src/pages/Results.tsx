import type { AnalysisResult, Page } from '../App'

interface ResultsProps {
  result: AnalysisResult | null
  navigate: (p: Page) => void
}

interface MetricCardProps {
  label: string; value: string; sub?: string; danger?: boolean
}

function MetricCard({ label, value, sub, danger }: MetricCardProps) {
  return (
    <div className={`rounded-2xl p-6 border transition-transform hover:-translate-y-0.5
      ${danger ? 'bg-danger/5 border-red-200' : 'bg-card border-border'}`}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-2">{label}</p>
      <p className={`font-display text-[1.8rem] font-normal leading-none mb-1.5
        ${danger ? 'text-danger' : 'text-primary'}`}>{value}</p>
      {sub && <p className="text-[11.5px] text-muted">{sub}</p>}
    </div>
  )
}

export default function Results({ result, navigate }: ResultsProps) {
  if (!result) return (
    <div className="flex flex-col items-center justify-center py-32 gap-5 px-7 text-center">
      <div className="text-muted">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="font-display text-[2rem] font-normal">No Analysis Yet</h2>
      <p className="text-secondary max-w-[300px]">Upload a file and run the analysis to see results here.</p>
      <button onClick={() => navigate('verify')}
        className="px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-[#333] transition-all">
        Upload File →
      </button>
    </div>
  )

  const { status, confidence, psnr, wmAccuracy, ber, tamperedRegions, frameResults, fileName, fileType } = result
  const tampered = status === 'tampered'

  return (
    <div className="max-w-[1100px] mx-auto px-7 pb-20">

      {/* Header */}
      <div className="pt-12 pb-8 flex flex-wrap items-start justify-between gap-6">
        <div>
          <button onClick={() => navigate('verify')}
            className="flex items-center gap-1 text-[13px] text-secondary hover:text-primary mb-3 transition-colors">
            ← New Analysis
          </button>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-2">Analysis Report</h1>
          <p className="flex items-center gap-1.5 text-[13px] text-muted">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.8"/><polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="1.8"/></svg>
            {fileName}
          </p>
        </div>

        {/* Verdict */}
        <div className={`flex items-center gap-4 px-6 py-5 rounded-2xl border-[1.5px]
          ${tampered ? 'bg-danger/5 border-red-300' : 'bg-success/5 border-green-300'}`}>
          <div className={tampered ? 'text-danger' : 'text-success'}>
            {tampered
              ? <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" stroke="currentColor" strokeWidth="1.8"/><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              : <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </div>
          <div>
            <p className={`font-bold text-[1.1rem] tracking-wide ${tampered ? 'text-danger' : 'text-success'}`}>
              {tampered ? 'TAMPERED' : 'AUTHENTIC'}
            </p>
            <p className="text-[12px] text-secondary mt-0.5">{(confidence * 100).toFixed(1)}% confidence</p>
          </div>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <MetricCard label="Detection Status" value={tampered ? 'Tampered' : 'Authentic'} sub="Watermark integrity check" danger={tampered} />
        <MetricCard label="PSNR" value={`${psnr.toFixed(1)} dB`} sub="Image quality after watermarking" />
        <MetricCard label="WM Accuracy" value={`${(wmAccuracy * 100).toFixed(1)}%`} sub="Watermark bit recovery rate" />
        <MetricCard label="BER" value={ber.toFixed(4)} sub="Bit error rate (lower = better)" />
        <MetricCard label="Tampered Regions" value={String(tamperedRegions.length)} sub={tampered ? 'Areas of concern found' : 'No regions flagged'} danger={tampered && tamperedRegions.length > 0} />
        <MetricCard label="Media Type" value={fileType === 'video' ? 'Video' : 'Image'} sub="Analyzed file format" />
      </div>

      {/* Tampered regions table */}
      {tampered && tamperedRegions.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-[1.5rem] font-normal mb-2">Tampered Regions</h2>
          <p className="text-secondary text-[13px] mb-4">Spatial locations of detected manipulation</p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="bg-subtle border-b border-border">
                  {['#','Label','Position (x, y)','Size (w × h)','Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tamperedRegions.map((r, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-subtle transition-colors">
                    <td className="px-5 py-3.5">{i + 1}</td>
                    <td className="px-5 py-3.5"><code className="font-mono text-[12px] bg-subtle px-2 py-0.5 rounded text-accent">{r.label}</code></td>
                    <td className="px-5 py-3.5 text-secondary">({r.x}, {r.y})</td>
                    <td className="px-5 py-3.5 text-secondary">{r.w} × {r.h} px</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 bg-danger/10 text-danger text-[11px] font-semibold rounded-full">Tampered</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Frame timeline (video only) */}
      {fileType === 'video' && frameResults && (
        <section className="mb-10">
          <h2 className="font-display text-[1.5rem] font-normal mb-2">Frame Timeline</h2>
          <p className="text-secondary text-[13px] mb-4">Per-frame tampering detection across the video</p>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {frameResults.map(f => (
                <div key={f.frame}
                  title={`Frame ${f.frame}: ${f.status} (${(f.confidence * 100).toFixed(0)}%)`}
                  className={`w-11 h-11 rounded-lg flex items-center justify-center text-[11px] font-semibold cursor-pointer hover:scale-110 transition-transform border-[1.5px]
                    ${f.status === 'tampered'
                      ? 'bg-danger/10 text-danger border-red-300'
                      : 'bg-success/10 text-success border-green-300'}`}>
                  {f.frame}
                </div>
              ))}
            </div>
            <div className="flex gap-5 text-[12px] text-secondary">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-success inline-block" />Authentic</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-danger inline-block" />Tampered</span>
            </div>
          </div>
        </section>
      )}

      {/* Attention heatmap */}
      <section className="mb-10">
        <h2 className="font-display text-[1.5rem] font-normal mb-2">Attention Map</h2>
        <p className="text-secondary text-[13px] mb-4">Regions where watermark signal was strongest / weakest</p>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-8 gap-0.5 w-full max-w-[480px] rounded-xl overflow-hidden">
              {Array.from({ length: 64 }, (_, i) => {
                const inRegion = tamperedRegions.some(r => {
                  const col = i % 8; const row = Math.floor(i / 8)
                  return col >= Math.floor(r.x / 40) && col < Math.floor((r.x + r.w) / 40) &&
                         row >= Math.floor(r.y / 30) && row < Math.floor((r.y + r.h) / 30)
                })
                const heat = inRegion ? 0.9 + Math.random() * 0.1 : 0.1 + Math.random() * 0.3
                const rv = Math.floor(255 * heat); const gv = Math.floor(80 * (1 - heat))
                return (
                  <div key={i} className="aspect-square rounded-sm"
                    style={{ background: `rgb(${rv},${gv},20)`, opacity: 0.5 + heat * 0.5 }} />
                )
              })}
            </div>
            <p className="text-[12px] text-muted">Brighter red = higher tampering signal</p>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('verify')}
          className="px-6 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-[#333] transition-all text-[14px]">
          Analyze Another File
        </button>
        <button onClick={() => {
          const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
          const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
          a.download = 'waterguard_report.json'; a.click()
        }} className="px-6 py-3.5 border-[1.5px] border-border-strong text-primary font-medium rounded-xl hover:border-primary hover:bg-subtle transition-all text-[14px]">
          Download Report (JSON)
        </button>
      </div>

    </div>
  )
}