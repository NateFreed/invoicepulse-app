'use client';

import Tutorial, { TutorialStep } from './Tutorial';

const steps: TutorialStep[] = [
  {
    title: 'Create Invoices Fast',
    description: 'Add line items, set tax and discounts, and send professional invoices in under 30 seconds. Your clients get a clean payment link.',
  },
  {
    title: 'Track Every Dollar',
    description: 'Your dashboard shows outstanding, collected, and overdue amounts at a glance. Never lose track of who owes you what.',
  },
  {
    title: 'Get Paid Faster',
    description: 'Upgrade to Pro for auto payment reminders, recurring invoices, and AI-powered line item suggestions that save you time on every invoice.',
  },
];

export default function AppTutorial() {
  return <Tutorial appName="InvoicePulse" steps={steps} accentColor="bg-accent" />;
}
