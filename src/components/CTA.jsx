import React from 'react';
import { Heart, ShieldCheck, TrendingUp, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section id="faq" className="w-full bg-[#fef2f2] pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#991b1b] rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
          
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#dc2626] rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#dc2626] rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

          <div className="relative z-10 md:w-1/3 flex justify-center md:justify-start mb-8 md:mb-0">
            <div className="relative w-40 h-56 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#dc2626] rounded-[2rem] blur-2xl opacity-40"></div>
              <div className="relative w-32 h-52 border-4 border-[#fecaca] rounded-[2rem] bg-white flex flex-col items-center justify-center p-4 shadow-2xl overflow-hidden">
                <div className="absolute top-0 w-12 h-3 bg-[#fecaca] rounded-b-lg"></div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#dc2626] shadow-inner mb-3">
                  <img 
                    src="/logo.jpg" 
                    alt="Umoja Fund Logo" 
                    className="w-full h-full object-cover"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                  />
                </div>
                <div className="w-16 h-1.5 bg-gray-200 rounded-full mb-1"></div>
                <div className="w-10 h-1.5 bg-gray-200 rounded-full"></div>
                <div className="absolute bottom-2 w-10 h-1 bg-gray-300 rounded-full"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg border border-gray-100">
                <TrendingUp className="w-5 h-5 text-[#dc2626]" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-white p-2 rounded-full shadow-lg border border-gray-100">
                <Coins className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div className="absolute -bottom-2 right-2 bg-white p-2 rounded-full shadow-lg border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-[#4ade80]" />
              </div>
            </div>
          </div>

          <div className="relative z-10 md:w-1/3 text-center flex flex-col items-center">
            <span className="text-[#fecaca] text-[10px] font-bold tracking-widest uppercase mb-2">
              Ready to build your future?
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 leading-tight">
              Join Umoja Fund Today
            </h2>
            <p className="text-[#fecaca] text-xs mb-6">
              It only takes a minute. Start your journey with just KSh 2.
            </p>
            <Link 
              to="/signup"
              className="bg-white hover:bg-gray-100 text-[#991b1b] text-sm font-bold px-6 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>

          <div className="relative z-10 md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0">
            <div className="text-white font-serif italic text-xl transform rotate-3 flex flex-col items-center">
              Together<br/>We Grow
              <Heart className="w-5 h-5 mt-1 text-[#fecaca]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
