import React from "react";
import dosaImg from "../../public/Story/thali.png";

const Story = () => {
  return (
    <section id="ourstory" className="relative py-8 md:py-12 px-4 md:px-16 overflow-hidden min-h-[30vh] lg:min-h-[90vh]">
      {/* Background faded text */}
      <h1 className="absolute left-4 md:left-16 top-5 md:top-0 text-[12vw] md:text-[8vw] lg:text-[11vw] font-bold text-purple-200 opacity-40 select-none pointer-events-none z-0 whitespace-nowrap font-montserrat">
        Our Story
      </h1>

      {/* Dosa Image - absolutely positioned, independent of main content */}
      <img
        src={dosaImg}
        alt="Traditional Indian Thali"
        className="absolute -top-20 md:top-10 right-0 w-full max-w-[200px] md:max-w-[450px] lg:max-w-[45%] h-[100%] object-contain md:z-30 pointer-events-none"
        style={{
          transform: 'translateX(10%) translateY(-5%)'
        }}
      />

      {/* Main content container */}
      <div className="relative z-20 pt-10 md:pt-12 lg:pt-36">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Text Section */}
          <div className="flex-1 max-w-xl">
            <div className="flex items-center mb-14 md:mb-16">
              <span className="inline-block w-1.5 h-8 md:h-12 bg-orange-400 rounded-sm mr-3"></span>
              <h2 className="text-[8vw] md:text-4xl lg:text-7xl font-bold text-black font-montserrat">
                Our Story
              </h2>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-[#580F54] font-semibold text-[4.5vw] md:text-xl lg:text-2xl font-inter">
                Where Every Bite Tells a Story
              </h3>

              <p className="text-gray-700 font-medium text-[3vw] md:text-lg md:leading-relaxed font-inter">
                A family-run, pure veg restaurant rooted in flavor and heartfelt
                hospitality. What began as a humble sweet shop has now grown into a
                full-fledged destination offering wholesome meals, traditional sweets,
                dairy delights, and much more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;