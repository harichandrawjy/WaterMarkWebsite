const TEAM = [
  { name: '彭定康', id: 'D1229568', role: 'Encoder / Decoder / Frontend',    initial: '彭' },
  { name: '張志成', id: 'D1231400', role: 'Tamper Detection / Backend',       initial: '張' },
  { name: '吳尚恩', id: 'D1249268', role: 'Tamper Localization / Frontend',   initial: '吳' },
  { name: '鄭建良', id: 'D1231150', role: 'Encoder / Decoder / Backend',      initial: '鄭' },
]

const TECH = [
  { cat: 'Watermarking',   items: ['HIDDeN', 'Attention Bottleneck', 'OpenCV', 'NumPy', 'FFmpeg'] },
  { cat: 'ML / Training',  items: ['PyTorch', 'Torchvision', 'EfficientNet-B4', 'ViT', 'Albumentations'] },
  { cat: 'Backend / API',  items: ['FastAPI', 'Python', 'MySQL', 'REST API', 'JSON'] },
  { cat: 'Frontend',       items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
]

const PHASES = [
  { period: 'Mar – Apr', pct: '25%', title: 'Foundation', tasks: ['Dataset collection', 'Encoder + Decoder prototype'], s: 'done' },
  { period: 'Apr – May', pct: '50%', title: 'Detection',  tasks: ['Tamper Detection module', 'Deepfake Detection integration'], s: 'active' },
  { period: 'Jun – Jul', pct: '75%', title: 'Integration',tasks: ['Full system integration', 'Website + API development'], s: 'upcoming' },
  { period: 'Jul – Sep', pct: '100%',title: 'Completion', tasks: ['Result packaging', 'Final evaluation', 'Demo deployment'], s: 'upcoming' },
]

const OBJECTIVES = [
  { icon: '🔐', title: 'Semi-Fragile Watermarking', desc: 'Survive normal compression and processing, but break under malicious manipulation.' },
  { icon: '📍', title: 'Spatial Localization',      desc: 'Identify exactly which pixel regions in a frame were tampered with.' },
  { icon: '⏱️', title: 'Temporal Verification',     desc: 'For video, detect which frames were altered and trace edits across the timeline.' },
  { icon: '🌐', title: 'REST API Interface',         desc: 'Clean FastAPI backend with JSON responses for easy third-party integration.' },
]

export default function About() {
  return (
    <div className="max-w-[1100px] mx-auto px-7 pb-24">

      {/* Page header */}
      <div className="text-center pt-16 pb-14">
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-normal mb-4">About This Project</h1>
        <p className="text-secondary text-[1.05rem] max-w-lg mx-auto">
          Multimedia tamper detection using semi-fragile watermarking and spatio-temporal localization.
        </p>
      </div>

      {/* ── Background ── */}
      <section className="mb-20">
        <div className="bg-card border border-border rounded-2xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">Background</p>
            <h2 className="font-display text-[1.75rem] font-normal mb-5 leading-tight">Why tamper detection matters</h2>
            <p className="text-secondary text-[14px] leading-relaxed mb-4">
              With the rapid advancement of AI technologies such as deepfakes, digital images and videos
              can be manipulated with unprecedented ease. Fake content spreads misinformation, undermines
              trust, and can have serious legal and medical consequences.
            </p>
            <p className="text-secondary text-[14px] leading-relaxed">
              Existing passive detection methods have limited accuracy and cannot pinpoint exactly which
              regions were altered. Our approach uses a <strong className="text-primary font-semibold">proactive</strong> strategy —
              embedding an invisible semi-fragile watermark <em>before</em> content is distributed,
              allowing precise tamper detection and localization later.
            </p>
          </div>

          {/* Mini pipeline diagram */}
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">System Pipeline</p>
            {[
              { label: 'Original Media',     color: 'bg-subtle border-border-strong text-primary' },
              { label: 'HIDDeN Encoder',     color: 'bg-accent-light border-accent text-accent' },
              { label: 'Watermarked Media',  color: 'bg-subtle border-border-strong text-primary' },
              { label: 'CNN Decoder',        color: 'bg-accent-light border-accent text-accent' },
              { label: 'Tamper Result',      color: 'bg-success/10 border-green-400 text-success' },
            ].map((node, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-full px-4 py-2.5 border rounded-xl text-center text-[13px] font-semibold ${node.color}`}>
                  {node.label}
                </div>
                {i < 4 && <span className="text-muted text-lg leading-none">↓</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objectives ── */}
      <section className="mb-20">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">Objectives</p>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal mb-10 leading-tight">What we set out to build</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OBJECTIVES.map((o, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-md transition-all">
              <span className="text-3xl block mb-4">{o.icon}</span>
              <h3 className="font-semibold text-[14px] mb-2">{o.title}</h3>
              <p className="text-secondary text-[12.5px] leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="mb-20">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">Methodology</p>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal mb-10 leading-tight">Technical approach</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Phase 1 — Watermark Embedding',
              body: 'The original media passes through a HIDDeN encoder with Attention Bottleneck. The encoder generates an imperceptible perturbation embedding a binary watermark string. A semi-fragile noise layer simulates real-world degradation while remaining sensitive to adversarial tampering.',
            },
            {
              title: 'Phase 2 — Integrity Verification',
              body: 'A CNN-based decoder extracts watermark bits from the media. The recovered bits are compared with the original watermark via an Integrity Verification Module. High BER (bit error rate) in a region signals potential tampering.',
            },
            {
              title: 'Phase 3 — Tamper Localization',
              body: 'When tampering is detected, EfficientNet-B4 combined with Vision Transformer (ViT) performs fine-grained spatial localization. Modified regions are highlighted and frame-level temporal analysis is generated for video content.',
            },
          ].map((m, i) => (
            <div key={i} className="bg-card border border-l-[3px] border-accent rounded-2xl p-7">
              <h3 className="font-semibold text-[14px] mb-3">{m.title}</h3>
              <p className="text-secondary text-[13px] leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="mb-20">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">Tools & Technologies</p>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal mb-10 leading-tight">Built with</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-semibold text-[13px] mb-3 text-primary">{t.cat}</h4>
              <div className="flex flex-wrap gap-1.5">
                {t.items.map((item, j) => (
                  <span key={j} className="px-2.5 py-1 bg-accent-light text-accent text-[11px] font-semibold rounded-full">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="mb-20">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">Timeline</p>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal mb-10 leading-tight">Project roadmap</h2>
        <div className="flex flex-col gap-0">
          {PHASES.map((phase, i) => (
            <div key={i} className="grid grid-cols-[32px_1fr] gap-5 items-start">
              {/* Indicator */}
              <div className="flex flex-col items-center pt-6">
                <div className={`w-3.5 h-3.5 rounded-full border-2 z-10 flex-shrink-0
                  ${phase.s === 'done'   ? 'bg-success border-success' :
                    phase.s === 'active' ? 'bg-accent border-accent shadow-[0_0_0_4px_#dbeafe]' :
                    'bg-card border-border-strong'}`} />
                {i < PHASES.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-[32px] mt-1 ${phase.s === 'done' ? 'bg-success' : 'bg-border'}`} />
                )}
              </div>

              {/* Content */}
              <div className={`bg-card border border-border rounded-2xl p-5 mb-4 ${phase.s === 'upcoming' ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-muted font-medium">{phase.period}</span>
                  <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full
                    ${phase.s === 'done'   ? 'bg-success/10 text-success' :
                      phase.s === 'active' ? 'bg-accent-light text-accent' :
                      'bg-warning/10 text-warning'}`}>
                    {phase.pct}
                  </span>
                </div>
                <h4 className="font-semibold text-[15px] mb-2">{phase.title}</h4>
                <ul className="flex flex-col gap-1">
                  {phase.tasks.map((t, j) => (
                    <li key={j} className="text-[13px] text-secondary pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-muted">{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section>
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-3">Team</p>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal mb-10 leading-tight">Meet the developers</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM.map((m, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center font-display text-[1.3rem] mx-auto mb-4">
                {m.initial}
              </div>
              <div className="font-semibold text-[16px] mb-1">{m.name}</div>
              <div className="font-mono text-[11px] text-muted mb-2">{m.id}</div>
              <div className="text-[12px] text-secondary leading-snug">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}