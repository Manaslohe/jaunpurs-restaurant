import React, { useRef, useState, useEffect } from 'react';
import Hero from './Hero';
import Story from './Story';
import Categories from './Categories';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Footer from './Footer';

function LandingPage() {
  const categoriesRef = useRef();
  const [scrolled, setScrolled] = useState(false);

  // Handler to scroll to category section
  const handleCategoryClick = (sectionId) => {
    if (categoriesRef.current && categoriesRef.current.scrollToCategory) {
      categoriesRef.current.scrollToCategory(sectionId);
    }
  };

  // Scroll to Story section
  const scrollToStory = () => {
    const el = document.getElementById('ourstory');
    if (el) {
      const targetY = el.getBoundingClientRect().top + window.pageYOffset;
      const startY = window.pageYOffset;
      const diff = targetY - startY;
      let start;
      function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / 1200, 1);
        window.scrollTo(0, startY + diff * (percent < 0.5 ? 2 * percent * percent : -1 + (4 - 2 * percent) * percent));
        if (percent < 1) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    const startY = window.pageYOffset;
    let start;
    function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / 1200, 1);
      window.scrollTo(0, startY * (1 - (percent < 0.5 ? 2 * percent * percent : -1 + (4 - 2 * percent) * percent)));
      if (percent < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  };

  // Listen for scroll to toggle button state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Left vertical sidebar for all except Footer */}
      <div
        className="hidden md:flex fixed top-0 left-0 h-full flex-col items-center justify-between"
        style={{
          zIndex: 40,
          width: '4vw',
          minWidth: '60px',
          background: '#5b1857',
          pointerEvents: 'auto',
        }}
      >
        {/* Social Icons */}
        <SocialIconsFade scrolled={scrolled} />
        {/* SCROLL/BACK TO TOP button at bottom */}
        <div className="flex flex-col items-center mb-8 mt-auto">
          <button
            onClick={scrolled ? scrollToTop : scrollToStory}
            style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer', padding: 0 }}
            aria-label={scrolled ? 'Back to Top' : 'Scroll to Story'}
          >
            <span className="text-white text-[1rem] tracking-widest" style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.2em'}}>
              {scrolled ? 'BACK TO TOP' : 'SCROLL'}
            </span>
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="mt-2" style={{transform: scrolled ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s'}}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1 md:ml-[4vw] ml-0">
        <Hero onCategoryClick={handleCategoryClick} />
        {/* Background image wraps Story and Categories */}
        <div
          style={{
            backgroundImage: "url('/Story/bg.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <Story />
          <Categories ref={categoriesRef} />
        </div>
        <Gallery />
        <Testimonials />
      </div>
      {/* Footer without sidebar */}
      <div className="relative z-50 ml-0">
        <Footer />
      </div>
    </div>
  );
}

// Add this component at the bottom of the file (before export default LandingPage)
function SocialIconsFade({ scrolled }) {
  const [visible, setVisible] = useState(true);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    if (scrolled) {
      setVisible(false);
      const timeout = setTimeout(() => setDisplay(false), 500); // match transition duration
      return () => clearTimeout(timeout);
    } else {
      setDisplay(true);
      // next tick to allow display to be true before fading in
      setTimeout(() => setVisible(true), 10);
    }
  }, [scrolled]);

  if (!display) return null;

  return (
    <div
      className="flex flex-col gap-7 mt-50 items-center"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <a href="https://instagram.com" target="https://www.instagram.com/jaunpurs_?igsh=ZWZhNDhmcTVnaHMz" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition" style={{fontSize: '2rem'}} aria-label="Instagram">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
      </a>
      <a href="https://facebook.com" target="https://www.facebook.com/share/1C9PS4CNHb/?mibextid=wwXIfr" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition" style={{fontSize: '2rem'}} aria-label="Facebook">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition" style={{fontSize: '2rem'}} aria-label="X">
        <img src="/x.png" alt="X" style={{ width: 24, height: 24, objectFit: 'contain' }} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition" style={{fontSize: '2rem'}} aria-label="YouTube">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3"/><polygon points="10 9 16 12 10 15 10 9"/></svg>
      </a>
    </div>
  );
}

export default LandingPage;
