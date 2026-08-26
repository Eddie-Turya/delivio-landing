import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  Smartphone, Link2, Zap, LayoutDashboard, Code2, ShieldCheck,
  ArrowRight, Check, ChevronRight, Menu, X, Globe, Bell,
  CheckCircle2, ExternalLink
} from 'lucide-react'
import './App.css'

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <nav className={`nav ${scrolled || !isHome ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <div className="nav__logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="1.8"/>
              <path d="M10 6.5v4l2.5 2.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span>Delivio <strong>Pay</strong></span>
        </Link>

        <div className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {isHome && ['Features', 'How it works', 'Developers', 'Pricing'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <Link to="/docs" onClick={() => setOpen(false)}>Docs</Link>
          <Link to="/sandbox" onClick={() => setOpen(false)}>Sandbox</Link>
          <a href="/portal/" className="btn btn--outline btn--sm">Merchant login</a>
          <a href="/portal/" className="btn btn--primary btn--sm">Get started</a>
        </div>

        <button className="nav__burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-grid" />
      <div className="container hero__layout">
        <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="badge badge--green">
            <span className="badge__dot" />
            Live in Tanzania
          </span>
        </div>
        <h1 className="hero__title">
          Accept mobile money<br />
          <span className="hero__title-accent">in seconds.</span>
        </h1>
        <p className="hero__sub">
          Delivio Pay lets businesses collect payments via USSD push to any Tanzanian
          mobile wallet — no app, no card, no friction.
        </p>
        <div className="hero__cta">
          <a href="/portal/" className="btn btn--primary btn--lg">
            Start accepting payments <ArrowRight size={16} />
          </a>
          <a href="#how-it-works" className="btn btn--ghost btn--lg">See how it works</a>
        </div>

        <div className="hero__networks">
          <span className="hero__networks-label">Supported networks</span>
          <div className="hero__network-list">
            {[
              { name: 'M-Pesa',      logo: new URL('./assets/mpesa.png', import.meta.url).href },
              { name: 'Airtel Money', logo: new URL('./assets/airtel.png', import.meta.url).href },
              { name: 'YAS',         logo: new URL('./assets/yas.png', import.meta.url).href },
              { name: 'HaloPesa',    logo: new URL('./assets/halopesa.png', import.meta.url).href, large: true },
            ].map((n: any) => (
              <div key={n.name} className="network-chip" title={n.name}>
                <img src={n.logo} alt={n.name} className={`network-chip__logo${n.large ? ' network-chip__logo--lg' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        </div>
        <div className="hero__visual">
          <CodeCard />
        </div>
      </div>
    </section>
  )
}

// Syntax-highlighted token types
type Token = { text: string; cls: string }

const LINES: Token[][] = [
  [{ text: 'const', cls: 'kw' }, { text: ' res ', cls: 'plain' }, { text: '=', cls: 'op' }, { text: ' await ', cls: 'kw' }, { text: 'fetch', cls: 'fn' }, { text: '(', cls: 'plain' }],
  [{ text: "  'https://pay.deliviosend.com/v1/payments'", cls: 'str' }, { text: ',', cls: 'plain' }],
  [{ text: '  {', cls: 'plain' }],
  [{ text: '    method', cls: 'key' }, { text: ': ', cls: 'plain' }, { text: "'POST'", cls: 'str' }, { text: ',', cls: 'plain' }],
  [{ text: '    headers', cls: 'key' }, { text: ': {', cls: 'plain' }],
  [{ text: "      'Authorization'", cls: 'key' }, { text: ': ', cls: 'plain' }, { text: '`Bearer ', cls: 'str' }, { text: '${', cls: 'op' }, { text: 'API_KEY', cls: 'plain' }, { text: '}', cls: 'op' }, { text: '`', cls: 'str' }, { text: ',', cls: 'plain' }],
  [{ text: '    },', cls: 'plain' }],
  [{ text: '    body', cls: 'key' }, { text: ': ', cls: 'plain' }, { text: 'JSON', cls: 'fn' }, { text: '.', cls: 'plain' }, { text: 'stringify', cls: 'fn' }, { text: '({', cls: 'plain' }],
  [{ text: '      amount_minor', cls: 'key' }, { text: ': ', cls: 'plain' }, { text: '25000', cls: 'num' }, { text: ',', cls: 'plain' }],
  [{ text: '      currency', cls: 'key' }, { text: ': ', cls: 'plain' }, { text: "'TZS'", cls: 'str' }, { text: ',', cls: 'plain' }],
  [{ text: '      payer', cls: 'key' }, { text: ': {', cls: 'plain' }],
  [{ text: '        msisdn', cls: 'key' }, { text: ': ', cls: 'plain' }, { text: "'255712345678'", cls: 'str' }, { text: ',', cls: 'plain' }],
  [{ text: '      },', cls: 'plain' }],
  [{ text: '    }),', cls: 'plain' }],
  [{ text: '  }', cls: 'plain' }],
  [{ text: ')', cls: 'plain' }],
  [{ text: '' , cls: 'plain' }],
  [{ text: 'const', cls: 'kw' }, { text: ' payment ', cls: 'plain' }, { text: '=', cls: 'op' }, { text: ' await ', cls: 'kw' }, { text: 'res', cls: 'plain' }, { text: '.', cls: 'plain' }, { text: 'json', cls: 'fn' }, { text: '()', cls: 'plain' }],
  [{ text: '// { id: ', cls: 'comment' }, { text: "'pay_...'", cls: 'comment' }, { text: ', status: ', cls: 'comment' }, { text: "'PROCESSING'", cls: 'comment' }, { text: ' }', cls: 'comment' }],
  [{ text: '' , cls: 'plain' }],
  [{ text: 'app', cls: 'plain' }, { text: '.', cls: 'plain' }, { text: 'post', cls: 'fn' }, { text: '(', cls: 'plain' }, { text: "'/webhooks'", cls: 'str' }, { text: ', (', cls: 'plain' }, { text: 'req', cls: 'plain' }, { text: ', ', cls: 'plain' }, { text: 'res', cls: 'plain' }, { text: ') => {', cls: 'plain' }],
  [{ text: '  const', cls: 'kw' }, { text: ' { status } ', cls: 'plain' }, { text: '=', cls: 'op' }, { text: ' req', cls: 'plain' }, { text: '.body', cls: 'key' }],
  [{ text: '  if', cls: 'kw' }, { text: ' (status ', cls: 'plain' }, { text: '===', cls: 'op' }, { text: " 'COMPLETED'", cls: 'str' }, { text: ')', cls: 'plain' }],
  [{ text: '    fulfillOrder', cls: 'fn' }, { text: '()', cls: 'plain' }],
  [{ text: '  res', cls: 'plain' }, { text: '.', cls: 'plain' }, { text: 'sendStatus', cls: 'fn' }, { text: '(', cls: 'plain' }, { text: '200', cls: 'num' }, { text: ')', cls: 'plain' }],
  [{ text: '})', cls: 'plain' }],
]

// Flatten to a sequence of { char, cls } for character-level typing
type Char = { ch: string; cls: string }

function buildCharSeq(): Char[] {
  const seq: Char[] = []
  for (const line of LINES) {
    for (const tok of line) {
      for (const ch of tok.text) {
        seq.push({ ch, cls: tok.cls })
      }
    }
    seq.push({ ch: '\n', cls: 'plain' })
  }
  return seq
}

const CHAR_SEQ = buildCharSeq()
const CHAR_SPEED = 26   // ms per character while typing
const PAUSE_FULL = 2200 // ms pause when fully typed
const MAX_LINES = 14    // visible lines in the fixed window

function CodeCard() {
  const [displayed, setDisplayed] = useState<Char[]>([])
  const [phase, setPhase] = useState<'typing' | 'pausing'>('typing')
  const idxRef = useRef(0)

  // Typing: interval fires every CHAR_SPEED ms — only depends on phase
  useEffect(() => {
    if (phase !== 'typing') return
    const id = setInterval(() => {
      if (idxRef.current >= CHAR_SEQ.length) {
        clearInterval(id)
        setPhase('pausing')
        return
      }
      const ch = CHAR_SEQ[idxRef.current++]
      setDisplayed(prev => [...prev, ch])
    }, CHAR_SPEED)
    return () => clearInterval(id)
  }, [phase])

  // Pausing: single timeout then reset
  useEffect(() => {
    if (phase !== 'pausing') return
    const t = setTimeout(() => {
      idxRef.current = 0
      setDisplayed([])
      setPhase('typing')
    }, PAUSE_FULL)
    return () => clearTimeout(t)
  }, [phase])

  // Split chars into lines
  const allLines: Char[][] = [[]]
  for (const c of displayed) {
    if (c.ch === '\n') allLines.push([])
    else allLines[allLines.length - 1].push(c)
  }

  // Show only the last MAX_LINES lines (scroll-up effect)
  const startLine = Math.max(0, allLines.length - MAX_LINES)
  const lines = allLines.slice(startLine)
  const lineNumOffset = startLine

  return (
    <div className="code-card">
      <div className="code-card__header">
        <div className="code-card__dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <span className="code-card__filename">payment.js</span>
        <span className="code-card__lang">JavaScript</span>
      </div>
      <div className="code-card__body">
        <div className="code-card__line-nums">
          {lines.map((_, i) => (
            <span key={i}>{lineNumOffset + i + 1}</span>
          ))}
        </div>
        <pre className="code-card__pre">
          {lines.map((line, li) => (
            <div key={li} className="code-card__line">
              {line.map((c, ci) => (
                <span key={ci} className={`tok tok--${c.cls}`}>{c.ch}</span>
              ))}
              {li === lines.length - 1 && <span className="code-card__cursor" />}
            </div>
          ))}
        </pre>
      </div>
      <div className="code-card__glow" />
    </div>
  )
}

// ─── Features ────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Smartphone,
    title: 'USSD Push',
    desc: 'Trigger a payment prompt directly to any Tanzanian mobile number. Customer approves with their PIN — no app, no browser.',
    color: 'emerald',
  },
  {
    icon: Link2,
    title: 'Payment Links',
    desc: 'Generate a shareable link with a fixed amount. Share via WhatsApp, SMS, or email — customer enters their own phone.',
    color: 'blue',
  },
  {
    icon: Zap,
    title: 'Instant Webhooks',
    desc: 'Get notified the moment a payment completes or fails. Retry logic and signed payloads included.',
    color: 'amber',
  },
  {
    icon: LayoutDashboard,
    title: 'Merchant Portal',
    desc: 'Track transactions, view volume, manage API keys, and send payment requests — all from one clean dashboard.',
    color: 'violet',
  },
  {
    icon: Code2,
    title: 'Simple REST API',
    desc: 'One endpoint to create a payment. Bearer token auth, JSON in, JSON out. SDKs and postman collection available.',
    color: 'rose',
  },
  {
    icon: ShieldCheck,
    title: 'Sandbox mode',
    desc: 'Full sandbox environment for testing — payments complete instantly, webhooks fire, no real money moves.',
    color: 'teal',
  },
]

function Features() {
  return (
    <section id="features" className="section section--alt">
      <div className="container">
        <div className="section__head anim-up">
          <p className="section__eyebrow">Features</p>
          <h2 className="section__title">Everything you need to get paid</h2>
          <p className="section__sub">Built for Tanzania from the ground up — no workarounds, no middlemen.</p>
        </div>
        <div className="features-grid anim-stagger">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div className={`feature-card__icon feature-card__icon--${f.color}`}>
                <f.icon size={20} />
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01',
    icon: Code2,
    title: 'Create a payment',
    desc: 'Call the API with the customer\'s phone number and amount. Or send a USSD push directly from the merchant portal.',
    detail: 'Takes under 100ms',
  },
  {
    n: '02',
    icon: Smartphone,
    title: 'Customer approves',
    desc: 'A USSD prompt appears on their phone. They enter their mobile money PIN to confirm. No internet required.',
    detail: 'Works on any phone',
  },
  {
    n: '03',
    icon: Bell,
    title: 'You get notified',
    desc: 'Delivio Pay sends a signed webhook to your server the moment the payment is confirmed. Your balance updates instantly.',
    detail: 'Real-time notification',
  },
  {
    n: '04',
    icon: Globe,
    title: 'Funds settled',
    desc: 'Collected funds are settled to your merchant wallet. View your balance and history in the merchant portal.',
    detail: 'Same-day settlement',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div className="section__head anim-up">
          <p className="section__eyebrow">How it works</p>
          <h2 className="section__title">Payment in four steps</h2>
          <p className="section__sub">From API call to confirmed payment — the whole flow takes seconds.</p>
        </div>
        <div className="steps anim-stagger">
          {STEPS.map((s) => (
            <div key={s.n} className="step">
              <div className="step__icon">
                <s.icon size={24} />
              </div>
              <div className="step__num">{s.n}</div>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__desc">{s.desc}</p>
              <span className="step__detail">{s.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Developers ──────────────────────────────────────────────────────────────

const CODE = `// Create a payment — one API call
const res = await fetch('https://pay.deliviosend.com/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer dpay_live_...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount_minor: 25000,   // TZS 25,000
    currency: 'TZS',
    merchant_reference: 'order_2847',
    payer: {
      msisdn: '255712345678',
      name: 'Jane Doe',
    },
  }),
})

const payment = await res.json()
// { id: 'pay_...', status: 'PROCESSING', ... }

// Listen for completion via webhook
app.post('/webhooks/delivio', (req, res) => {
  const { status, payment_id } = req.body
  if (status === 'COMPLETED') fulfillOrder(payment_id)
  res.sendStatus(200)
})`

function Developers() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="developers" className="section section--dark">
      <div className="container">
        <div className="dev__inner">
          <div className="dev__copy anim-left">
            <p className="section__eyebrow section__eyebrow--light">Developers</p>
            <h2 className="section__title section__title--light">Built for developers</h2>
            <p className="section__sub section__sub--light">
              REST API with predictable responses, idempotency keys, and signed webhooks.
              Get a test payment running in minutes.
            </p>
            <ul className="dev__list">
              {[
                'Bearer token auth — no OAuth dance',
                'Idempotency keys prevent duplicate charges',
                'Signed webhook payloads (HMAC-SHA256)',
                'Full sandbox with instant completions',
                'Postman collection & code examples',
              ].map(item => (
                <li key={item} className="dev__list-item">
                  <Check size={14} className="dev__check" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="/portal/" className="btn btn--primary btn--lg" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              Get your API key <ChevronRight size={16} />
            </a>
          </div>

          <div className="code-block anim-right">
            <div className="code-block__header">
              <span className="code-block__title">Create a payment</span>
              <button className="code-block__copy" onClick={copy}>
                {copied ? <><Check size={12} /> Copied</> : 'Copy'}
              </button>
            </div>
            <pre className="code-block__pre"><code>{CODE}</code></pre>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: 'Starter',
    desc: 'For businesses just getting started',
    features: [
      'USSD push & payment links',
      'Webhook notifications',
      'Merchant portal access',
      'Sandbox environment',
    ],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Growth',
    desc: 'For growing businesses with higher volume',
    features: [
      'Everything in Starter',
      'Priority webhook delivery',
      'Custom merchant reference',
      'Email support',
    ],
    cta: 'Get started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    desc: 'For high-volume businesses and platforms',
    features: [
      'Custom transaction fees',
      'Dedicated account manager',
      'SLA guarantees',
      'Custom integration support',
      'Multi-merchant support',
    ],
    cta: 'Contact us',
    highlight: false,
  },
]

function Pricing() {
  return (
    <section id="pricing" className="section section--alt">
      <div className="container">
        <div className="section__head anim-up">
          <p className="section__eyebrow">Pricing</p>
          <h2 className="section__title">Simple, transparent pricing</h2>
          <p className="section__sub">Plans for every stage of growth. Pricing details coming soon.</p>
        </div>
        <div className="pricing-grid anim-stagger">
          {PLANS.map(plan => (
            <div key={plan.name} className={`pricing-card ${plan.highlight ? 'pricing-card--highlight' : ''}`}>
              {plan.highlight && <div className="pricing-card__popular">Most popular</div>}
              <div className="pricing-card__top">
                <p className="pricing-card__name">{plan.name}</p>
                <p className="pricing-card__desc">{plan.desc}</p>
              </div>
              <ul className="pricing-card__features">
                {plan.features.map(f => (
                  <li key={f}>
                    <Check size={14} className="pricing-card__check" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/portal/"
                className={`btn btn--lg ${plan.highlight ? 'btn--primary' : 'btn--outline-dark'} pricing-card__cta`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-inner anim-up">
          <div className="cta-glow" />
          <h2 className="cta-title">Ready to accept mobile money?</h2>
          <p className="cta-sub">
            Join businesses across Tanzania collecting payments with Delivio Pay.
            Set up in minutes — no paperwork, no waiting.
          </p>
          <div className="cta-actions">
            <a href="/portal/" className="btn btn--primary btn--lg">
              Create your account <ArrowRight size={16} />
            </a>
            <a href="mailto:pay@deliviosend.com" className="btn btn--ghost btn--lg">Talk to us</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner anim-fade">
          <div className="footer__brand">
            <div className="nav__logo" style={{ marginBottom: '0.75rem' }}>
              <div className="nav__logo-mark">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="1.8"/>
                  <path d="M10 6.5v4l2.5 2.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ color: '#fff' }}>Delivio <strong>Pay</strong></span>
            </div>
            <p className="footer__tagline">Mobile money payments for Tanzania.</p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <p className="footer__col-title">Product</p>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#pricing">Pricing</a>
              <a href="/portal/">Merchant Portal</a>
            </div>
            <div className="footer__col">
              <p className="footer__col-title">Developers</p>
              <a href="/portal/">API Keys</a>
              <a href="#developers">API Reference</a>
              <a href="/portal/">Webhooks</a>
              <a href="/portal/">Sandbox</a>
            </div>
            <div className="footer__col">
              <p className="footer__col-title">Company</p>
              <a href="https://deliviosend.com">Deliviosend</a>
              <a href="mailto:pay@deliviosend.com">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Deliviosend. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Docs Page ───────────────────────────────────────────────────────────────

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/payments',
    desc: 'Create a new USSD push payment. Returns a payment object with status PROCESSING.',
    body: `{
  "amount_minor": 25000,
  "currency": "TZS",
  "payer": { "msisdn": "255712345678" },
  "reference": "order_001",
  "callback_url": "https://yoursite.com/webhooks"
}`,
    response: `{
  "id": "pay_abc123",
  "status": "PROCESSING",
  "amount_minor": 25000,
  "currency": "TZS"
}`,
  },
  {
    method: 'GET',
    path: '/v1/payments/:id',
    desc: 'Retrieve a payment by ID. Poll this to check status.',
    body: null,
    response: `{
  "id": "pay_abc123",
  "status": "COMPLETED",
  "amount_minor": 25000,
  "currency": "TZS",
  "completed_at": "2024-01-15T10:32:00Z"
}`,
  },
  {
    method: 'POST',
    path: '/v1/payment-links',
    desc: 'Create a shareable payment link. Share via SMS or WhatsApp.',
    body: `{
  "amount_minor": 50000,
  "currency": "TZS",
  "label": "Invoice #1042",
  "expires_in": 3600
}`,
    response: `{
  "id": "lnk_xyz789",
  "url": "https://pay.deliviosend.com/pay/lnk_xyz789",
  "expires_at": "2024-01-15T11:00:00Z"
}`,
  },
]

const METHOD_COLOR: Record<string, string> = {
  GET: '#10B981',
  POST: '#3B82F6',
  PUT: '#F59E0B',
  DELETE: '#EF4444',
}

function DocsPage() {
  const [copied, setCopied] = useState<string | null>(null)

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div className="docs-page">
      <div className="docs-hero">
        <div className="container">
          <div className="docs-hero__inner">
            <span className="badge badge--green"><span className="badge__dot" />API Reference</span>
            <h1 className="docs-hero__title">Documentation</h1>
            <p className="docs-hero__sub">
              Everything you need to integrate Delivio Pay into your application.
              Bearer token auth, JSON in, JSON out.
            </p>
          </div>
        </div>
      </div>

      <div className="container docs-body">
        {/* Auth */}
        <section className="docs-section">
          <h2 className="docs-section__title">Authentication</h2>
          <p className="docs-section__lead">
            All requests require a Bearer token in the <code className="inline-code">Authorization</code> header.
            Retrieve your key from the <a href="/portal/" className="docs-link">merchant portal</a>.
          </p>
          <div className="docs-codeblock">
            <div className="docs-codeblock__header">
              <span>Request header</span>
              <button className="code-block__copy" onClick={() => copy('Authorization: Bearer YOUR_API_KEY', 'auth')}>
                {copied === 'auth' ? <CheckCircle2 size={12} /> : null}
                {copied === 'auth' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="docs-codeblock__pre"><code>Authorization: Bearer YOUR_API_KEY</code></pre>
          </div>
        </section>

        {/* Base URL */}
        <section className="docs-section">
          <h2 className="docs-section__title">Base URL</h2>
          <div className="docs-codeblock">
            <div className="docs-codeblock__header"><span>Endpoint</span></div>
            <pre className="docs-codeblock__pre"><code>https://pay.deliviosend.com/v1</code></pre>
          </div>
          <p className="docs-section__note">
            Use the <strong>Sandbox</strong> environment for testing — see the <Link to="/sandbox" className="docs-link">Sandbox page</Link> for credentials.
          </p>
        </section>

        {/* Endpoints */}
        <section className="docs-section">
          <h2 className="docs-section__title">Endpoints</h2>
          <div className="docs-endpoints">
            {ENDPOINTS.map(ep => (
              <div key={ep.path} className="docs-endpoint">
                <div className="docs-endpoint__head">
                  <span className="docs-method" style={{ background: METHOD_COLOR[ep.method] + '20', color: METHOD_COLOR[ep.method] }}>
                    {ep.method}
                  </span>
                  <code className="docs-path">{ep.path}</code>
                </div>
                <p className="docs-endpoint__desc">{ep.desc}</p>
                <div className="docs-endpoint__cols">
                  {ep.body && (
                    <div className="docs-codeblock">
                      <div className="docs-codeblock__header">
                        <span>Request body</span>
                        <button className="code-block__copy" onClick={() => copy(ep.body!, ep.path + 'req')}>
                          {copied === ep.path + 'req' ? <CheckCircle2 size={12} /> : null}
                          {copied === ep.path + 'req' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="docs-codeblock__pre"><code>{ep.body}</code></pre>
                    </div>
                  )}
                  <div className="docs-codeblock">
                    <div className="docs-codeblock__header"><span>Response</span></div>
                    <pre className="docs-codeblock__pre"><code>{ep.response}</code></pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Webhooks */}
        <section className="docs-section">
          <h2 className="docs-section__title">Webhooks</h2>
          <p className="docs-section__lead">
            Delivio Pay sends a <code className="inline-code">POST</code> to your <code className="inline-code">callback_url</code> when a payment
            status changes. Respond with HTTP 200 to acknowledge.
          </p>
          <div className="docs-codeblock">
            <div className="docs-codeblock__header"><span>Webhook payload</span></div>
            <pre className="docs-codeblock__pre"><code>{`{
  "event": "payment.completed",
  "payment": {
    "id": "pay_abc123",
    "status": "COMPLETED",
    "amount_minor": 25000,
    "currency": "TZS",
    "reference": "order_001"
  }
}`}</code></pre>
          </div>
        </section>

        {/* Status values */}
        <section className="docs-section">
          <h2 className="docs-section__title">Payment statuses</h2>
          <div className="docs-statuses">
            {[
              { s: 'PROCESSING', c: '#3B82F6', d: 'USSD push sent, awaiting customer approval.' },
              { s: 'COMPLETED',  c: '#10B981', d: 'Customer approved and funds collected.' },
              { s: 'FAILED',     c: '#EF4444', d: 'Customer declined, timed out, or insufficient funds.' },
              { s: 'CANCELLED',  c: '#94A3B8', d: 'Payment was cancelled programmatically.' },
            ].map(({ s, c, d }) => (
              <div key={s} className="docs-status">
                <span className="docs-status__badge" style={{ background: c + '18', color: c, border: `1px solid ${c}30` }}>{s}</span>
                <span className="docs-status__desc">{d}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// ─── Sandbox Page ─────────────────────────────────────────────────────────────

function SandboxPage() {
  const [copied, setCopied] = useState<string | null>(null)
  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div className="docs-page">
      <div className="docs-hero docs-hero--sandbox">
        <div className="container">
          <div className="docs-hero__inner">
            <span className="badge badge--green"><span className="badge__dot" />Test environment</span>
            <h1 className="docs-hero__title">Sandbox</h1>
            <p className="docs-hero__sub">
              Test your integration without moving real money.
              Payments complete instantly, webhooks fire, no USSD push goes to real phones.
            </p>
          </div>
        </div>
      </div>

      <div className="container docs-body">
        <section className="docs-section">
          <h2 className="docs-section__title">Get sandbox credentials</h2>
          <p className="docs-section__lead">
            Create a free merchant account and switch to <strong>Sandbox mode</strong> in the portal to get your sandbox API key.
          </p>
          <a href="/portal/" className="btn btn--primary">Open merchant portal <ArrowRight size={15} /></a>
        </section>

        <section className="docs-section">
          <h2 className="docs-section__title">Sandbox base URL</h2>
          <div className="docs-codeblock">
            <div className="docs-codeblock__header">
              <span>Endpoint</span>
              <button className="code-block__copy" onClick={() => copy('https://pay.deliviosend.com/v1', 'url')}>
                {copied === 'url' ? <CheckCircle2 size={12} /> : null}
                {copied === 'url' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="docs-codeblock__pre"><code>https://pay.deliviosend.com/v1</code></pre>
          </div>
          <p className="docs-section__note">
            The sandbox uses the same base URL — your sandbox API key determines which environment your requests hit.
          </p>
        </section>

        <section className="docs-section">
          <h2 className="docs-section__title">Test phone numbers</h2>
          <p className="docs-section__lead">
            Use these MSISDN values in sandbox to trigger specific outcomes:
          </p>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>MSISDN</th>
                  <th>Network</th>
                  <th>Outcome</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { msisdn: '255712000001', network: 'Airtel', outcome: 'COMPLETED immediately' },
                  { msisdn: '255712000002', network: 'Airtel', outcome: 'FAILED — insufficient funds' },
                  { msisdn: '255712000003', network: 'Airtel', outcome: 'FAILED — declined by user' },
                  { msisdn: '255787000001', network: 'HaloPesa', outcome: 'COMPLETED immediately' },
                  { msisdn: '255787000002', network: 'HaloPesa', outcome: 'FAILED — timeout' },
                ].map(r => (
                  <tr key={r.msisdn}>
                    <td><code className="inline-code">{r.msisdn}</code></td>
                    <td>{r.network}</td>
                    <td>
                      <span className={`docs-outcome ${r.outcome.startsWith('COMPLETED') ? 'docs-outcome--ok' : 'docs-outcome--fail'}`}>
                        {r.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="docs-section">
          <h2 className="docs-section__title">Quick start</h2>
          <div className="docs-codeblock">
            <div className="docs-codeblock__header">
              <span>curl</span>
              <button className="code-block__copy" onClick={() => copy(
                `curl -X POST https://pay.deliviosend.com/v1/payments \\\n  -H "Authorization: Bearer YOUR_SANDBOX_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"amount_minor":10000,"currency":"TZS","payer":{"msisdn":"255712000001"}}'`,
                'curl'
              )}>
                {copied === 'curl' ? <CheckCircle2 size={12} /> : null}
                {copied === 'curl' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="docs-codeblock__pre"><code>{`curl -X POST https://pay.deliviosend.com/v1/payments \\
  -H "Authorization: Bearer YOUR_SANDBOX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"amount_minor":10000,"currency":"TZS","payer":{"msisdn":"255712000001"}}'`}</code></pre>
          </div>
        </section>

        <section className="docs-section">
          <h2 className="docs-section__title">What's different in sandbox</h2>
          <div className="docs-checklist">
            {[
              'Payments transition to COMPLETED or FAILED in under 2 seconds',
              'No real USSD push is sent to the payer phone',
              'Webhooks fire to your callback_url as normal',
              'API keys are prefixed with sk_test_',
              'All data is isolated — sandbox payments never appear in live reports',
            ].map(item => (
              <div key={item} className="docs-checklist__item">
                <CheckCircle2 size={16} className="docs-checklist__icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="docs-section docs-section--cta">
          <p>Ready to go live?</p>
          <Link to="/docs" className="btn btn--outline-dark">Read the full API docs <ExternalLink size={14} /></Link>
        </section>
      </div>
    </div>
  )
}

// ─── Home ────────────────────────────────────────────────────────────────────

function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )
    document.querySelectorAll('.anim-up,.anim-fade,.anim-left,.anim-right,.anim-stagger')
      .forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Developers />
      <Pricing />
      <CTA />
    </main>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/sandbox" element={<SandboxPage />} />
      </Routes>
      <Footer />
    </>
  )
}
