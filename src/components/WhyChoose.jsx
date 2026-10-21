import React from 'react';
import { FileText, ShieldCheck, Users, Smartphone, TrendingUp } from 'lucide-react';

const WhyChoose = () => {
  const features = [
    { icon: <FileText className="w-5 h-5 text-[#dc2626]" />, title: 'Transparency', desc: 'Real-time tracking of your contributions and payouts.' },
    { icon: <ShieldCheck className="w-5 h-5 text-[#dc2626]" />, title: 'Security', desc: 'Your funds are protected with top-tier security and trusted partners.' },
    { icon: <Users className="w-5 h-5 text-[#dc2626]" />, title: 'Community', desc: 'Support, grow and achieve together.' },
    { icon: <Smartphone className="w-5 h-5 text-[#dc2626]" />, title: 'Accessibility', desc: 'Join from anywhere in Kenya, anytime.' },
    { icon: <TrendingUp className="w-5 h-5 text-[#dc2626]" />, title: 'Financial Growth', desc: 'Small steps today, bigger dreams tomorrow.' }
  ];

  return (
    <section id="about" className="w-full bg-white py-16 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] mb-2">
            Why Choose Umoja Fund?
          </h2>
          <p className="text-sm text-gray-600">
            More than just a chama — it's a community.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center w-28 sm:w-36">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#fef2f2] rounded-full flex items-center justify-center mb-3 shadow-sm">
                {feature.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;
