import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Toast from './Toast';

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
    name: '',
    mobile: '',
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
  const [showToast, setShowToast] = useState(false);

  const totalSteps = 7;

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
      // Ensure name and mobile are sent in the payload
      const payload = {
        ...formData,
        name: formData.name ? formData.name.trim() : '',
        mobile: formData.mobile ? formData.mobile.trim() : ''
      };
      const response = await fetch(
        `${API_URL}/api/feedback`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
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
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000); // Show thank you popup for 5 seconds
      setFormData({
        name: '',
        mobile: '',
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
        // Name and mobile required
        return (
          !!formData.name.trim() &&
          /^\d{10}$/.test(formData.mobile.trim())
        );
      case 2:
        return !!formData.overallExperience;
      case 3:
        return formData.whatDidYouTry.length > 0;
      case 4:
        return true;
      case 5:
        return !!formData.foodQuality;
      case 6:
        return !!formData.serviceStaff;
      case 7:
        if (formData.whatsappUpdates === "Yes") {
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
            <div>
              <label className="text-white text-base font-medium mb-1 block">
                Name <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className={answerBox + " w-full"}
                maxLength={50}
                required
              />
              {!formData.name.trim() && (
                <div className="text-orange-400 text-sm mt-1">Name is required.</div>
              )}
            </div>
            <div>
              <label className="text-white text-base font-medium mb-1 block">
                Mobile Number <span className="text-orange-400">*</span>
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, mobile: val });
                }}
                placeholder="Enter 10 digit mobile number"
                className={answerBox + " w-full"}
                maxLength={10}
                pattern="\d{10}"
                inputMode="numeric"
                required
              />
              {formData.mobile && !/^\d{10}$/.test(formData.mobile.trim()) && (
                <div className="text-orange-400 text-sm mt-1">Please enter a valid 10 digit number.</div>
              )}
              {!formData.mobile.trim() && (
                <div className="text-orange-400 text-sm mt-1">Mobile number is required.</div>
              )}
            </div>
          </div>
        );
      case 2:
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
            {!formData.overallExperience && (
              <div className="text-orange-400 text-sm mt-1">Please select your experience.</div>
            )}
          </div>
        );
      
      case 3:
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

      case 4:
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

      case 5:
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

      case 6:
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

      case 7:
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
    <div className="relative flex bg-[#581054] justify-center items-center min-h-[100vh] w-full flex-col">
      {/* Thank you popup overlay */}
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-gradient-to-br from-green-500 to-green-400 rounded-3xl shadow-2xl px-8 py-10 max-w-[90vw] w-[350px] flex flex-col items-center animate-thankyou-popup relative">
            <svg className="w-16 h-16 mb-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.18" strokeWidth="2.5" fill="none"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 13l3 3 7-7" stroke="white" strokeWidth="2.5"/>
            </svg>
            <div className="text-white text-3xl font-extrabold mb-2 text-center drop-shadow">Thank You!</div>
            <div className="text-white/90 text-lg font-medium text-center mb-2">
              We truly value your feedback.<br />
              Your response helps us serve you better.
            </div>
            <div className="text-white/80 text-base text-center mt-2">
              If you have more to share, feel free to fill the form again.<br />
              <span className="text-white/60">Have a wonderful day!</span>
            </div>
          </div>
          <style>{`
            @keyframes thankyou-popup {
              0% { opacity: 0; transform: scale(0.92);}
              60% { opacity: 1; transform: scale(1.04);}
              100% { opacity: 1; transform: scale(1);}
            }
            .animate-thankyou-popup {
              animation: thankyou-popup 0.7s cubic-bezier(.22,1,.36,1);
            }
          `}</style>
        </div>
      )}
      {/* Logo for mobile view (outside form body) */}
      <div className="flex justify-center mb-4 md:hidden w-full">
        <img
          src="/logow.png"
          alt="Logo"
          className="h-24 w-auto"
          style={{ maxHeight: 100 }}
        />
      </div>
      <div
        className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 px-3 py-5 xs:px-4 xs:py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 w-full max-w-[98vw] xs:max-w-[95vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[520px] transition-all duration-300 mx-auto"
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
          border: '1px solid rgba(255,255,255,0.18)'
        }}
      >
        <div className="mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-[#E78D3F] to-transparent pl-2 pr-10 py-2 w-fit mb-2 rounded-lg shadow-sm">
            <span className="text-white text-xl xs:text-2xl md:text-2xl font-semibold tracking-wide drop-shadow">We'd Love Your Feedback!</span>
          </div>
          <p className="text-white/70 text-sm xs:text-base pl-2">Help us serve you better – your opinion matters!</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-xs xs:text-sm">Step {currentStep} of {totalSteps}</span>
            <span className="text-white/70 text-xs xs:text-sm">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#E78D3F] to-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content with animation */}
        <div className={`min-h-[220px] xs:min-h-[260px] sm:min-h-[300px] transition-all duration-200 ${stepAnim === 'fade-in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {!showToast && (
            <>
              {renderStep()}
              {submitError && (
                <div className="text-red-400 text-xs xs:text-sm mt-4">{submitError}</div>
              )}
            </>
          )}
        </div>
        {/* Navigation Buttons */}
        <div className="flex flex-row justify-between items-center mt-6 md:mt-8 pt-4 border-t border-white/20 gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1 || loading}
            className={`${navBtnBase} ${currentStep === 1 ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed' : navBtnPrev} min-w-[120px] px-5`}
            style={{}}
          >
            <FiChevronLeft size={20} className="inline-block" />
            <span className="inline">Previous</span>
          </button>
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className={`${navBtnBase} ${navBtnNext} ${!isStepValid() || loading ? 'opacity-60 cursor-not-allowed' : ''} min-w-[120px] px-5`}
              style={{ transition: 'background 0.2s, color 0.2s' }}
            >
              <span className="inline">Next</span>
              <FiChevronRight size={20} className="inline-block" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || loading}
              className={`${navBtnBase} ${navBtnSubmit} ${!isStepValid() || loading ? 'opacity-60 cursor-not-allowed' : ''} min-w-[120px] px-5 text-base xs:text-lg`}
              style={{ transition: 'background 0.2s, color 0.2s' }}
            >
              {loading ? 'Submitting...' : (
                <>
                  <span className="inline">✓ Submit</span>
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

export default FeedbackForm;