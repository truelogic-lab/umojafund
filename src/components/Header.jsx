import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.jpg" alt="Umoja Fund" className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200" />
          <span className="font-bold text-lg text-gray-900 tracking-tight">Umoja Fund</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-gray-900 transition">How it works</a>
          <a href="#features" className="hover:text-gray-900 transition">Features</a>
          <a href="#rules" className="hover:text-gray-900 transition">Rules</a>
          <a href="#faq" className="hover:text-gray-900 transition">FAQ</a>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">Sign in</Link>
          <Link to="/signup" className="text-sm font-semibold bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl shadow-sm transition">Join now</Link>
        </div>
        <button className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-6 py-5 flex flex-col gap-4 text-sm font-medium">
            <a href="#how-it-works" onClick={() => setOpen(false)} className="text-gray-700">How it works</a>
            <a href="#features" onClick={() => setOpen(false)} className="text-gray-700">Features</a>
            <a href="#rules" onClick={() => setOpen(false)} className="text-gray-700">Rules</a>
            <a href="#faq" onClick={() => setOpen(false)} className="text-gray-700">FAQ</a>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link to="/login" onClick={() => setOpen(false)} className="text-gray-700">Sign in</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="bg-[#dc2626] text-white font-semibold px-4 py-3 rounded-xl text-center">Join now</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
