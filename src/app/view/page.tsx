'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/types';
import type { LineItem } from '@/lib/types';

// Demo invoice for client view
const DEMO_INVOICE = {
  invoice_number: 'INV-001',
  business_name: 'Creative Studio',
  business_email: 'hello@creativestudio.com',
  client_name: 'Acme Corp',
  client_email: 'billing@acme.com',
  status: 'sent' as const,
  due_date: '2026-04-15',
  created_at: '2026-03-28',
  notes: 'Payment is due within 30 days. Thank you for your business!',
  items: [
    { id: '1', description: 'Website Redesign — Full responsive redesign with mobile-first approach', quantity: 1, unit_price: 350000 },
    { id: '2', description: 'Logo Design — 3 concepts with 2 rounds of revisions', quantity: 1, unit_price: 80000 },
    { id: '3', description: 'SEO Optimization — Technical audit and on-page optimization', quantity: 12, unit_price: 12500 },
  ] as LineItem[],
  tax_rate: 8,
  discount_percent: 0,
};

export default function InvoiceViewPage() {
  const [paying, setPaying] = useState(false);

  const inv = DEMO_INVOICE;
  const subtotal = inv.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  const discountAmount = Math.round(subtotal * (inv.discount_percent / 100));
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = Math.round(afterDiscount * (inv.tax_rate / 100));
  const total = afterDiscount + taxAmount;

  async function handlePay() {
    setPaying(true);
    // TODO: Create Stripe checkout session
    await new Promise(r => setTimeout(r, 1500));
    setPaying(false);
    alert('Payment integration coming soon! In production, this redirects to Stripe Checkout.');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface/50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Invoice</span>
              <span className="text-foreground">Pulse</span>
            </span>
          </div>
          <span className="text-xs bg-accent/15 text-accent px-2.5 py-1 rounded-full font-medium">
            Invoice {inv.invoice_number}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Invoice header */}
        <div className="glow-card p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{inv.invoice_number}</h1>
              <p className="text-sm text-muted">
                Issued {new Date(inv.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-accent">{formatCurrency(total)}</p>
              <p className="text-sm text-muted">
                Due {new Date(inv.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 py-4 border-t border-b border-border">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-1">From</p>
              <p className="text-sm font-medium text-foreground">{inv.business_name}</p>
              <p className="text-xs text-muted">{inv.business_email}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-1">To</p>
              <p className="text-sm font-medium text-foreground">{inv.client_name}</p>
              <p className="text-xs text-muted">{inv.client_email}</p>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="glow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-muted font-medium">Description</th>
                <th className="text-right p-4 text-muted font-medium w-20">Qty</th>
                <th className="text-right p-4 text-muted font-medium w-28">Rate</th>
                <th className="text-right p-4 text-muted font-medium w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {inv.items.map((item) => (
                <tr key={item.id} className="border-b border-border/50">
                  <td className="p-4 text-foreground">{item.description}</td>
                  <td className="p-4 text-right text-muted">{item.quantity}</td>
                  <td className="p-4 text-right text-muted">{formatCurrency(item.unit_price)}</td>
                  <td className="p-4 text-right font-medium text-foreground">{formatCurrency(item.quantity * item.unit_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="p-4 bg-surface-hover/30">
            <div className="flex justify-end">
              <div className="w-64 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-foreground">{formatCurrency(subtotal)}</span>
                </div>
                {inv.discount_percent > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Discount ({inv.discount_percent}%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                {inv.tax_rate > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tax ({inv.tax_rate}%)</span>
                    <span className="text-foreground">{formatCurrency(taxAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span className="text-foreground">Total Due</span>
                  <span className="text-accent">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {inv.notes && (
          <div className="glow-card p-5">
            <p className="text-xs text-muted uppercase tracking-wider mb-2">Notes</p>
            <p className="text-sm text-foreground">{inv.notes}</p>
          </div>
        )}

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={paying}
          className="w-full py-4 bg-accent hover:bg-accent-light disabled:opacity-50 rounded-xl text-lg font-bold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5"
        >
          {paying ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing...
            </span>
          ) : (
            `Pay ${formatCurrency(total)}`
          )}
        </button>

        <p className="text-center text-xs text-muted">
          Secured by Stripe. Powered by InvoicePulse.
        </p>
      </div>
    </div>
  );
}
