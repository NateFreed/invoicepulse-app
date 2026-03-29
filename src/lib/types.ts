export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number; // in cents
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  client_email: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue';
  line_items: LineItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_percent: number;
  discount_amount: number;
  total: number;
  notes: string;
  due_date: string;
  created_at: string;
  paid_at: string | null;
}

export const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-muted/15', text: 'text-muted', label: 'Draft' },
  sent: { bg: 'bg-accent/15', text: 'text-accent', label: 'Sent' },
  viewed: { bg: 'bg-blue-400/15', text: 'text-blue-400', label: 'Viewed' },
  paid: { bg: 'bg-success/15', text: 'text-success', label: 'Paid' },
  overdue: { bg: 'bg-danger/15', text: 'text-danger', label: 'Overdue' },
};

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export function calculateInvoiceTotals(items: LineItem[], taxRate: number, discountPercent: number) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = Math.round(afterDiscount * (taxRate / 100));
  const total = afterDiscount + taxAmount;
  return { subtotal, discountAmount, taxAmount, total };
}
