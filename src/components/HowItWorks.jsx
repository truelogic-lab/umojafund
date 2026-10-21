import React from 'react';
import Reveal from './Reveal';
import { CheckCircle2 } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full bg-white py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="flex flex-col items-start">
            <span className="text-[#dc2626] text-xs font-bold tracking-widest uppercase mb-2">
              Our Investment Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1a1a] mb-3 leading-tight">
              How Umoja Fund Works
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#dc2626] mb-6">
              It's Simple
            </h3>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md">
              Three easy steps to secure your financial future. Join thousands of Kenyans pooling resources to grow together.
            </p>

            <div className="w-full max-w-md h-56 rounded-3xl relative overflow-hidden border border-[#fee2e2]">
              <img 
                src="/how-it-work.png" 
                alt="How Umoja Fund Works"
                className="w-full h-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
                style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
              />
            </div>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 z-0"></div>

            <div className="flex flex-col gap-6">
              
              <Reveal delay={0.1}>
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#fef2f2] flex items-center justify-center shrink-0 border-4 border-white shadow-sm relative z-10 hidden sm:flex">
                    <span className="text-[#dc2626] font-bold text-base">1</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full relative">
                     <div className="flex justify-between items-start mb-1">
                        <div>
                          <span className="text-[#dc2626] text-[10px] font-bold uppercase tracking-wider">Step One</span>
                          <h4 className="text-base font-bold text-gray-900">Contribute Daily</h4>
                        </div>
                        <div className="bg-[#fee2e2] rounded-full px-2 py-1 flex items-center gap-1">
                           <span className="text-[#dc2626] font-bold text-[10px]">KSh 2</span>
                           <CheckCircle2 className="w-3 h-3 text-[#dc2626]" />
                        </div>
                     </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Each member contributes just KSh 2 per day through M-Pesa. It's quick, safe and easy.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#fef2f2] flex items-center justify-center shrink-0 border-4 border-white shadow-sm relative z-10 hidden sm:flex">
                    <span className="text-[#dc2626] font-bold text-base">2</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full">
                    <span className="text-[#dc2626] text-[10px] font-bold uppercase tracking-wider mb-1 block">Step Two</span>
                    <h4 className="text-base font-bold text-gray-900 mb-1">We Pool & Grow</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      All contributions go into a shared pool, managed with full transparency and top-tier security.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#fef2f2] flex items-center justify-center shrink-0 border-4 border-white shadow-sm relative z-10 hidden sm:flex">
                    <span className="text-[#dc2626] font-bold text-base">3</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full relative">
                     <div className="flex justify-between items-start mb-1">
                        <div>
                          <span className="text-[#dc2626] text-[10px] font-bold uppercase tracking-wider">Step Three</span>
                          <h4 className="text-base font-bold text-gray-900">Everyone Gets Paid</h4>
                        </div>
                        <div className="bg-[#fef3c7] rounded-full px-2 py-1 flex items-center gap-1">
                           <span className="text-[#d97706] font-bold text-[10px]">KSh 60</span>
                           <CheckCircle2 className="w-3 h-3 text-[#d97706]" />
                        </div>
                     </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      At the end of the month, every eligible member receives a share of the pool. Because we grow together.
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </div>

        <Reveal delay={0.4} width="100%">
          <div className="mt-12 flex justify-center w-full">
            <button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm">
              Start Your Journey
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default HowItWorks;
