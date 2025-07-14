import React, { useState, useRef, useEffect } from 'react';

const testimonials = [
  {
    text: "I loved the place. Cant wait to visit again each and every sweets are delicious. I suggest if you love mithai like me visit Jaunpurs Sweet I am sure you didn't regrate.",
    name: "Sunil Ranpariya",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  {
    text: "Taste and texture of the sweet is very good, unlike other sweets. Tastes perfectly sweet and leaves a delightful aftertaste that lingers.",
    name: "Atharva Kadode",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    stars: 5,
  },
  {
    text: "Jaunpur's Resto serves food that's full of flavor and heart. Every bite feels homemade, yet elevated — perfectly spiced, well-balanced, and truly comforting.",
    name: "Om Pawar",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    stars: 5,
  },
  {
    text: "Dining at Jaunpur's Resto is a treat — the flavors are bold, the ingredients fresh, and each dish reflects authentic culinary care. A truly satisfying experience every time.",
    name: "Smita Shende",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 5,
  },
  {
    text: "Absolutely loved the sweets here! The staff is friendly and the ambiance is welcoming. Highly recommended for anyone with a sweet tooth.",
    name: "Priya Sharma",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
  },
  {
    text: "The thali was delicious and the desserts were out of this world. Will definitely bring my family next time!",
    name: "Ravi Verma",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    stars: 5,
  },
  {
    text: "A wonderful experience! The sweets are fresh and the restaurant is always clean. Service is quick and courteous.",
    name: "Anjali Patel",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    stars: 5,
  },
  {
    text: "Best place in town for authentic Indian sweets. The flavors remind me of home. Five stars!",
    name: "Deepak Singh",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    stars: 5,
  },
  {
    text: "Every visit to Jaunpurs Sweets and Restaurant is a delight. The variety and taste are unmatched. Keep up the great work!",
    name: "Meena Joshi",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    stars: 5,
  },
];

const Testimonials = () => {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Auto-scroll animation
  useEffect(() => {
    if (!isDragging && isAnimating) {
      const animate = () => {
        setTranslateX(prev => prev - 2); // Increased speed from -0.5 to -2
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, isAnimating]);

  const handleStart = (clientX) => {
    setIsDragging(true);
    setIsAnimating(false);
    setStartX(clientX);
    setCurrentTranslate(translateX);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setTranslateX(currentTranslate + deltaX);
  };

  const handleEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 500);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Global mouse events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, currentTranslate]);

  return (
    <div
      className="w-full min-h-[auto] md:min-h-[100vh] flex flex-col justify-center py-8 md:py-12"
      style={{
        backgroundImage: "url('/Testimonial/bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center mb-2">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Customers Say</h2>
        <div className="text-xl text-purple-700 font-medium mb-8">Real Feedback From Real Customers</div>
      </div>
      
      {/* Carousel */}
      <div className="mb-6 overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 w-full cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Duplicate testimonials for infinite scroll effect */}
          {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[90vw] sm:w-[350px] md:w-[320px] lg:w-[300px] bg-white border-2 border-purple-400 rounded-2xl p-6 flex flex-col justify-between shadow-md mx-2"
            >
              <div className="mb-6 text-gray-800 text-base">{t.text}</div>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500 italic">{t.role}</div>
                </div>
                <div className="ml-auto flex items-center">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-orange-400 text-lg">&#9733;</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Review Button outside the cards */}
      <div className="w-full flex justify-center mb-6">
        <a
          href="https://www.google.com/search?client=mobilesearchapp&sca_esv=a3e392cc0b6211b6&channel=iss&cs=1&hl=en_GB&rlz=1MDAPLA_en-GB__1122__1123&v=374.0.773146746&sxsrf=AE3TifNKTpS-LVY5AEdKsTAkkInL5VB8jw:1752471021920&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EwQNNh3kLC0Z21JhPBb8gF__ledPAqr9Cf-UFePEIeMp1rFDS5QLj9yWY_bsxsAD1V97Y8TjJYEpxlTURBjcXdB0NIeSWggmQGYfZg2Gd6z-ndsUXg%3D%3D&q=Jaunpurs+sweets+and+Restaurant+Reviews&sa=X&ved=2ahUKEwj5mvalz7uOAxX1ZvUHHeXoJVYQ0bkNegQIQhAD&biw=1699&bih=804&dpr=1.5"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl text-base"
        >
          More Review
        </a>
      </div>
      
      {/* Line below carousel */}
      <div className="w-full flex justify-center">
        <div className="h-2 w-40 rounded-full bg-gradient-to-r from-orange-400 via-purple-400 to-orange-400"></div>
      </div>
      
      <style>
        {`
          @media (min-width: 1024px) {
            .flex-shrink-0 {
              width: 300px !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .flex-shrink-0 {
              width: 320px !important;
            }
          }
          @media (max-width: 767px) {
            .flex-shrink-0 {
              width: 90vw !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Testimonials;