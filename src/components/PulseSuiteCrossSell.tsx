'use client';

const RECOMMENDATIONS = [
  { name: 'BookPulse', desc: 'Let clients book you online', price: '$8/mo', color: '#f97316' },
  { name: 'ProposalPulse', desc: 'Send proposals before invoicing', price: '$9/mo', color: '#a855f7' },
  { name: 'ReviewPulse', desc: 'Collect reviews after payment', price: '$19/mo', color: '#f59e0b' },
];

export default function PulseSuiteCrossSell() {
  return (
    <div className="glow-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-muted uppercase tracking-wider font-semibold">From the Pulse Suite</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {RECOMMENDATIONS.map(r => (
          <div key={r.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">{r.name}</div>
              <div className="text-xs text-muted">{r.desc}</div>
            </div>
            <span className="text-xs text-muted">{r.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
