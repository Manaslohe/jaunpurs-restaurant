import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '@fontsource/montserrat/700.css';
import { motion } from 'framer-motion';
import EnquiryPopup from './components/Enquiry';
import { FiCopy } from 'react-icons/fi'; // Import copy icon
import LandingPage from './components/LandingPage';
import Contact from './components/Contact';
import Admin from './components/admin/Admin';

const headingVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] } }
};
const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] } }
};
const rightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

const Contact = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const contactNumber = "8767092368";

  const handleCopy = () => {
    navigator.clipboard.writeText(contactNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
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
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-white text-[9vw] md:text-6xl font-bold text-center"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Contact & Enquiry
        </motion.div>
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-white/60 text-[3vw] md:text-lg font-normal text-center mt-1"
        >
          Need assistance or more info? Reach out we're just a call away!
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-10 px-4 md:px-16 py-4 w-full">
        {/* Left: Contact & Location */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 w-full md:w-[40%] mt-2"
        >
          <div>
            <div className="bg-gradient-to-r from-[#E78D3F] to-transparent pl-2 pr-24 py-1  w-fit mb-1">
              <span className="text-white text-3xl font-semibold tracking-wide">Contact</span>
            </div>
            <div className="flex items-center gap-2 text-white text-xl pt-4 font-medium pl-2">
              {contactNumber}
              <button
                onClick={handleCopy}
                className="ml-2 text-white hover:text-orange-400 transition p-1 rounded-full"
                title="Copy to clipboard"
                aria-label="Copy contact number"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <FiCopy size={22} />
              </button>
              {copied && (
                <span className="ml-2 text-green-300 text-sm font-semibold animate-fade-in">Copied!</span>
              )}
            </div>
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
            <div className="bg-white rounded-2xl flex items-center justify-center h-32 md:h-56 w-full overflow-hidden">
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
        </motion.div>
        {/* Right: Enquiry Box */}
        <motion.div
          variants={rightVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-[45%] flex flex-col items-center "
        >
          <div className="w-full">
            <EnquiryPopup asForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;