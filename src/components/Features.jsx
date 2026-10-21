import React from 'react';
import { ShieldCheck, FileText, Clock, Wallet } from 'lucide-react';

const Features = () => {
  const features = [
    { icon: ShieldCheck, title: 'Double-entry ledger', body: 'Every contribution and payout is recorded on both sides. Cash in equals cash out, always. The ledger is the source of truth.' },
    { icon: FileText, title: 'Published distribution rules', body: 'Each fund period has a documented rule version and a public snapshot of how the pool will be split before it runs.' },
    { icon: Clock, title: 'Full transaction history', body: 'Every contribution, reversal, and payout carries a timestamp and a reference you can audit at any time.' },
    { icon: Wallet, title: 'You keep your M-Pesa PIN', body: 'Contributions move directly from your M-Pesa wallet to the fund. Umoja Fund never handles your PIN or SIM card.' },
  ];
  return (
    <section id="features" className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-[#dc2626] uppercase tracking-wider">Built for trust</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">A financial system, not a mobile app.</h2>
          <p className="mt-4 text-gray-600 text-lg">The rules and the ledger decide every balance you see. Nothing is estimated.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
