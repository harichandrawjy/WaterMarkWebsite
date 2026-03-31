import './About.css'

const TEAM = [
  { name: '彭定康', id: 'D1229568', role: 'Encoder / Decoder / Frontend' },
  { name: '張志成', id: 'D1231400', role: 'Tamper Detection / Backend' },
  { name: '吳尚恩', id: 'D1249268', role: 'Tamper Localization / Frontend' },
  { name: '鄭建良', id: 'D1231150', role: 'Encoder / Decoder / Backend' },
]

const TECH_STACK = [
  { category: 'Watermarking', items: ['HIDDeN', 'Attention Bottleneck', 'OpenCV', 'NumPy', 'FFmpeg'] },
  { category: 'ML / Training', items: ['PyTorch', 'Torchvision', 'EfficientNet-B4', 'ViT', 'Albumentations'] },
  { category: 'Backend / API', items: ['FastAPI', 'Python', 'MySQL', 'REST API', 'JSON'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'CSS Modules'] },
]

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">About This Project</h1>
          <p className="page-subtitle">
            Multimedia tamper detection using semi-fragile watermarking and spatio-temporal localization.
          </p>
        </div>

        {/* Overview */}
        <section className="about-section">
          <div className="about-overview card">
            <div className="about-overview__text">
              <div className="section-label">Background</div>
              <h2 className="about-overview__title">Why tamper detection matters</h2>
              <p>
                With the rapid advancement of AI technologies such as deepfakes, digital images
                and videos can be manipulated with unprecedented ease. Fake content spreads
                misinformation, undermines trust, and can have serious legal and medical consequences.
              </p>
              <p>
                Existing passive detection methods have limited accuracy and cannot pinpoint exactly
                which regions were altered. Our approach uses a <strong>proactive</strong> strategy —
                embedding an invisible semi-fragile watermark <em>before</em> content is distributed,
                allowing precise tamper detection and localization later.
              </p>
            </div>
            <div className="about-overview__diagram">
              <div className="pipeline-diagram">
                {[
                  { label: 'Original\nMedia', color: 'var(--bg-subtle)', border: 'var(--border-strong)' },
                  { label: 'HIDDeN\nEncoder', color: 'var(--accent-light)', border: 'var(--accent)' },
                  { label: 'Watermarked\nMedia', color: 'var(--bg-subtle)', border: 'var(--border-strong)' },
                  { label: 'CNN\nDecoder', color: 'var(--accent-light)', border: 'var(--accent)' },
                  { label: 'Tamper\nResult', color: 'var(--success-light)', border: 'var(--success)' },
                ].map((node, i) => (
                  <div key={i} className="pd-step-wrap">
                    <div className="pd-node" style={{ background: node.color, borderColor: node.border }}>
                      {node.label.split('\n').map((l, j) => <span key={j}>{l}</span>)}
                    </div>
                    {i < 4 && <div className="pd-arrow">→</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="about-section">
          <div className="section-label">Objectives</div>
          <h2 className="section-title">What we set out to build</h2>
          <div className="objectives-grid">
            {[
              { icon: '🔐', title: 'Semi-Fragile Watermarking', desc: 'Survive normal compression and processing, but break under malicious manipulation.' },
              { icon: '📍', title: 'Spatial Localization', desc: 'Identify exactly which pixel regions in a frame were tampered with.' },
              { icon: '⏱️', title: 'Temporal Verification', desc: 'For video, detect which frames were altered and when in the timeline.' },
              { icon: '🌐', title: 'REST API Interface', desc: 'Clean FastAPI backend with JSON responses for easy integration into third-party systems.' },
            ].map((o, i) => (
              <div key={i} className="objective-card card">
                <span className="objective-card__emoji">{o.icon}</span>
                <h3 className="objective-card__title">{o.title}</h3>
                <p className="objective-card__desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="about-section">
          <div className="section-label">Methodology</div>
          <h2 className="section-title">Technical approach</h2>
          <div className="methodology-cards">
            <div className="card method-card">
              <h3 className="method-card__title">Phase 1 — Watermark Embedding</h3>
              <p className="method-card__desc">
                The original image or video frame is passed through a <strong>HIDDeN encoder with Attention Bottleneck</strong>.
                The encoder generates an imperceptible perturbation that embeds a binary watermark string.
                A semi-fragile noise layer simulates real-world degradation (compression, resizing) while
                remaining sensitive to adversarial tampering.
              </p>
            </div>
            <div className="card method-card">
              <h3 className="method-card__title">Phase 2 — Integrity Verification</h3>
              <p className="method-card__desc">
                A CNN-based decoder extracts the watermark bits from the media. The recovered bits are
                compared with the original watermark via an <strong>Integrity Verification Module</strong>.
                High BER (bit error rate) in a region signals potential tampering.
              </p>
            </div>
            <div className="card method-card">
              <h3 className="method-card__title">Phase 3 — Tamper Localization</h3>
              <p className="method-card__desc">
                When tampering is detected, <strong>EfficientNet-B4 combined with Vision Transformer (ViT)</strong>
                performs fine-grained spatial localization. The system highlights modified regions
                (e.g., face swaps, inpainting) and generates frame-level temporal analysis for video content.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="about-section">
          <div className="section-label">Tools & Technologies</div>
          <h2 className="section-title">Built with</h2>
          <div className="tech-grid">
            {TECH_STACK.map((t, i) => (
              <div key={i} className="tech-category card">
                <h4 className="tech-category__title">{t.category}</h4>
                <div className="tech-tags">
                  {t.items.map((item, j) => (
                    <span key={j} className="tech-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="about-section">
          <div className="section-label">Timeline</div>
          <h2 className="section-title">Project roadmap</h2>
          <div className="timeline">
            {[
              { period: 'Mar – Apr', pct: '25%', title: 'Foundation', tasks: ['Dataset collection', 'Encoder + Decoder prototype'], status: 'done' },
              { period: 'Apr – May', pct: '50%', title: 'Detection', tasks: ['Tamper Detection module', 'Deepfake Detection integration'], status: 'active' },
              { period: 'Jun – Jul', pct: '75%', title: 'Integration', tasks: ['Full system integration', 'Website + API development'], status: 'upcoming' },
              { period: 'Jul – Sep', pct: '100%', title: 'Completion', tasks: ['Result packaging', 'Final evaluation', 'Demo deployment'], status: 'upcoming' },
            ].map((phase, i) => (
              <div key={i} className={`timeline-phase ${phase.status}`}>
                <div className="timeline-phase__indicator">
                  <div className="timeline-phase__dot"></div>
                  {i < 3 && <div className="timeline-phase__line"></div>}
                </div>
                <div className="timeline-phase__content card">
                  <div className="timeline-phase__header">
                    <span className="timeline-phase__period">{phase.period}</span>
                    <span className={`badge ${phase.status === 'done' ? 'badge-success' : phase.status === 'active' ? 'badge-accent' : 'badge-warning'}`}>
                      {phase.pct}
                    </span>
                  </div>
                  <h4 className="timeline-phase__title">{phase.title}</h4>
                  <ul className="timeline-phase__tasks">
                    {phase.tasks.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="about-section">
          <div className="section-label">Team</div>
          <h2 className="section-title">Meet the developers</h2>
          <div className="team-grid">
            {TEAM.map((member, i) => (
              <div key={i} className="team-card card">
                <div className="team-card__avatar">
                  {member.name.charAt(0)}
                </div>
                <div className="team-card__name">{member.name}</div>
                <div className="team-card__id">{member.id}</div>
                <div className="team-card__role">{member.role}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}