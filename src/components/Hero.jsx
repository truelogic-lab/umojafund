import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50 via-transparent to-transparent opacity-70" />
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
              <span className="text-xs font-medium text-gray-700">Digital chama · Kenya</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05]">
              Small daily contributions.
              <span className="block text-[#dc2626]">A transparent pool.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
              Members contribute from KSh 2 per day to a shared collective fund. At the end of each cycle, the pool is distributed according to published rules — every shilling tracked in a double-entry ledger.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition">
                Create an account <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 font-medium px-6 py-3.5 rounded-xl hover:bg-gray-50 transition">
                See how it works
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="text-2xl font-bold text-gray-900">KSh 2</p>
                <p className="text-xs text-gray-500 mt-1">Daily from</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">30 days</p>
                <p className="text-xs text-gray-500 mt-1">Cycle length</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-xs text-gray-500 mt-1">Auditable</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-red-100 to-transparent rounded-[2rem] blur-2xl opacity-60" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
              <img src="/hero.png" alt="Umoja Fund community" className="w-full h-[520px] object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Auditable ledger</p>
                    <p className="text-xs text-white/70">Every transaction recorded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
