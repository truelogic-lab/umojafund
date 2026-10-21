import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="relative bg-gradient-to-br from-[#dc2626] to-[#991b1b] rounded-3xl px-8 py-16 md:px-16 md:py-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">Start with KSh 2 today.</h2>
            <p className="mt-4 text-white/85 text-lg leading-relaxed max-w-xl">
              Register your M-Pesa number, make your first contribution, and watch the ledger record every step. No minimum balance, no hidden fees, no promises the system cannot support.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 bg-white text-[#dc2626] font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition shadow-lg">
                Create an account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center border border-white/30 text-white font-medium px-6 py-3.5 rounded-xl hover:bg-white/10 transition">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
