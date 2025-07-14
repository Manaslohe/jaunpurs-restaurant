import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/montserrat/700.css'; // Import Montserrat Bold

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // For toast message

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const formBody = Object.keys(form)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(form[key]))
        .join('&');
      await fetch('https://script.google.com/macros/s/AKfycbw2O3OMWYIrfe3MXCi7_KdZ4fqGPaNYLmAwD1vPH3j_WJjEwRSo2h37wp9DkPHBgtI/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      });
    } catch (err) {
      // ignore errors, always show toast
    }
    setForm({ name: '', phone: '', email: '', message: '' });
    setToast('Submitted successfully!');
    setTimeout(() => setToast(null), 3000);
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col font-inter"
      style={{
        backgroundImage: "url('/contact.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50 transition">
          {toast}
        </div>
      )}
      {/* Back Button */}
      <div className="pt-4 pl-4">
        <button
          className="focus:outline-none transition-transform hover:scale-105"
          onClick={() => navigate('/')}
        >
          <img
            src="/back.png"
            alt="Back"
            className="w-14 h-6 opacity-90 hover:opacity-100 transition"
          />
        </button>
      </div>
      {/* Heading */}
      <div className="flex flex-col items-center mt-2 mb-2">
        <div
          className="text-white text-[9vw] md:text-6xl font-bold text-center"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Contact & Enquiry
        </div>
        <div className="text-white/60 text-[3vw] md:text-lg font-normal text-center mt-1">
          Need assistance or more info? Reach out we're just a call away!
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-10 px-4 md:px-16 py-4 w-full">
        {/* Left: Contact & Location */}
        <div className="flex flex-col gap-6 w-full md:w-[40%] mt-2">
          <div>
            <div className="bg-gradient-to-r from-[#E78D3F] to-transparent pl-2 pr-24 py-1  w-fit mb-1">
              <span className="text-white text-3xl font-semibold tracking-wide">Contact</span>
            </div>
            <div className="text-white text-xl pt-4 font-medium pl-2">8767092368</div>
            <div
              className="my-3 w-full h-[2px]"
              style={{
                background: 'linear-gradient(to right, #fff, transparent)'
              }}
            />
          </div>
          <div>
            <div className="bg-gradient-to-r from-[#E78D3F] to-transparent pl-2 pr-24 py-1  w-fit mb-1">
              <span className="text-white text-3xl font-semibold tracking-wide">Location</span>
            </div>
            <a
              href="https://www.google.com/maps/place/Jaunpurs+sweets+and+Restaurant/@21.1048111,79.1022346,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd4bfcf8daf771d:0x11eb96909c8212fc!8m2!3d21.1048111!4d79.1022346!16s%2Fg%2F11vhzv1t3n?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white text-base pt-4 font-normal pl-2 leading-6 hover:underline cursor-pointer"
            >
              Manewada Square,<br />
              Ring Road, Nagpur<br />
              440027, Maharashtra,<br />
              India
            </a>
            <div
              className="my-3 w-full h-[2px]"
              style={{
                background: 'linear-gradient(to right, #fff, transparent)'
              }}
            />
          </div>
          <div className="w-full">
            <div className="bg-white rounded-2xl flex items-center justify-center h-32 md:h-36 w-full overflow-hidden">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Jaunpurs+sweets+and+Restaurant,+Manewada+Square,+Ring+Road,+Nagpur,+Maharashtra,+India&output=embed"
                className="w-full h-full rounded-2xl"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        {/* Right: Enquiry Box */}
        <div className="w-full md:w-[45%] bg-[#E78D3F] rounded-2xl px-4 md:px-8 py-8 flex flex-col items-center shadow-lg mt-2">
          <div className="text-white text-3xl font-semibold mb-4 md:mb-10 text-center">Enquiry Box</div>
          <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="rounded-full px-5 py-2 bg-white/60 border-2 border-white text-gray-800 placeholder-gray-500 outline-none"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="rounded-full px-5 py-2 bg-white/60 border-2 border-white text-gray-800 placeholder-gray-500 outline-none"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rounded-full px-5 py-2 bg-white/60 border-2 border-white text-gray-800 placeholder-gray-500 outline-none"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Type your message here..."
              className="rounded-xl px-5 py-3 bg-white/60 border-2 border-white text-gray-800 placeholder-gray-700 outline-none min-h-[80px] max-h-32"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="mt-2 bg-black text-white font-semibold rounded-full py-2 text-lg px-10 hover:bg-gray-900 transition self-center"
              style={{ minWidth: 120 }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;