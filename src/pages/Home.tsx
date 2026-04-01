import type { Page } from '../App'

interface HomeProps { navigate: (p: Page) => void }

const CODE_SAMPLE = `{
  "status": "tampered",
  "confidence": 0.943,
  "psnr": 29.5,
  "wm_accuracy": 0.562,
  "tampered_regions": [
    {
      "frame": 12,
      "x": 102, "y": 84,
      "w": 210, "h": 198,
      "label": "face_swap"
    }
  ]
}`

const USE_CASES = [
  { emoji: '🏥', label: 'Medical Imaging',   desc: 'Protect X-rays and ultrasound videos' },
  { emoji: '⚖️', label: 'Legal Evidence',    desc: 'Verify footage chain-of-custody' },
  { emoji: '📰', label: 'News Media',        desc: 'Authenticate photojournalism' },
  { emoji: '🎓', label: 'Education',         desc: 'Secure academic transcripts' },
  { emoji: '🛡️', label: 'Insurance',         desc: 'Validate accident documentation' },
  { emoji: '📱', label: 'Social Media',      desc: 'Combat deepfake misinformation' },
]

export default function Home({ navigate }: HomeProps) {
  return (
    <div className="bg-bg">

      {/* ── Hero ── */}
      <section className="max-w-[1100px] mx-auto px-7 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-light text-accent text-[12px] font-semibold rounded-full mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            Fragile Watermarking Technology
          </div>

          <h1 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-normal leading-[1.12] tracking-tight mb-5 animate-fade-up [animation-delay:100ms]">
            Protect &amp; Verify<br />
            <em className="text-accent not-italic">Your Digital Media</em>
          </h1>

          <p className="text-[1.05rem] text-secondary leading-relaxed max-w-[460px] mb-10 animate-fade-up [animation-delay:200ms]">
            Embed an invisible watermark into your photos and videos. If they're ever
            tampered with, come back to detect exactly what changed — down to the pixel and frame.
          </p>

          {/* Two clear CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-up [animation-delay:300ms]">
            <button onClick={() => navigate('encode')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover hover:-translate-y-px hover:shadow-md transition-all text-[15px]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              Encode a Watermark
              <span className="ml-1 inline-flex items-center whitespace-nowrap px-4 py-2 leading-none bg-white/20 text-white text-[10px] font-bold rounded-full">STEP 1</span>
            </button>
            <button onClick={() => navigate('verify')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-medium rounded-xl hover:bg-[#333] hover:-translate-y-px hover:shadow-md transition-all text-[15px]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Verify Integrity
              <span className="ml-1 inline-flex items-center whitespace-nowrap px-4 py-2 leading-none bg-white/20 text-white text-[10px] font-bold rounded-full">STEP 2</span>
            </button>
          </div>

          {/* Stats */}
          <div className="inline-flex items-center gap-6 px-6 py-4 bg-card border border-border rounded-xl shadow-sm animate-fade-up [animation-delay:400ms]">
            {[
              { val: '29–31', unit: 'dB', label: 'PSNR Quality' },
              { val: '62',    unit: '%',  label: 'WM Accuracy'  },
              { val: '2',     unit: '',   label: 'Media Types'  },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-9 bg-border" />}
                <div className="flex flex-col gap-0.5">
                  <span className="font-display text-[1.5rem] leading-none">
                    {s.val}<small className="text-[0.85rem] font-body">{s.unit}</small>
                  </span>
                  <span className="text-[11px] text-muted font-medium uppercase tracking-wide">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code card */}
        <div className="hidden lg:flex justify-center">
          <div className="w-full max-w-[380px] bg-[#0f1117] rounded-2xl overflow-hidden shadow-lg">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1a1d24] border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
              <span className="ml-2 text-[11px] text-white/30 font-mono">analysis_result.json</span>
            </div>
            <pre className="p-5 font-mono text-[12px] leading-[1.75] text-slate-200 overflow-x-auto whitespace-pre">{CODE_SAMPLE}</pre>
          </div>
        </div>
      </section>

      {/* ── Two-step flow ── */}
      <section className="bg-subtle py-20">
        <div className="max-w-[1100px] mx-auto px-7">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">How It Works</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal mb-12 max-w-xl leading-tight">
            Two simple steps to protect your media
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Encode card */}
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-5 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              onClick={() => navigate('encode')}>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[11px] font-bold tracking-widest text-accent bg-accent-light px-2.5 py-1 rounded-full">STEP 1</span>
              </div>
              <div>
                <h3 className="font-display text-[1.4rem] font-normal mb-2">Encode Watermark</h3>
                <p className="text-secondary text-[14px] leading-relaxed">
                  Upload your original image or video. We embed an invisible semi-fragile watermark
                  using the HIDDeN encoder. Download the protected file and share it freely.
                </p>
              </div>
              <ul className="flex flex-col gap-2 mt-auto">
                {['Invisible to the human eye', 'Survives normal compression', 'PSNR quality above 28 dB'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12.5px] text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button className="flex items-center gap-2 text-accent text-[13.5px] font-semibold group-hover:gap-3 transition-all">
                Go to Encode →
              </button>
            </div>

            {/* Verify card */}
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-5 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              onClick={() => navigate('verify')}>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-danger/10 text-danger rounded-xl flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[11px] font-bold tracking-widest text-danger bg-danger/10 px-2.5 py-1 rounded-full">STEP 2</span>
              </div>
              <div>
                <h3 className="font-display text-[1.4rem] font-normal mb-2">Verify Integrity</h3>
                <p className="text-secondary text-[14px] leading-relaxed">
                  Upload a watermarked file you suspect was tampered with. Our system extracts the
                  watermark signal and localizes any modifications — spatially and temporally.
                </p>
              </div>
              <ul className="flex flex-col gap-2 mt-auto">
                {['Detects face swap, inpainting & splicing', 'Highlights exact tampered regions', 'Per-frame analysis for video'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12.5px] text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button className="flex items-center gap-2 text-danger text-[13.5px] font-semibold group-hover:gap-3 transition-all">
                Go to Verify →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pipeline ── */}
      <section className="py-20">
        <div className="max-w-[1100px] mx-auto px-7">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">Full Pipeline</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal mb-12 leading-tight">
            From upload to result in seconds
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Upload original',   desc: 'Clean, unmodified media' },
              { n: '02', title: 'Embed watermark',   desc: 'HIDDeN encoder + noise layer' },
              { n: '03', title: 'Detect tampering',  desc: 'Decoder checks integrity' },
              { n: '04', title: 'Localize changes',  desc: 'EfficientNet-B4 + ViT output' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center font-display text-lg mx-auto mb-4">{s.n}</div>
                <h4 className="font-semibold text-[15px] mb-1">{s.title}</h4>
                <p className="text-[13px] text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="bg-subtle py-20">
        <div className="max-w-[1100px] mx-auto px-7">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">Applications</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal mb-12 leading-tight">
            Built for real-world integrity needs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((u, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl flex items-center gap-4 px-5 py-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <span className="text-2xl shrink-0">{u.emoji}</span>
                <div>
                  <div className="font-semibold text-[13.5px] mb-0.5">{u.label}</div>
                  <div className="text-[12px] text-secondary">{u.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-[1100px] mx-auto px-7">
          <div className="bg-primary rounded-[28px] px-12 py-14 text-center">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-normal text-white mb-3">
              Start protecting your media today
            </h2>
            <p className="text-white/60 text-[15px] mb-8 max-w-md mx-auto">
              Encode a watermark in seconds. Verify integrity anytime, anywhere.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button onClick={() => navigate('encode')}
                className="px-7 py-3.5 bg-white text-primary font-medium rounded-xl hover:bg-gray-100 transition-all text-[15px]">
                Encode Watermark →
              </button>
              <button onClick={() => navigate('verify')}
                className="px-7 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all text-[15px]">
                Verify a File
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}