import type { Page } from '../App'
import './Home.css'

interface HomeProps { navigate: (page: Page) => void }

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Semi-Fragile Watermarking',
    desc: 'Invisible watermarks embedded via HIDDeN + Attention Bottleneck encoder survive normal compression but break under malicious tampering.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8"/>
        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Spatial Localization',
    desc: 'EfficientNet-B4 + ViT pinpoints exactly which regions in a frame were altered — down to the pixel block level.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 9l3 3 4-4 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Temporal Verification',
    desc: 'For video content, detect which specific frames were tampered with and trace alterations across the timeline.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'REST API Ready',
    desc: 'FastAPI backend with clean JSON responses. Integrate watermark embedding and tamper detection into any application.',
  },
]

const USE_CASES = [
  { emoji: '🏥', label: 'Medical Imaging', desc: 'Protect X-rays and ultrasound videos' },
  { emoji: '⚖️', label: 'Legal Evidence', desc: 'Verify footage chain-of-custody' },
  { emoji: '📰', label: 'News Media', desc: 'Authenticate photojournalism' },
  { emoji: '🎓', label: 'Education', desc: 'Secure academic transcripts' },
  { emoji: '🛡️', label: 'Insurance', desc: 'Validate accident documentation' },
  { emoji: '📱', label: 'Social Media', desc: 'Combat deepfake misinformation' },
]

export default function Home({ navigate }: HomeProps) {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero__badge badge badge-accent animate-fadeUp" style={{ animationDelay: '0s' }}>
            <span className="hero__dot"></span>
            Fragile Watermarking Technology
          </div>
          <h1 className="hero__title animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            Detect Tampered Media<br />
            <em>Before It Spreads</em>
          </h1>
          <p className="hero__desc animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            Upload images or videos — our system embeds invisible watermarks and
            detects any manipulation with spatio-temporal localization. Know exactly
            what was changed, where, and when.
          </p>
          <div className="hero__actions animate-fadeUp" style={{ animationDelay: '0.3s' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('upload')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Upload &amp; Detect
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('about')}>
              Learn How It Works
            </button>
          </div>

          <div className="hero__stats animate-fadeUp" style={{ animationDelay: '0.4s' }}>
            <div className="stat">
              <span className="stat__val">29–31<small>dB</small></span>
              <span className="stat__label">PSNR Quality</span>
            </div>
            <div className="stat__divider"></div>
            <div className="stat">
              <span className="stat__val">62<small>%</small></span>
              <span className="stat__label">WM Accuracy</span>
            </div>
            <div className="stat__divider"></div>
            <div className="stat">
              <span className="stat__val">2</span>
              <span className="stat__label">Media Types</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="visual-card">
            <div className="visual-card__header">
              <span className="vcircle vcircle--red"></span>
              <span className="vcircle vcircle--yellow"></span>
              <span className="vcircle vcircle--green"></span>
              <span className="visual-card__title">analysis_result.json</span>
            </div>
            <pre className="visual-card__code">{`{
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
}`}</pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features section">
        <div className="container">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Proactive protection for digital media</h2>
          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card card animate-fadeUp" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="pipeline section">
        <div className="container">
          <div className="section-label">Pipeline</div>
          <h2 className="section-title">From upload to result in seconds</h2>
          <div className="pipeline__steps">
            {[
              { n: '01', title: 'Upload', desc: 'Drop your image or video file' },
              { n: '02', title: 'Embed', desc: 'Watermark injected via HIDDeN encoder' },
              { n: '03', title: 'Verify', desc: 'Decoder checks watermark integrity' },
              { n: '04', title: 'Localize', desc: 'Tampered regions highlighted on output' },
            ].map((s, i) => (
              <div key={i} className="pipeline__step">
                <div className="pipeline__num">{s.n}</div>
                <div className="pipeline__line"></div>
                <h4 className="pipeline__title">{s.title}</h4>
                <p className="pipeline__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="usecases section">
        <div className="container">
          <div className="section-label">Applications</div>
          <h2 className="section-title">Built for real-world integrity needs</h2>
          <div className="usecases__grid">
            {USE_CASES.map((u, i) => (
              <div key={i} className="usecase-card card">
                <span className="usecase-card__emoji">{u.emoji}</span>
                <div>
                  <div className="usecase-card__label">{u.label}</div>
                  <div className="usecase-card__desc">{u.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-box__title">Ready to verify your media?</h2>
            <p className="cta-box__desc">Upload an image or video and get a full tampering analysis report in seconds.</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('upload')}>
              Start Analysis →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}