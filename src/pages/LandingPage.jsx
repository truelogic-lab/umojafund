import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Rules = () => {
  const rules = [
    { label: 'Minimum daily contribution', value: 'KSh 2.00' },
    { label: 'Maximum daily contribution', value: 'KSh 1,500.00' },
    { label: 'Distribution rule', value: 'Pro-rata by confirmed contribution' },
    { label: 'Cycle length', value: '30 days' },
    { label: 'Payout method', value: 'M-Pesa to verified primary number' },
    { label: 'Failed payment handling', value: 'Retried after status verification; never credited twice' },
    { label: 'Rule version', value: 'v1 (current)' },
  ];
  return (
    <section id="rules" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-[#dc2626] uppercase tracking-wider">Rules</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Contribution and payout rules.</h2>
          <p className="mt-4 text-gray-600 text-lg">These are the rules every member agrees to. They are versioned and published before each cycle opens.</p>
        </div>
        <dl className="divide-y divide-gray-100 border-y border-gray-100">
          {rules.map((rule) => (
            <div key={rule.label} className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <dt className="text-sm text-gray-500">{rule.label}</dt>
              <dd className="text-sm font-medium text-gray-900 sm:text-right">{rule.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

const Faq = () => {
  const faqs = [
    { q: 'Is Umoja Fund a savings account?', a: 'No. It is a collective fund. Each member contributes to a shared pool, and the pool is distributed according to published rules. Individual balances are not personal savings.' },
    { q: 'What happens if I stop contributing?', a: 'Your contribution history stays on record. Payouts are based on confirmed contributions during the period, so missed days mean a lower share for that period.' },
    { q: 'How is my money protected?', a: 'Every contribution is recorded in a double-entry ledger with a reference you can audit. The fund is reconciled against actual M-Pesa cash before any payout is approved.' },
    { q: 'Can I change my M-Pesa number?', a: 'Yes, through a verification process that requires proving ownership of both the old and new numbers. The first number you register stays primary until that process completes.' },
    { q: 'How are payouts calculated?', a: 'At the end of each period, the distribution is calculated pro-rata by each member\'s confirmed contribution that period. The rule version and calculation inputs are published before execution.' },
  ];
  return (
    <section id="faq" className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-[#dc2626] uppercase tracking-wider">FAQ</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Frequently asked questions.</h2>
        </div>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-medium text-gray-900 pr-4">{f.q}</span>
                <span className="text-gray-400 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-3xl">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <HowItWorks />
        <Features />
        <WhyChoose />
        <Rules />
        <Testimonials />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
