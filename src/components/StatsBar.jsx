import React from 'react';
import { Users, CalendarDays, Landmark, Heart } from 'lucide-react';

const StatsBar = () => {
  const stats = [
    { icon: <Users className="w-6 h-6 text-[#dc2626]" />, value: '100,000+', label: 'Active Members' },
    { icon: <CalendarDays className="w-6 h-6 text-[#dc2626]" />, value: 'KSh 2', label: 'Daily Contribution' },
    { icon: <Landmark className="w-6 h-6 text-[#dc2626]" />, value: 'KSh 6M', label: 'Monthly Pool (approx.)' },
    { icon: <Heart className="w-6 h-6 text-[#dc2626]" />, value: '100%', label: 'Community Driven' },
  ];

  return (
    <section className="w-full bg-[#fef2f2] pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#fee2e2] rounded-2xl p-6 lg:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-sm">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg font-extrabold text-gray-900 leading-tight">{stat.value}</span>
                <span className="text-[10px] sm:text-xs text-gray-600 font-medium mt-1">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
