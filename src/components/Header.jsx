import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#fef2f2] font-sans sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden relative border border-gray-200 shadow-sm">
            <img 
              src="/logo.jpg" 
              alt="Umoja Fund Logo" 
              className="w-full h-full object-cover"
              onContextMenu={(e) => e.preventDefault()}
              style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#fbbf24] rounded-full border-2 border-[#fef2f2] z-10"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#dc2626] leading-none tracking-tight">Umoja Fund</span>
            <span className="text-[8px] text-[#dc2626] font-semibold tracking-[0.2em] mt-1 uppercase">Together We Grow</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <a href="#home" className="text-[#dc2626] font-semibold border-b-2 border-[#dc2626] pb-1">Home</a>
          <a href="#about" className="hover:text-[#dc2626] transition-colors">About</a>
          <a href="#how-it-works" className="hover:text-[#dc2626] transition-colors">How It Works</a>
          <a href="#impact" className="hover:text-[#dc2626] transition-colors">Our Impact</a>
          <a href="#faq" className="hover:text-[#dc2626] transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-[#dc2626] transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-700">
            <Phone className="w-4 h-4 text-[#dc2626]" />
            +254 700 123 456
          </div>
          <Link 
            to="/login"
            className="hidden sm:block text-sm font-semibold text-[#dc2626] hover:text-[#b91c1c] transition-colors"
          >
            Log In
          </Link>
          <Link 
            to="/signup"
            className="hidden sm:block bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
          >
            Join Now
          </Link>
          <button 
            className="md:hidden text-gray-700 hover:text-[#dc2626] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-gray-700">
            <a href="#home" onClick={() => setIsOpen(false)} className="text-[#dc2626] font-semibold">Home</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-[#dc2626] transition-colors">About</a>
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="hover:text-[#dc2626] transition-colors">How It Works</a>
            <a href="#impact" onClick={() => setIsOpen(false)} className="hover:text-[#dc2626] transition-colors">Our Impact</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="hover:text-[#dc2626] transition-colors">FAQ</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-[#dc2626] transition-colors">Contact</a>
            <div className="pt-2 border-t border-gray-100 mt-2 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#dc2626]" />
                +254 700 123 456
              </div>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-center text-[#dc2626] font-semibold py-2">
                Log In
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors w-full text-center">
                Join Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
