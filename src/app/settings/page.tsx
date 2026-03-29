'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [defaultTaxRate, setDefaultTaxRate] = useState('');
  const [defaultNotes, setDefaultNotes] = useState('Payment is due within 30 days.');

  function handleSave() {
    alert('Settings saved! (Demo mode)');
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>

        <div className="glow-card p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Business Info</h2>
          <input
            type="text"
            placeholder="Business name"
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent"
          />
          <input
            type="email"
            placeholder="Business email"
            value={businessEmail}
            onChange={e => setBusinessEmail(e.target.value)}
            className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent"
          />
        </div>

        <div className="glow-card p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Invoice Defaults</h2>
          <div>
            <label className="text-xs text-muted block mb-1">Default Tax Rate (%)</label>
            <input
              type="number"
              placeholder="0"
              value={defaultTaxRate}
              onChange={e => setDefaultTaxRate(e.target.value)}
              step="0.1"
              min={0}
              className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs text-muted block mb-1">Default Notes</label>
            <textarea
              value={defaultNotes}
              onChange={e => setDefaultNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-accent hover:bg-accent-light rounded-xl font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5"
        >
          Save Settings
        </button>
      </div>
    </>
  );
}
