import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const testimonials = [
  {
    text: "I loved the place. Cant wait to visit again each and every sweets are delicious. I suggest if you love mithai like me visit Jaunpurs Sweet I am sure you didn't regrate.",
    name: "Sunil Ranpariya",
    role: "Customer Review",
    avatar: "/Testimonial/sunil.png",
    stars: 5,
  },
  {
    text: "Taste and texture of the sweet is very good, unlike other sweets. Tastes perfectly sweet and leaves a delightful aftertaste that lingers.",
    name: "Atharva Kadode",
    role: "Customer Review",
    avatar: "/Testimonial/athvarvakhodode.png",
    stars: 5,
  },
  {
    text: "Jaunpur's Resto serves food that's full of flavor and heart. Every bite feels homemade, yet elevated — perfectly spiced, well-balanced, and truly comforting.",
    name: "Om Pawar",
    role: "Customer Review",
    avatar: "/Testimonial/om.png",
    stars: 5,
  },
  {
    text: "Dining at Jaunpur's Resto is a treat — the flavors are bold, the ingredients fresh, and each dish reflects authentic culinary care. A truly satisfying experience every time.",
    name: "Smita Shende",
    role: "Customer Review",
    avatar: "/Testimonial/samita.png",
    stars: 4.5,
  },
  {
    text: "The sweets here are really tasty and fresh. I especially loved the kaju katli! The staff was polite and the place felt cozy. Will come back for sure.",
    name: "Priya Sharma",
    role: "Customer Review",
    avatar: "/Testimonial/priya.png",
    stars: 4.5,
  },
  {
    text: "Tried the thali and a couple of desserts. The food was good, and the gulab jamun was a highlight. My kids enjoyed the meal too. Would recommend!",
    name: "Ravi Verma",
    role: "Customer Review",
    avatar: "/Testimonial/ravi.png",
    stars: 4,
  },
  {
    text: "Nice experience overall. The sweets were fresh and the restaurant was clean. Service was quick, though it was a bit crowded when I visited.",
    name: "Anjali Patel",
    role: "Customer Review",
    avatar: "/Testimonial/anjali.png",
    stars: 4,
  },
  {
    text: "If you love Indian sweets, this is a great spot. Reminded me of the flavors from my childhood. Would love to see more variety in snacks.",
    name: "Shivam Shukla",
    role: "Customer Review",
    avatar: "/Testimonial/shivam.png",
    stars: 4.5,
  },
  {
    text: "I visit Jaunpurs Sweets and Restaurant often. The taste is consistent and the staff is always welcoming. Sometimes the wait is a bit long, but it's worth it.",
    name: "Meena Joshi",
    role: "Customer Review",
    avatar: "/Testimonial/meena.png",
    stars: 4,
  },
];

const SCROLL_SPEED = 1; // Pixels per frame for smooth scrolling

const Testimonials = () => {
  const [setWidth, setSetWidth] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const testimonialsSetRef = useRef(null);

  // Measure the width of one set of testimonials
  useEffect(() => {
    const measure = () => {
      if (testimonialsSetRef.current) {
        setSetWidth(testimonialsSetRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Infinite scroll animation
  useEffect(() => {
    if (setWidth === 0) return;

    const animate = async () => {
      await controls.start({
        x: -setWidth,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: setWidth / SCROLL_SPEED / 60, // Adjusted for 60fps
            ease: 'linear',
          },
        },
      });
    };

    animate();

    return () => controls.stop();
  }, [setWidth, controls]);

  // Sync motion value with animation
  useEffect(() => {
    const unsubscribe = x.onChange((value) => {
      if (setWidth > 0) {
        // Reset x to create seamless loop
        if (value <= -setWidth) {
          x.set(value + setWidth);
        } else if (value >= 0) {
          x.set(value - setWidth);
        }
      }
    });
    return () => unsubscribe();
  }, [x, setWidth]);

  return (
    <div
      className="w-full min-h-[auto] md:min-h-[100vh] flex flex-col justify-center py-8 md:py-12"
      style={{
        backgroundImage: "url('/Testimonial/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center mb-2">
        <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-2">Customers Say</h2>
        <div className="text-xl text-purple-700 font-medium mb-8">Real Feedback From Real Customers</div>
      </div>
      {/* Carousel */}
      <div className="mb-6 overflow-hidden select-none touch-pan-y">
        <motion.div
          ref={containerRef}
          className="flex gap-6 w-full cursor-grab active:cursor-grabbing"
          animate={controls}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -setWidth, right: 0 }}
          dragElastic={0.1}
          dragMomentum={true}
          onDragStart={() => controls.stop()}
          onDragEnd={() => {
            if (setWidth > 0) {
              controls.start({
                x: -setWidth,
                transition: {
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: setWidth / SCROLL_SPEED / 60,
                    ease: 'linear',
                  },
                },
              });
            }
          }}
        >
          {/* First set for measuring width */}
          <div ref={testimonialsSetRef} className="flex gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[90vw] sm:w-[350px] md:w-[320px] lg:w-[300px] bg-white border-2 border-purple-400 rounded-2xl p-6 flex flex-col justify-between shadow-md mx-2"
              >
                <div className="mb-6 text-gray-800 text-base">{t.text}</div>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    draggable={false}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500 italic">{t.role}</div>
                  </div>
                  <div className="ml-auto flex items-center">
                    {[...Array(Math.floor(t.stars))].map((_, i) => (
                      <span key={i} className="text-orange-400 text-lg">★</span>
                    ))}
                    {t.stars % 1 !== 0 && (
                      <span className="text-orange-400 text-lg">½</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Duplicated set for infinite scroll */}
          <div className="flex gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={`dup1-${idx}`}
                className="flex-shrink-0 w-[90vw] sm:w-[350px] md:w-[320px] lg:w-[300px] bg-white border-2 border-purple-400 rounded-2xl p-6 flex flex-col justify-between shadow-md mx-2"
              >
                <div className="mb-6 text-gray-800 text-base">{t.text}</div>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    draggable={false}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500 italic">{t.role}</div>
                  </div>
                  <div className="ml-auto flex items-center">
                    {[...Array(Math.floor(t.stars))].map((_, i) => (
                      <span key={i} className="text-orange-400 text-lg">★</span>
                    ))}
                    {t.stars % 1 !== 0 && (
                      <span className="text-orange-400 text-lg">½</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* More Review Button */}
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
      {/* Gradient Line */}
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
          .touch-pan-y {
            touch-action: pan-y;
          }
        `}
      </style>
    </div>
  );
};

export default Testimonials;