import React from 'react';

const Toast = ({ message, show }) => {
  return (
    <div
      className={`fixed top-6 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
      }`}
      style={{ minWidth: 220, maxWidth: 320 }}
    >
      <div className="flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold text-base border border-green-300/40 animate-toast-pop">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>{message}</span>
      </div>
      <style>{`
        @keyframes toast-pop {
          0% { transform: scale(0.95); opacity: 0; }
          60% { transform: scale(1.03); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-toast-pop {
          animation: toast-pop 0.6s cubic-bezier(.22,1,.36,1);
        }
      `}</style>
    </div>
  );
};

export default Toast;
