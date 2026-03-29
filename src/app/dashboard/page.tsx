'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AppTutorial from '@/components/AppTutorial';
import PulseSuiteCrossSell from '@/components/PulseSuiteCrossSell';
import { getUser } from '@/lib/auth';
import { STATUS_STYLES, formatCurrency } from '@/lib/types';
import type { Invoice } from '@/lib/types';

const MOCK_INVOICES: Invoice[] = [
  {
    id: '1', invoice_number: 'INV-001', client_name: 'Acme Corp', client_email: 'billing@acme.com',
    status: 'paid', line_items: [], subtotal: 450000, tax_rate: 0, tax_amount: 0,
    discount_percent: 0, discount_amount: 0, total: 450000, notes: '',
    due_date: '2026-03-20', created_at: '2026-03-10T10:00:00Z', paid_at: '2026-03-18T14:00:00Z',
  },
  {
    id: '2', invoice_number: 'INV-002', client_name: 'TechStart Inc', client_email: 'ap@techstart.io',
    status: 'sent', line_items: [], subtotal: 275000, tax_rate: 8.5, tax_amount: 23375,
    discount_percent: 0, discount_amount: 0, total: 298375, notes: '',
    due_date: '2026-04-05', created_at: '2026-03-22T09:00:00Z', paid_at: null,
  },
  {
    id: '3', invoice_number: 'INV-003', client_name: 'Green Events LLC', client_email: 'lisa@greenevents.com',
    status: 'overdue', line_items: [], subtotal: 120000, tax_rate: 0, tax_amount: 0,
    discount_percent: 10, discount_amount: 12000, total: 108000, notes: '',
    due_date: '2026-03-15', created_at: '2026-03-01T08:00:00Z', paid_at: null,
  },
  {
    id: '4', invoice_number: 'INV-004', client_name: 'David Brown', client_email: 'david@freelance.com',
    status: 'draft', line_items: [], subtotal: 85000, tax_rate: 0, tax_amount: 0,
    discount_percent: 0, discount_amount: 0, total: 85000, notes: '',
    due_date: '2026-04-15', created_at: '2026-03-28T16:00:00Z', paid_at: null,
  },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try { await getUser(); } catch {} finally { setLoading(false); }
    }
    init();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>;
  }

  const totalRevenue = MOCK_INVOICES.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const outstanding = MOCK_INVOICES.filter(i => i.status === 'sent' || i.status === 'viewed').reduce((s, i) => s + i.total, 0);
  const overdue = MOCK_INVOICES.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0);

  return (
    <>
      <Navbar />
      <AppTutorial />
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <Link href="/editor" className="px-4 py-2 bg-accent hover:bg-accent-light rounded-xl text-sm font-semibold text-white shadow-sm shadow-accent/10 transition-all">
            + New Invoice
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glow-card p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{MOCK_INVOICES.length}</div>
            <div className="text-xs text-muted">Total</div>
          </div>
          <div className="glow-card p-4 text-center">
            <div className="text-2xl font-bold text-success">{formatCurrency(totalRevenue)}</div>
            <div className="text-xs text-muted">Collected</div>
          </div>
          <div className="glow-card p-4 text-center">
            <div className="text-2xl font-bold text-accent">{formatCurrency(outstanding)}</div>
            <div className="text-xs text-muted">Outstanding</div>
          </div>
          <div className="glow-card p-4 text-center">
            <div className="text-2xl font-bold text-danger">{formatCurrency(overdue)}</div>
            <div className="text-xs text-muted">Overdue</div>
          </div>
        </div>

        {/* Invoice list */}
        <div className="space-y-2">
          {MOCK_INVOICES.map((invoice) => {
            const style = STATUS_STYLES[invoice.status];
            return (
              <div key={invoice.id} className="glow-card p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-muted font-mono">{invoice.invoice_number}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground truncate">{invoice.client_name}</h3>
                  <p className="text-xs text-muted">Due {new Date(invoice.due_date).toLocaleDateString()}</p>
                </div>
                <span className="text-lg font-bold text-foreground">{formatCurrency(invoice.total)}</span>
              </div>
            );
          })}
        </div>

        {/* Cross-sell: ReviewPulse */}
        {MOCK_INVOICES.some(i => i.status === 'paid') && (
          <div className="glow-card p-5 flex items-center justify-between !border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500/15 rounded-lg flex items-center justify-center text-amber-400 text-sm">⭐</div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Client paid? Ask for a review</h3>
                <p className="text-xs text-muted">Happy clients give the best reviews. Send a request while the experience is fresh.</p>
              </div>
            </div>
            <a href="https://reviewpulse.pages.dev/requests" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-500/15 text-amber-400 rounded-xl text-xs font-medium hover:bg-amber-500/25 transition-colors flex-shrink-0">
              Request Review →
            </a>
          </div>
        )}

        <PulseSuiteCrossSell />
      </div>
    </>
  );
}
