import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2.5">
              <img src="/logo.jpg" alt="Umoja Fund" className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200" />
              <span className="font-bold text-lg text-gray-900 tracking-tight">Umoja Fund</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              A member-owned collective fund. Contributions from KSh 2 per day. Transparent rules, auditable ledger.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-4">Product</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#how-it-works" className="hover:text-gray-900 transition">How it works</a></li>
              <li><a href="#features" className="hover:text-gray-900 transition">Features</a></li>
              <li><a href="#rules" className="hover:text-gray-900 transition">Rules</a></li>
              <li><a href="#faq" className="hover:text-gray-900 transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-4">Legal</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition">Terms of service</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Privacy policy</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Member agreement</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>support@umojafund.co.ke</li>
              <li>+254 700 123 456</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Umoja Fund. All rights reserved.</p>
          <p className="text-xs text-gray-400">Built in Kenya. Powered by M-Pesa.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
