import React, { useState } from "react";

const socialLinks = [
  { href: "https://instagram.com", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> },
  { href: "https://facebook.com", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  { href: "https://x.com", icon: <img src="/x.png" alt="X" className="w-6 h-6 object-contain" /> },
  { href: "https://youtube.com", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" /><polygon points="10 8 16 12 10 16 10 8" /></svg> },
];

const Footer = () => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("8767092368");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <footer className="w-full bg-black text-white font-inter">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 left-4 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition">
          Phone number copied!
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-start gap-8 md:gap-0 relative">
        {/* Logo and tagline */}
        <div className="md:w-1/4 flex flex-col items-start mb-0 md:mb-0">
          <img src="/logow.png" alt="Jaunpurs Logo" className="w-[50vw] md:w-[18vw] h-auto" />
        </div>
        {/* Divider 1 */}
        <div className="hidden md:block absolute left-1/4 top-5 h-full" aria-hidden="true"
          style={{
            width: "2px",
            background: "linear-gradient(to bottom, #fff, transparent)"
          }}
        />
        {/* Order platforms */}
        <div className="md:w-1/4 flex flex-col items-start pl-0 md:pl-6">
          <div className="mb-2 text-base font-medium">You can order from this platform</div>
          <div className="flex flex-row gap-2">
            <a href="https://swiggy.com" target="_blank" rel="noopener noreferrer" className="w-32">
              <img src="/Hero/swiggy.png" alt="Swiggy" className="w-full h-8 object-contain" />
            </a>
            <a href="https://zomato.com" target="_blank" rel="noopener noreferrer" className="w-32">
              <img src="/Hero/zomato.png" alt="Zomato" className="w-full h-8 object-contain" />
            </a>
          </div>
        </div>
        {/* Divider 2 */}
        <div className="hidden md:block absolute left-2/4 top-5 h-full" aria-hidden="true"
          style={{
            width: "2px",
            background: "linear-gradient(to bottom, #fff, transparent)"
          }}
        />
        {/* Contact */}
        <div className="md:w-1/4 flex flex-col items-start pl-0 md:pl-6">
          <div className="mb-2 text-[3.5vw] md:text-base font-medium">Contact</div>
          <div className="text-[4vw] md:text-sm flex items-center gap-2">
            8767092368
            <button
              onClick={handleCopy}
              aria-label="Copy phone number"
              className="ml-1 p-1 rounded hover:bg-white/10 transition"
              type="button"
            >
              {/* Clipboard SVG icon */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" />
              </svg>
            </button>
          </div>
        </div>
        {/* Divider 3 */}
        <div className="hidden md:block absolute left-3/4 top-5 h-full" aria-hidden="true"
          style={{
            width: "2px",
            background: "linear-gradient(to bottom, #fff, transparent)"
          }}
        />
        {/* Location */}
        <div className="md:w-1/4 flex flex-col items-start pl-0 md:pl-6">
          <div className="mb-2 text-base font-medium">Location</div>
          <div className="text-sm">
            Jaunpurs sweets<br />
            manewada sq besa road, near, ghat, beside HP petrol pump, near Manewada,<br />
            Nagpur, Maharashtra 440027
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="bg-white text-black flex flex-col md:flex-row items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="text-sm mb-2 md:mb-0">Crafted with excellence by FrameX</div>
        <div className="flex gap-3">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="p-1 rounded border-2 border-black bg-black text-white hover:bg-white hover:text-black transition">
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
