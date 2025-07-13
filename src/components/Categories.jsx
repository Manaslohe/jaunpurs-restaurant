import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import '@fontsource/montserrat/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/300.css';

// Helper for slow smooth scroll
function smoothScrollTo(element, duration = 1200) {
  const targetY = element.getBoundingClientRect().top + window.pageYOffset;
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  let start;

  function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuad(percent));
    if (percent < 1) {
      window.requestAnimationFrame(step);
    }
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  window.requestAnimationFrame(step);
}

const Categories = forwardRef((props, ref) => {
  const categories = [
    {
      section: "SWEET",
      subtitle: "",
      items: [
        {
          name: "Kaju Katli",
          description: "Melt-in-Mouth Magic of Kaju.",
          image: "/Categories/1.png",
          bgColor: "bg-purple-600"
        },
        {
          name: "Rasmalai",
          description: "Where Richness Meets Sweetness.",
          image: "/Categories/2.png",
          bgColor: "bg-purple-600"
        },
        {
          name: "Ladoo",
          description: "Sweetness Relived with Tradition.",
          image: "/Categories/3.png",
          bgColor: "bg-purple-600"
        }
      ]
    },
    {
      section: "NAMKEEN",
      subtitle: "",
      items: [
        {
          name: "Bhakarwadi",
          description: "the traditional twist your taste buds crave.",
          image: "/Categories/4.png",
          bgColor: "bg-purple-600"
        },
        {
          name: "Chakli",
          description: "Crunch That Comes Full Circle.",
          image: "/Categories/5.png",
          bgColor: "bg-purple-600"
        },
        {
          name: "Special Jaunpur Mix",
          description: "Light, Crispy, Full of Flavour.",
          image: "/Categories/6.png",
          bgColor: "bg-purple-600"
        }
      ]
    },
    {
      section: "VEG MEALS",
      subtitle: "",
      items: [
        {
          name: "Thali",
          description: "One Thali. Endless Flavours.",
          image: "/Categories/7.png",
          bgColor: "bg-purple-600"
        },
        {
          name: "Paneer Butter Masala",
          description: "Rich. Creamy. Irresistible.",
          image: "/Categories/8.png",
          bgColor: "bg-purple-600"
        },
        {
          name: "Veg biryani",
          description: "A Bowl Full of Spice & Simplicity.",
          image: "/Categories/9.png",
          bgColor: "bg-purple-600"
        }
      ]
    },
    {
      section: "DAIRY PRODUCTS",
      subtitle: "",
      items: [
        {
          name: "Milk",
          description: "Fresh and pure milk for your daily nourishment.",
          image: "/Categories/10.png",
          bgColor: "bg-purple-600"
        },
        {
          name: "Paneer",
          description: "Soft, creamy, tender made with fresh milk.",
          image: "/Categories/11.png",
          bgColor: "bg-purple-600"
        },
        {
          name: "Curd",
          description: "Thick and natural curd with a perfect tangy taste.",
          image: "/Categories/12.png",
          bgColor: "bg-purple-600"
        }
      ]
    }
  ];

  const sectionRefs = useRef([]);
  const [revealed, setRevealed] = useState({ category: null, item: null });

  useImperativeHandle(ref, () => ({
    scrollToCategory: (categoryName) => {
      const idx = categories.findIndex(
        (cat) => cat.section.toLowerCase().replace(/\s/g, '') === categoryName.toLowerCase().replace(/\s/g, '')
      );
      if (idx !== -1 && sectionRefs.current[idx]) {
        // Use custom smooth scroll
        smoothScrollTo(sectionRefs.current[idx], 1200);
      }
    }
  }));

  return (
    <div className="w-full max-w-full mx-auto px-4 pt-0 md:py-8 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-7xl font-bold text-black mb-0 md:mb-0 font-montserrat" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Our Categories
        </h1>
        <p className="text-lg md:text-3xl font-medium text-black">
          Our Must-Try Specials
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-4 md:space-y-12 max-w-[100%] mx-auto">
        {categories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            id={category.section.toLowerCase().replace(/\s/g, '')}
            ref={el => sectionRefs.current[categoryIndex] = el}
            className="w-full"
          >
            {/* Section Title */}
            <div className="text-center mb-4 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide">
                {category.section}
              </h2>
              {category.subtitle && (
                <p className="text-gray-600 mt-1">{category.subtitle}</p>
              )}
            </div>

            {/* Items Grid */}
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 max-w-full mx-auto">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`relative rounded-2xl p-6 text-white w-[28vw] h-[28vw] md:w-[21vw] md:h-[21vw] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group`}
                    style={{
                      background: "linear-gradient(to bottom, #B32AAC, #4D124A)"
                    }}
                    onClick={() => {
                      // Only reveal on mobile (window width < md)
                      if (window.innerWidth < 768) {
                        setRevealed(
                          revealed.category === categoryIndex && revealed.item === itemIndex
                            ? { category: null, item: null }
                            : { category: categoryIndex, item: itemIndex }
                        );
                      }
                    }}
                  >
                    {/* Reveal overlay for mobile */}
                    <div
                      className={`
                        absolute inset-0 flex flex-col items-center justify-center z-10 rounded-2xl
                        bg-black/80 md:hidden
                        transition-all duration-700 ease-in-out
                        ${revealed.category === categoryIndex && revealed.item === itemIndex
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-95 pointer-events-none'}
                      `}
                    >
                      <span className="text-[3vw] font-bold mb-2">{item.name}</span>
                      <span className="text-[2vw] text-white/90 text-center px-4 italic font-light">{item.description}</span>
                    </div>
                    <div className="flex flex-col items-center text-center flex-1 justify-center w-full">
                      {/* Image Container */}
                      <div className="mb-4 rounded-xl  overflow-hidden md:bg-white/10 p-1 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[14vw] h-[18vw] md:w-[20vw] md:h-[13vw] object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl md:text-2xl font-medium mb-2 hidden md:block">
                        {item.name}
                      </h3>
                      <p className="text-sm md:text-[0.7vw] text-white/90 leading-relaxed hidden md:block italic font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Full Menu Button */}
      <div className="text-center mt-12">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
          View Full Menu
        </button>
      </div>
    </div>
  );
});

export default Categories;