import React from 'react';
import { CheckCircle2, Users, ShieldCheck, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="w-full bg-[#fef2f2] relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#fee2e2] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-5">
            <div className="inline-block bg-[#fee2e2] text-[#dc2626] text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
              Kenya's Online Chama
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] leading-[1.15] tracking-tight">
              Small Contributions.<br />
              <span className="text-[#dc2626]">Greater Futures.</span>
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-lg leading-relaxed">
              Join Umoja Fund — a trusted online chama where 100,000+ Kenyans save together, grow together, and get monthly payouts from a shared pool.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
              <Link 
                to="/signup"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors flex items-center justify-center shadow-sm"
              >
                Join Umoja Fund
              </Link>
              <a 
                href="#how-it-works"
                className="bg-transparent border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#fee2e2] text-sm font-semibold px-6 py-3 rounded-full transition-colors flex items-center justify-center text-center"
              >
                Learn How It Works
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Users className="w-5 h-5 text-[#dc2626]" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">100,000+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Members</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#dc2626]" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Secure &</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Transparent</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#dc2626]" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">M-Pesa</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Powered</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="absolute -top-4 right-0 sm:right-10 bg-white rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5 z-20 border border-gray-100">
              <div className="w-5 h-5 bg-[#fee2e2] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-[#dc2626]" />
              </div>
              <span className="text-[10px] font-semibold text-gray-800">Daily Contribution</span>
              <span className="text-[10px] font-bold text-[#dc2626]">Ksh 2</span>
            </div>
            
            <div className="absolute top-10 left-0 lg:-left-10 text-[#dc2626] font-serif italic text-lg sm:text-xl transform -rotate-6 z-20">
              Your<br/>Future<br/>Matters
            </div>

            <div className="relative w-full max-w-sm sm:max-w-md h-[350px] sm:h-[450px] bg-[#fee2e2] rounded-t-full rounded-b-[40px] overflow-hidden flex items-end justify-center">
              <img 
                src="/hero.png" 
                alt="Umoja Fund Hero"
                className="w-full h-full object-cover object-top"
                onContextMenu={(e) => e.preventDefault()}
                style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
