import React, { useState } from 'react';
import { FiCopy, FiArrowLeft, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

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

const FeedbackForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    overallExperience: '',
    whatDidYouTry: [],
    comments: '',
    foodQuality: '',
    serviceStaff: '',
    whatsappUpdates: '',
    whatsappNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const totalSteps = 6;

  // Animation for step transitions
  const [stepAnim, setStepAnim] = useState('fade-in');
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setStepAnim('fade-out');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setStepAnim('fade-in');
      }, 200);
    }
  };
  const handlePrev = () => {
    if (currentStep > 1) {
      setStepAnim('fade-out');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setStepAnim('fade-in');
      }, 200);
    }
  };

  // Fix for process.env in frontend (Vite/CRA only injects at build time)
  const API_URL =
    typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL
      ? process.env.REACT_APP_API_URL
      : import.meta.env.VITE_REACT_APP_API_URL || window.REACT_APP_API_URL || "https://jaunpurs-be.vercel.app";

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitError('');
    setSubmitSuccess('');
    try {
      const response = await fetch(
        `${API_URL}/api/feedback`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );
      if (!response.ok) {
        let errorMsg = 'Failed to submit feedback';
        try {
          const errorData = await response.json();
          if (errorData && errorData.error) errorMsg = errorData.error;
          if (errorData && errorData.message) errorMsg = errorData.message;
        } catch (parseErr) {}
        setSubmitError(errorMsg);
        console.error('Feedback submission error:', errorMsg);
        return;
      }
      setSubmitSuccess('Thank you for your feedback!');
      setFormData({
        overallExperience: '',
        whatDidYouTry: [],
        comments: '',
        foodQuality: '',
        serviceStaff: '',
        whatsappUpdates: '',
        whatsappNumber: ''
      });
      setCurrentStep(1);
    } catch (err) {
      setSubmitError('Could not submit feedback. Please try again. (Network error)');
      console.error('Feedback submission exception:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (value) => {
    const newTried = formData.whatDidYouTry.includes(value)
      ? formData.whatDidYouTry.filter(item => item !== value)
      : [...formData.whatDidYouTry, value];
    setFormData({...formData, whatDidYouTry: newTried});
  };

  // Custom checkbox/radio styles
  const customInput =
    "appearance-none w-5 h-5 border-2 border-white/60 rounded-lg checked:bg-gradient-to-br checked:from-orange-400 checked:to-orange-500 checked:border-orange-500 transition-all duration-200 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm";
  const customRadio =
    "appearance-none w-5 h-5 border-2 border-white/60 rounded-full checked:bg-gradient-to-br checked:from-orange-400 checked:to-orange-500 checked:border-orange-500 transition-all duration-200 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm";

  const answerBox =
    "bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200 p-4 shadow-sm hover:border-orange-400";

  const navBtnBase =
    "flex items-center gap-2 px-7 py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg text-lg";
  const navBtnNext =
    "bg-[#E78D3F] hover:bg-orange-500 duration-500  hover:scale-105 text-white";
  const navBtnPrev =
    "bg-gradient-to-r from-white/20 to-white/10 hover:from-orange-100/20 hover:to-orange-100/10 text-white hover:scale-105";
  const navBtnSubmit =
    "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-500 text-white hover:scale-105 duration-400";

  // Validation for each step
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!formData.overallExperience;
      case 2:
        return formData.whatDidYouTry.length > 0;
      case 3:
        return true;
      case 4:
        return !!formData.foodQuality;
      case 5:
        return !!formData.serviceStaff;
      case 6:
        if (formData.whatsappUpdates === "Yes") {
          // Require 10 digit valid number
          return /^\d{10}$/.test(formData.whatsappNumber.trim());
        }
        return !!formData.whatsappUpdates;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⭐</span>
              <h3 className="text-white text-2xl font-bold">How was your overall experience?</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Excellent', 'Good', 'Average', 'Poor'].map(option => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group bg-white/5 rounded-xl px-4 py-2 hover:bg-orange-100/10 transition-all duration-200 shadow-sm">
                  <input
                    type="radio"
                    name="overallExperience"
                    value={option}
                    checked={formData.overallExperience === option}
                    onChange={(e) => setFormData({...formData, overallExperience: e.target.value})}
                    className={customRadio}
                  />
                  <span className="text-white text-lg group-hover:text-orange-300 transition-colors font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📋</span>
              <h3 className="text-white text-2xl font-bold">What did you try with us today?</h3>
            </div>
            <p className="text-white/70 text-sm mb-2">(You can select more than one)</p>
            <div className="flex flex-wrap gap-4">
              {['Dine-in', 'Takeaway', 'Sweets / Namkeen', 'Dairy Products', 'Party'].map(option => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group bg-white/5 rounded-xl px-4 py-2 hover:bg-orange-100/10 transition-all duration-200 shadow-sm">
                  <input
                    type="checkbox"
                    checked={formData.whatDidYouTry.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className={customInput}
                  />
                  <span className="text-white text-lg group-hover:text-orange-300 transition-colors font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💬</span>
              <h3 className="text-white text-2xl font-bold">Any comments or suggestions?</h3>
            </div>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              placeholder="Text Box (max 300 characters)"
              maxLength={300}
              className={answerBox + " w-full h-32 resize-none"}
            />
            <div className="text-right">
              <span className="text-white/60 text-sm">{formData.comments.length}/300</span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👨‍🍳</span>
              <h3 className="text-white text-2xl font-bold">How was the food quality?</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Loved it', 'Good', 'Could be better'].map(option => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group bg-white/5 rounded-xl px-4 py-2 hover:bg-orange-100/10 transition-all duration-200 shadow-sm">
                  <input
                    type="radio"
                    name="foodQuality"
                    value={option}
                    checked={formData.foodQuality === option}
                    onChange={(e) => setFormData({...formData, foodQuality: e.target.value})}
                    className={customRadio}
                  />
                  <span className="text-white text-lg group-hover:text-orange-300 transition-colors font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💁</span>
              <h3 className="text-white text-2xl font-bold">How was the service & staff behavior?</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Excellent', 'Satisfactory', 'Needs Improvement'].map(option => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group bg-white/5 rounded-xl px-4 py-2 hover:bg-orange-100/10 transition-all duration-200 shadow-sm">
                  <input
                    type="radio"
                    name="serviceStaff"
                    value={option}
                    checked={formData.serviceStaff === option}
                    onChange={(e) => setFormData({...formData, serviceStaff: e.target.value})}
                    className={customRadio}
                  />
                  <span className="text-white text-lg group-hover:text-orange-300 transition-colors font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📱</span>
              <h3 className="text-white text-2xl font-bold">Would you like to get updates and offers on WhatsApp?</h3>
            </div>
            <div className="flex gap-4 mb-6">
              {['Yes', 'No'].map(option => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group bg-white/5 rounded-xl px-4 py-2 hover:bg-orange-100/10 transition-all duration-200 shadow-sm">
                  <input
                    type="radio"
                    name="whatsappUpdates"
                    value={option}
                    checked={formData.whatsappUpdates === option}
                    onChange={(e) => setFormData({...formData, whatsappUpdates: e.target.value, whatsappNumber: ""})}
                    className={customRadio}
                  />
                  <span className="text-white text-lg group-hover:text-orange-300 transition-colors font-medium">{option}</span>
                </label>
              ))}
            </div>
            {formData.whatsappUpdates === 'Yes' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📱</span>
                  <label className="text-white text-lg font-medium">Your WhatsApp Number <span className="text-orange-400">*</span></label>
                </div>
                <input
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => {
                    // Only allow numbers
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData({...formData, whatsappNumber: val});
                  }}
                  placeholder="Enter 10 digit WhatsApp number"
                  className={answerBox + " w-full"}
                  maxLength={10}
                  pattern="\d{10}"
                  inputMode="numeric"
                />
                {formData.whatsappNumber && !/^\d{10}$/.test(formData.whatsappNumber.trim()) && (
                  <div className="text-orange-400 text-sm mt-1">Please enter a valid 10 digit number.</div>
                )}
                {!formData.whatsappNumber.trim() && (
                  <div className="text-orange-400 text-sm mt-1">WhatsApp number is required.</div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full transition-all duration-300"
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
          border: '1px solid rgba(255,255,255,0.18)'
        }}
      >
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#E78D3F] to-transparent pl-3 pr-24 py-2 w-fit mb-2 rounded-lg shadow-sm">
            <span className="text-white text-2xl font-semibold tracking-wide drop-shadow">We'd Love Your Feedback!</span>
          </div>
          <p className="text-white/70 text-base pl-3">Help us serve you better – your opinion matters!</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-sm">Step {currentStep} of {totalSteps}</span>
            <span className="text-white/70 text-sm">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#E78D3F] to-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content with animation */}
        <div className={`min-h-[300px] transition-all duration-200 ${stepAnim === 'fade-in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {renderStep()}
          {submitError && (
            <div className="text-red-400 text-sm mt-4">{submitError}</div>
          )}
          {submitSuccess && (
            <div className="text-green-400 text-sm mt-4">{submitSuccess}</div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20 gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1 || loading}
            className={`${navBtnBase} ${currentStep === 1 ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed' : navBtnPrev} w-full sm:w-auto`}
            style={{ minWidth: '110px' }}
          >
            <FiChevronLeft size={22} />
            <span className="sm:inline hidden">Previous</span>
            <span className="sm:hidden block text-sm">Prev</span>
          </button>
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className={`${navBtnBase} ${navBtnNext} ${!isStepValid() || loading ? 'opacity-60 cursor-not-allowed' : ''} w-full sm:w-auto`}
              style={{ transition: 'background 0.2s, color 0.2s', minWidth: '110px' }}
            >
              <span className="sm:inline hidden">Next</span>
              <span className="sm:hidden block text-sm">Next</span>
              <FiChevronRight size={22} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || loading}
              className={`${navBtnBase} ${navBtnSubmit} ${!isStepValid() || loading ? 'opacity-60 cursor-not-allowed' : ''} w-full sm:w-auto text-base sm:text-lg`}
              style={{ transition: 'background 0.2s, color 0.2s', minWidth: '110px' }}
            >
              {loading ? 'Submitting...' : (
                <>
                  <span className="sm:inline hidden">✓ Submit Feedback</span>
                  <span className="sm:hidden block text-sm">✓ Submit</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
      {/* Step transition animation styles */}
      <style>{`
        .fade-in { opacity: 1; transform: translateY(0); }
        .fade-out { opacity: 0; transform: translateY(16px); }
      `}</style>
    </div>
  );
};

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const contactNumber = "8767092368";

  const handleCopy = () => {
    navigator.clipboard.writeText(contactNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleBack = () => {
    // Navigate back functionality would go here
    console.log('Navigate back');
  };

  return (
    <div
      className="min-h-screen h-screen w-full flex flex-col font-inter overflow-y-auto"
      style={{
        backgroundImage: "url('/contact.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Back Button */}
      <div className="pt-4 pl-4">
        <button
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 md:px-6 md:py-2 shadow transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95"
          onClick={handleBack}
          aria-label="Go back"
        >
          <FiArrowLeft size={24} className="md:size-6 size-5" />
          <span className="hidden md:inline text-base md:text-lg font-semibold">Back</span>
        </button>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center mt-2 mb-2">
        <div
          className="text-white text-[9vw] md:text-6xl font-bold text-center drop-shadow-lg"
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
            <div className="bg-gradient-to-r from-[#E78D3F] to-transparent pl-2 pr-24 py-1 w-fit mb-1 rounded-lg shadow-sm">
              <span className="text-white text-3xl font-semibold tracking-wide">Contact</span>
            </div>
            <div className="flex items-center gap-2 text-white text-xl pt-4 font-medium pl-2">
              {contactNumber}
              <button
                onClick={handleCopy}
                className="ml-2 text-white hover:text-orange-400 transition p-1 rounded-full bg-white/10 hover:bg-orange-100/10 shadow"
                title="Copy to clipboard"
                aria-label="Copy contact number"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <FiCopy size={22} />
              </button>
              {copied && (
                <span className="ml-2 text-green-300 text-sm font-semibold animate-pulse">Copied!</span>
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
            <div className="bg-gradient-to-r from-[#E78D3F] to-transparent pl-2 pr-24 py-1 w-fit mb-1 rounded-lg shadow-sm">
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
            <div className="bg-white rounded-2xl flex items-center justify-center h-32 md:h-56 w-full overflow-hidden shadow-lg">
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

        {/* Right: Feedback Form */}
        <div className="w-full md:w-[45%] flex flex-col items-center">
          <div className="w-full">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;