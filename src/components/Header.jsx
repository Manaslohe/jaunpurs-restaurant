import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Helper for slow smooth scroll
  const smoothScrollTo = (element, duration = 1200) => {
    if (!element) return;
    const targetY = element.getBoundingClientRect().top + window.pageYOffset;
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    let start;

    function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutQuad(percent));
      if (percent < 1) {
        window.requestAnimationFrame(step);
      }
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    window.requestAnimationFrame(step);
  };

  // Helper to scroll to section by id (slow smooth)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      smoothScrollTo(el, 1200);
    }
  };

  return (
    <header className="w-full min-w-[30%] flex items-center justify-start py-2 md:py-4 md:pl-6 px-2 font-inter relative bg-transparent z-50">
      {/* Logo and tagline */}
      <div className="flex items-center mr-12">
        <img
          src="/logo.png"
          alt="Jaunpurs Logo"
          className="h-20 w-30 object-contain md:h-20 md:w-50 transition-all duration-300"
        />
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-lg font-medium">
        <span
          className="relative cursor-pointer px-4 py-2 group transition-all duration-300 hover:text-orange-500"
          onClick={() => navigate('/')}
        >
          <span className="relative z-10">Home</span>
          {/* Modern underline effect */}
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-500 ease-out"></span>
          {/* Subtle glow effect */}
          <span className="absolute inset-0 bg-orange-100/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></span>
        </span>
        
        <span
          className="relative cursor-pointer px-4 py-2 group transition-all duration-300 hover:text-orange-500"
          onClick={() => scrollToSection('sweet')}
        >
          <span className="relative z-10">Menu</span>
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-500 ease-out"></span>
          <span className="absolute inset-0 bg-orange-100/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></span>
        </span>
        
        <span
          className="relative cursor-pointer px-4 py-2 group transition-all duration-300 hover:text-orange-500"
          onClick={() => scrollToSection('ourstory')}
        >
          <span className="relative z-10">Our Story</span>
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-500 ease-out"></span>
          <span className="absolute inset-0 bg-orange-100/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></span>
        </span>
        
        <span
          className="relative cursor-pointer px-4 py-2 group transition-all duration-300 hover:text-orange-500"
          onClick={() => scrollToSection('gallery')}
        >
          <span className="relative z-10">Gallery</span>
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-500 ease-out"></span>
          <span className="absolute inset-0 bg-orange-100/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></span>
        </span>
        
        <span
          className="relative cursor-pointer px-4 py-2 group transition-all duration-300 hover:text-orange-500"
          onClick={() => navigate('/contact')}
        >
          <span className="relative z-10">Contact</span>
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-500 ease-out"></span>
          <span className="absolute inset-0 bg-orange-100/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></span>
        </span>
      </nav>
      
      {/* Mobile Hamburger */}
      <div className="md:hidden ml-auto flex items-center">
        <button
          className={`p-2 rounded focus:outline-none transition-all duration-300 ${mobileOpen ? 'bg-orange-100' : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          {/* Hamburger to Cross animation using react-icons */}
          {!mobileOpen ? (
            <FiMenu size={24} className="transition-transform duration-500 text-white" />
          ) : (
            <FiX size={24} className="transition-transform duration-500 text-orange-500" />
          )}
        </button>
        
        {/* Mobile Dropdown */}
        <div className={`absolute top-full left-0 w-full px-2 transition-all duration-500 z-50
            ${mobileOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}
          `}>
          <div className="flex flex-col py-4 bg-white/90 rounded-2xl shadow-2xl border border-orange-100 backdrop-blur-md
            animate-fade-in-down
          ">
            <span
              className="mx-2 my-1 px-6 py-3 text-base font-semibold rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-sm"
              onClick={() => { setMobileOpen(false); navigate('/'); }}
            >
              Home
            </span>
            <span
              className="mx-2 my-1 px-6 py-3 text-base font-semibold rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-sm"
              onClick={() => { setMobileOpen(false); scrollToSection('sweet'); }}
            >
              Menu
            </span>
            <span
              className="mx-2 my-1 px-6 py-3 text-base font-semibold rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-sm"
              onClick={() => { setMobileOpen(false); scrollToSection('ourstory'); }}
            >
              Our Story
            </span>
            <span
              className="mx-2 my-1 px-6 py-3 text-base font-semibold rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-sm"
              onClick={() => { setMobileOpen(false); scrollToSection('gallery'); }}
            >
              Gallery
            </span>
            <span
              className="mx-2 my-1 px-6 py-3 text-base font-semibold rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-sm"
              onClick={() => { setMobileOpen(false); navigate('/contact'); }}
            >
              Contact
            </span>
          </div>
        </div>
      </div>
      
      {/* Mobile dropdown animation */}
      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-16px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.4s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </header>
  );
}

export default Header;