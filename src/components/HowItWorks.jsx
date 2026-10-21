import React from 'react';
import { UserPlus, Wallet, TrendingUp, Gift } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { number: '01', icon: UserPlus, title: 'Register your M-Pesa number', body: 'Sign up with the phone number that holds your M-Pesa wallet. That number becomes your primary account number for contributions and payouts.' },
    { number: '02', icon: Wallet, title: 'Contribute daily', body: 'Contribute from KSh 2 per day. Each contribution is confirmed by M-Pesa and recorded in the ledger with a unique reference.' },
    { number: '03', icon: TrendingUp, title: 'Pool grows in the collective fund', body: 'All contributions are held in a shared fund. Balances, transactions, and rules are visible to every member at all times.' },
    { number: '04', icon: Gift, title: 'Payouts at cycle end', body: 'At the end of each period, eligible members receive their pro-rata share of the distribution. Every payout is recorded with a reference.' },
  ];
  return (
    <section id="how-it-works" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-[#dc2626] uppercase tracking-wider">How it works</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Four steps. The same for every member.</h2>
          <p className="mt-4 text-gray-600 text-lg">No exceptions, no special treatment. The rules apply equally from the first contribution.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#dc2626] flex items-center justify-center shadow-sm group-hover:bg-[#dc2626] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-bold text-gray-200 group-hover:text-red-200 transition-colors">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
