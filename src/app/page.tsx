import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl px-6 py-3 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Invoice</span>
          <span className="text-foreground">Pulse</span>
        </span>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground transition-colors">Sign In</Link>
          <Link href="/auth/signup" className="px-5 py-2 bg-accent hover:bg-accent-light rounded-xl text-sm font-semibold text-white shadow-sm shadow-accent/20 transition-all hover:-translate-y-0.5">Start Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden py-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[140px] pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted">Get paid faster with AI-powered invoicing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Invoice</span>
            <span className="text-foreground">Pulse</span>
          </h1>
          <p className="text-xl text-muted mb-3">Professional invoices in 30 seconds.</p>
          <p className="text-lg text-muted/60 mb-10">
            From <span className="text-foreground font-semibold">$12/mo</span>.
            <span className="text-muted/40 ml-2 line-through">FreshBooks $17/mo</span>
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/auth/signup" className="px-8 py-3.5 bg-accent hover:bg-accent-light rounded-xl font-semibold text-lg text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5">
              Start Free Trial
            </Link>
            <Link href="/auth/login" className="px-8 py-3.5 border border-border hover:border-border-light rounded-xl font-semibold text-lg text-muted hover:text-foreground transition-all hover:-translate-y-0.5">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted mb-12">Everything you need to get paid</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Quick Create', desc: 'Invoice in 30 seconds with smart defaults', icon: '\u26A1' },
              { title: 'Payment Links', desc: 'One-click pay via Stripe', icon: '\uD83D\uDD17' },
              { title: 'Auto Reminders', desc: 'Chase overdue invoices automatically', icon: '\uD83D\uDD14' },
              { title: 'AI Line Items', desc: 'Describe the project, we fill it in', icon: '\uD83E\uDD16' },
            ].map((f) => (
              <div key={f.title} className="glow-card p-6 text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted mb-4">Pricing</h2>
          <p className="text-center text-sm text-muted/60 mb-12">
            FreshBooks: $17/user. Zoho Invoice: $15/mo. <span className="text-accent font-semibold">InvoicePulse: $12/mo.</span>
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Free */}
            <div className="glow-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-1">Free</h3>
              <p className="text-3xl font-bold text-foreground mb-4">$0<span className="text-sm text-muted font-normal">/mo</span></p>
              <ul className="space-y-2 text-sm text-muted mb-6">
                <li>3 invoices/month</li>
                <li>Basic templates</li>
                <li>Manual tracking</li>
              </ul>
              <Link href="/auth/signup" className="block w-full py-2.5 border border-border rounded-xl text-sm font-semibold text-center text-muted hover:text-foreground transition-all">
                Get Started
              </Link>
            </div>
            {/* Pro */}
            <div className="glow-card p-6 ring-2 ring-accent/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-accent rounded-full text-xs font-semibold text-white">Popular</div>
              <h3 className="text-lg font-bold text-foreground mb-1">Pro</h3>
              <p className="text-3xl font-bold text-foreground mb-4">$12<span className="text-sm text-muted font-normal">/mo</span></p>
              <ul className="space-y-2 text-sm text-muted mb-6">
                <li>Unlimited invoices</li>
                <li>AI line items</li>
                <li>Recurring billing</li>
                <li>Payment links</li>
                <li>Auto reminders</li>
              </ul>
              <Link href="/auth/signup" className="block w-full py-2.5 bg-accent hover:bg-accent-light rounded-xl text-sm font-semibold text-center text-white shadow-sm shadow-accent/20 transition-all hover:-translate-y-0.5">
                Start Free Trial
              </Link>
            </div>
            {/* Business */}
            <div className="glow-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-1">Business</h3>
              <p className="text-3xl font-bold text-foreground mb-4">$29<span className="text-sm text-muted font-normal">/mo</span></p>
              <ul className="space-y-2 text-sm text-muted mb-6">
                <li>All Pro features</li>
                <li>Team access</li>
                <li>Custom branding</li>
                <li>API access</li>
                <li>Priority support</li>
              </ul>
              <Link href="/auth/signup" className="block w-full py-2.5 border border-border rounded-xl text-sm font-semibold text-center text-muted hover:text-foreground transition-all">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center">
        <span className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Invoice</span>
          <span className="text-foreground">Pulse</span>
        </span>
        <p className="text-sm text-muted mt-2">Professional invoices in seconds.</p>
      </footer>
    </main>
  );
}
