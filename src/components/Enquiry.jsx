import React, { useState, useEffect } from 'react';

// Fix: Use import.meta.env for Vite, fallback to localhost if not set.
// Remove all usage of process.env in browser code.
const API_URL =
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.REACT_APP_API_URL
    ? import.meta.env.REACT_APP_API_URL
    : 'https://jaunpurs-be.vercel.app';

function EnquiryPopup({ asForm = false }) {
  // Show popup only once per browser session
  const [open, setOpen] = useState(() => {
    if (asForm) return true;
    return !window.sessionStorage.getItem('enquiry_popup_shown');
  });
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Prevent background scroll when popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Animation state for popup
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (open) {
      setTimeout(() => setAnimate(true), 10); // trigger animation after mount
    } else {
      setAnimate(false);
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(
        `${API_URL}/api/enquiry`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      let data = {};
      // Only parse JSON if response has content
      const text = await res.text();
      if (text) {
        data = JSON.parse(text);
      }
      if (res.ok) {
        setSuccess('Thank you! Your enquiry has been submitted.');
        setForm({ name: '', phone: '', message: '' });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setOpen(false);
        }, 1200); // Hide toast and close popup after 1.2s
      } else {
        setError((data && data.error) || 'Submission failed.');
      }
    } catch (err) {
      setError('Network error.');
      // Log error for debugging
      console.error('Enquiry form network error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && !asForm) {
      window.sessionStorage.setItem('enquiry_popup_shown', '1');
    }
  }, [open, asForm]);

  // Only show popup if not embedded as form
  if (!asForm && !open) return null;

  return (
    <>
      {/* Toast for success message */}
      {showToast && (
        <div className={`fixed ${asForm ? 'top-6 left-1/2 -translate-x-1/2' : 'top-6 right-6'} z-[200] bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in`}>
          {success}
        </div>
      )}
      <div className={
        asForm
          ? "w-full flex flex-col items-center"
          : "fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-500"
      }>
        <div
          className={`relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl ${asForm ? 'w-full max-w-lg px-7 py-10' : 'w-[92vw] max-w-md md:max-w-lg px-7 py-10'} flex flex-col items-center font-inter border border-orange-100
            ${asForm ? '' : (animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90')}
            transition-all duration-700 ease-out`}
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          }}
        >
          {/* Close button (only for popup) */}
          {!asForm && (
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 text-2xl font-bold bg-white/60 rounded-full w-10 h-10 flex items-center justify-center shadow transition"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
          )}
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-orange-500 mb-2 font-montserrat text-center drop-shadow">
            Quick Enquiry
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-6 text-center font-medium">
            Let us know your query or message.<br />We'll get back to you soon!
          </p>
          {/* Form */}
          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-semibold text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className="border-none rounded-xl px-4 py-3 text-base bg-white/70 shadow focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                autoComplete="name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-sm font-semibold text-gray-600 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Mobile Number"
                required
                pattern="[0-9]{10,}"
                value={form.phone}
                onChange={handleChange}
                className="border-none rounded-xl px-4 py-3 text-base bg-white/70 shadow focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                autoComplete="tel"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-sm font-semibold text-gray-600 mb-1">Enquiry / Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Type your enquiry or message..."
                required
                rows={3}
                value={form.message}
                onChange={handleChange}
                className="border-none rounded-xl px-4 py-3 text-base bg-white/70 shadow focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-orange-400 to-orange-500  hover:from-orange-400 hover:to-orange-400 duration-500 text-white font-bold rounded-full px-6 py-3 shadow-lg transition text-base mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit'}
            </button>
          </form>
          {/* Feedback */}
          {error && <div className="mt-4 text-red-500 text-center font-semibold">{error}</div>}
        </div>
      </div>
    </>
  );
}

export default EnquiryPopup;
