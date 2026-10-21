import React from 'react';
import { Users, ShieldCheck, Clock, Layers } from 'lucide-react';

const StatsBar = () => {
  const items = [
    { icon: Users, label: 'Member-owned fund', desc: 'No external shareholders' },
    { icon: ShieldCheck, label: 'Double-entry ledger', desc: 'Every entry balanced' },
    { icon: Clock, label: '30-day cycles', desc: 'Predictable payout windows' },
    { icon: Layers, label: 'Published rules', desc: 'Versioned per cycle' },
  ];
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
