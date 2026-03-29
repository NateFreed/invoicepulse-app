'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { formatCurrency, calculateInvoiceTotals } from '@/lib/types';
import type { LineItem } from '@/lib/types';

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function CreateInvoicePage() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [items, setItems] = useState<LineItem[]>([
    { id: generateId(), description: '', quantity: 1, unit_price: 0 },
  ]);

  function addItem() {
    setItems([...items, { id: generateId(), description: '', quantity: 1, unit_price: 0 }]);
  }

  function removeItem(id: string) {
    if (items.length <= 1) return;
    setItems(items.filter(i => i.id !== id));
  }

  function updateItem(id: string, field: keyof LineItem, value: string | number) {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  }

  const { subtotal, discountAmount, taxAmount, total } = calculateInvoiceTotals(items, taxRate, discountPercent);

  function handleSave() {
    alert('Invoice saved! (Demo mode — Supabase integration coming soon)');
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">New Invoice</h1>

        {/* Client info */}
        <div className="glow-card p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client name"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="px-4 py-3 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent"
            />
            <input
              type="email"
              placeholder="Client email"
              value={clientEmail}
              onChange={e => setClientEmail(e.target.value)}
              className="px-4 py-3 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent"
            />
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="px-4 py-3 bg-surface-hover border border-border rounded-xl text-foreground focus:outline-none focus:border-accent"
          />
        </div>

        {/* Line items */}
        <div className="glow-card p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Line Items</h2>
          {items.map((item, idx) => (
            <div key={item.id} className="flex items-start gap-3">
              <span className="text-xs text-muted pt-3 w-5">{idx + 1}</span>
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={e => updateItem(item.id, 'description', e.target.value)}
                className="flex-1 px-3 py-2.5 bg-surface-hover border border-border rounded-xl text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity || ''}
                onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                min={1}
                className="w-20 px-3 py-2.5 bg-surface-hover border border-border rounded-xl text-sm text-foreground text-center focus:outline-none focus:border-accent"
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={item.unit_price ? (item.unit_price / 100).toFixed(2) : ''}
                  onChange={e => updateItem(item.id, 'unit_price', Math.round(parseFloat(e.target.value || '0') * 100))}
                  step="0.01"
                  min={0}
                  className="w-28 px-3 pl-7 py-2.5 bg-surface-hover border border-border rounded-xl text-sm text-foreground text-right focus:outline-none focus:border-accent"
                />
              </div>
              <span className="text-sm font-medium text-foreground pt-2.5 w-24 text-right">
                {formatCurrency(item.quantity * item.unit_price)}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-muted hover:text-danger pt-2.5 transition-colors"
                title="Remove"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={addItem}
            className="text-sm text-accent hover:text-accent-light font-medium transition-colors"
          >
            + Add Line Item
          </button>
        </div>

        {/* Tax, discount, notes */}
        <div className="glow-card p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted block mb-1">Tax Rate (%)</label>
              <input
                type="number"
                value={taxRate || ''}
                onChange={e => setTaxRate(parseFloat(e.target.value) || 0)}
                step="0.1"
                min={0}
                className="w-full px-3 py-2.5 bg-surface-hover border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Discount (%)</label>
              <input
                type="number"
                value={discountPercent || ''}
                onChange={e => setDiscountPercent(parseFloat(e.target.value) || 0)}
                step="1"
                min={0}
                max={100}
                className="w-full px-3 py-2.5 bg-surface-hover border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted block mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Payment terms, thank you note, etc."
              rows={3}
              className="w-full px-3 py-2.5 bg-surface-hover border border-border rounded-xl text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent resize-none"
            />
          </div>
        </div>

        {/* Totals */}
        <div className="glow-card p-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount ({discountPercent}%)</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {taxRate > 0 && (
              <div className="flex justify-between text-muted">
                <span>Tax ({taxRate}%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 border border-border hover:border-border-light rounded-xl font-semibold text-muted hover:text-foreground transition-all"
          >
            Save Draft
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-accent hover:bg-accent-light rounded-xl font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5"
          >
            Send Invoice
          </button>
        </div>
      </div>
    </>
  );
}
