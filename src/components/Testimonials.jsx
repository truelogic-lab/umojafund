import React, { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    { quote: "Umoja Fund has made saving so easy for me. I just contribute KSh 2 daily, and I already see the difference. The platform is simple and trustworthy.", name: "Akimy M.", location: "Nairobi" },
    { quote: "I love the transparency. I can track my contributions and see my payout status in real time. It gives me confidence that my money is safe.", name: "Brian O.", location: "Kisumu" },
    { quote: "It's a great way to save and grow together. The community support is amazing. I'm proud to be part of Umoja Fund.", name: "Sheila W.", location: "Mombasa" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="impact" className="w-full bg-[#fef2f2] py-16 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] mb-2">
            What Our Members Say
          </h2>
          <p className="text-sm text-gray-600">
            Real people. Real stories. Real impact.
          </p>
        </div>

        <div className="relative w-full max-w-3xl mx-auto mb-8">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full shrink-0 px-2">
                  <div className="bg-white rounded-2xl p-6 md:p-10 flex flex-col justify-between shadow-sm border border-gray-100 max-w-xl mx-auto h-full">
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm md:text-base text-center leading-relaxed italic mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                         <User className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-gray-900">— {testimonial.name}</span>
                        <span className="text-[10px] text-gray-500">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-[#dc2626] w-6' 
                  : 'bg-gray-300 hover:bg-gray-400 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
