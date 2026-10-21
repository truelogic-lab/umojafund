import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const Features = () => {
  return (
    <section className="w-full bg-white py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          
          <div className="bg-[#fef2f2] rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fee2e2] rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none"></div>
            
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex justify-center md:justify-start">
                <div className="relative w-20 h-32 md:w-32 md:h-52 bg-white rounded-[1rem] md:rounded-[2rem] border-4 md:border-8 border-gray-900 shadow-xl flex flex-col items-center justify-center overflow-hidden">
                   <div className="absolute top-0 w-8 md:w-12 h-2 md:h-3 bg-gray-900 rounded-b-lg md:rounded-b-xl"></div>
                   <div className="w-8 h-8 md:w-10 md:h-10 bg-[#dc2626] rounded-full flex items-center justify-center mb-1">
                     <span className="text-white font-bold text-[8px] md:text-[10px]">M-PESA</span>
                   </div>
                   <div className="w-8 md:w-12 h-1 bg-gray-200 rounded-full mb-1"></div>
                   <div className="w-10 md:w-16 h-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                  Fast, Secure & Reliable
                </h3>
                <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">
                  Contribute and receive payouts through M-Pesa. Your money is safe with trusted partners.
                </p>
                <button className="border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors text-[10px] md:text-xs">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#f8f4fb] rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#efe5f7] rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none"></div>
             
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex justify-center md:justify-start">
                <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#9333ea]/10 rounded-full blur-xl"></div>
                  <Lock className="w-12 h-12 md:w-16 md:h-16 text-[#9333ea] drop-shadow-md z-10 relative" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 z-20">
                     <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626]" />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                  Your Trust, Our Priority
                </h3>
                <p className="text-[10px] md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">
                  We use bank-level security and transparent records. Track your contributions anytime.
                </p>
                <button className="border-2 border-[#9333ea] text-[#9333ea] hover:bg-[#9333ea] hover:text-white font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors text-[10px] md:text-xs">
                  View Security
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
