import React from 'react';
import Marquee from "react-fast-marquee";

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
    text: "Jaunpur's Resto serves food that’s full of flavor and heart. Every bite feels homemade, yet elevated — perfectly spiced, well-balanced, and truly comforting.",
    name: "Om Pawar",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    stars: 5,
  },
  {
    text: "Dining at Jaunpur’s Resto is a treat — the flavors are bold, the ingredients fresh, and each dish reflects authentic culinary care. A truly satisfying experience every time.",
    name: "Smita Shende",
    role: "Customer Review",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 5,
  },
];

const Testimonials = () => {
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
      <div className="mb-6">
        <Marquee
          pauseOnHover
          pauseOnClick
          gradient={false}
          speed={40}
        >
          <div className="flex gap-6 w-full">
            {testimonials.map((t, idx) => (
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
        </Marquee>
      </div>
      {/* Line below carousel */}
      <div className="w-full flex justify-center">
        <div className="h-2 w-40 rounded-full bg-gradient-to-r from-orange-400 via-purple-400 to-orange-400"></div>
      </div>
      <style>
        {`
          @media (min-width: 1024px) {
            .marquee .flex > div {
              width: 300px !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .marquee .flex > div {
              width: 320px !important;
            }
          }
          @media (max-width: 767px) {
            .marquee .flex > div {
              width: 90vw !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Testimonials;
