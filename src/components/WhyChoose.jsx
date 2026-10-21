import React from 'react';
import { Check } from 'lucide-react';

const WhyChoose = () => {
  const reasons = [
    { title: 'Transparent to the last shilling', body: 'Every contribution and payout is recorded with a reference and visible to the member it belongs to.' },
    { title: 'Rules that do not change quietly', body: 'Contribution and payout rules are versioned. Any update is documented before it applies to a cycle.' },
    { title: 'No guarantees invented by the UI', body: 'Payout amounts are computed at cycle close from actual confirmed contributions. The app never promises a return it cannot support.' },
    { title: 'Members control what they see', body: 'Balances come from the backend ledger, not cached values or hard-coded estimates.' },
    { title: 'Security you can verify', body: 'Tokens are short-lived, sessions are isolated, and every admin action is written to an audit log.' },
    { title: 'Built for Kenya', body: 'M-Pesa is the only payment rail. KES is the only currency. Phone numbers are validated before they can be saved.' },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-[#dc2626] uppercase tracking-wider">Why Umoja</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Honest answers, not marketing promises.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-9 h-9 rounded-full bg-[#dc2626] text-white flex items-center justify-center mb-4">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1.5">{reason.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
