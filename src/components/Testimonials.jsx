import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    { quote: 'The first time I opened the app, the balance matched what I had contributed. That has never been true of any other chama I have used.', name: 'Amina M.', role: 'Member since 2024', initial: 'A' },
    { quote: 'I like that the rules are written down before the cycle starts. There is no surprise at payout time.', name: 'Brian O.', role: 'Member since 2024', initial: 'B' },
    { quote: 'My contribution history is the same as the ledger. If I miss a day, I can see exactly what it does to my share.', name: 'Sheila W.', role: 'Member since 2025', initial: 'S' },
  ];
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-[#dc2626] uppercase tracking-wider">Members</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Verified members. Real experiences.</h2>
          <p className="mt-4 text-gray-600 text-lg">Quotes about how the system works, not about how much they earned.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col shadow-sm hover:shadow-lg hover:shadow-gray-200/40 transition-all">
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                ))}
              </div>
              <blockquote className="text-sm text-gray-700 leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fef2f2] text-[#dc2626] flex items-center justify-center font-semibold text-sm">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
