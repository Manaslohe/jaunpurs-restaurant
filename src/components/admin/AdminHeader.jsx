import React, { useState, useRef, useEffect } from 'react';

// Match sidebar theme
const HEADER_BG = 'bg-white';
const HEADER_BORDER = 'border-b border-gray-200';
const BRAND_COLOR = '#B32AAC';
const ORANGE_COLOR = '#E78D3F';

const AdminHeader = ({ username = 'manas', onLogout, onOpenSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userInitial = username?.[0]?.toUpperCase() || 'A';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header
      className={`flex flex-row items-center justify-between gap-2 px-4 md:px-6 py-4 ${HEADER_BG} ${HEADER_BORDER} top-0 z-20`}
      style={{ boxShadow: 'none' }}
    >
      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#B32AAC] text-white font-bold text-xl shadow-sm border-2 border-[#B32AAC] hover:scale-105 transition"
        onClick={onOpenSidebar}
        aria-label="Open sidebar"
        type="button"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="7" x2="19" y2="7" strokeLinecap="round" />
          <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
          <line x1="5" y1="17" x2="19" y2="17" strokeLinecap="round" />
        </svg>
      </button>
      {/* Brand */}
      <div
        className="font-bold text-lg md:text-xl flex-1 text-center md:text-left"
        style={{ fontFamily: 'Krona One, sans-serif', color: BRAND_COLOR, letterSpacing: '1px' }}
      >
        Admin Portal
      </div>
      {/* User avatar and dropdown */}
      <div className="relative flex items-center gap-2 md:gap-4" ref={dropdownRef}>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#B32AAC] text-white font-bold text-lg shadow-sm border-2 border-[#B32AAC] hover:scale-105 transition"
          onClick={() => setDropdownOpen((v) => !v)}
          aria-label="User menu"
          type="button"
        >
          {userInitial}
        </button>
        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-12 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#B32AAC] z-30 animate-fade-in">
            <button
              className="w-full flex items-center gap-2 px-4 py-3 text-[#B32AAC] hover:bg-[#FBE6B7] rounded-xl font-semibold transition text-left"
              style={{ fontFamily: 'Krona One, sans-serif' }}
              onClick={() => {
                setDropdownOpen(false);
                if (typeof onLogout === 'function') onLogout();
              }}
            >
              <svg width="18" height="18" fill="none" stroke={BRAND_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                <path d="M9 1v16M1 9h16" />
              </svg>
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
