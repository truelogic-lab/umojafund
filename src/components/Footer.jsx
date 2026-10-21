import React from 'react';
import { Globe, Briefcase, Camera, Video, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="w-full bg-[#450a0a] pt-12 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-10">
          
          {/* Column 1: Brand & Socials */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden relative border border-gray-200 shadow-sm">
                <img 
                  src="/logo.jpg" 
                  alt="Umoja Fund Logo" 
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#fbbf24] rounded-full border-2 border-[#450a0a] z-10"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-none tracking-tight">Umoja Fund</span>
                <span className="text-[7px] text-gray-400 font-semibold tracking-[0.2em] mt-1 uppercase">Together We Grow</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">
              A trusted online chama helping Kenyans save, grow and achieve their financial goals together.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors">
                <Globe className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="#" className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors">
                <Briefcase className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="#" className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors">
                <Camera className="w-3.5 h-3.5 text-white" />
              </a>
              <a href="#" className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors">
                <Video className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white text-sm font-bold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-[11px] text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#impact" className="hover:text-white transition-colors">Our Impact</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="col-span-1">
            <h4 className="text-white text-sm font-bold mb-4">Legal</h4>
            <ul className="flex flex-col gap-2 text-[11px] text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Responsible Finance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">KYC & AML</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white text-sm font-bold mb-4">Contact Us</h4>
            <ul className="flex flex-col gap-3 text-[11px] text-gray-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#dc2626]" />
                +254 700 123 456
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#dc2626]" />
                support@umojafund.co.ke
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-500">
            © {new Date().getFullYear()} Umoja Fund. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-500">
            Small Contributions. Greater Futures.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
