import React, { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: "/Gallery/1.png",
      alt: "Gallery Image 1",
      title: "Gallery Image 1",
      description: ""
    },
    {
      id: 2,
      src: "/Gallery/2.png",
      alt: "Gallery Image 2",
      title: "Gallery Image 2",
      description: ""
    },
    {
      id: 3,
      src: "/Gallery/3.png",
      alt: "Gallery Image 3",
      title: "Gallery Image 3",
      description: ""
    },
    {
      id: 4,
      src: "/Gallery/4.png",
      alt: "Gallery Image 4",
      title: "Gallery Image 4",
      description: ""
    },
    {
      id: 5,
      src: "/Gallery/5.png",
      alt: "Gallery Image 5",
      title: "Gallery Image 5",
      description: ""
    },
    {
      id: 6,
      src: "/Gallery/6.png",
      alt: "Gallery Image 6",
      title: "Gallery Image 6",
      description: ""
    },
    {
      id: 7,
      src: "/Gallery/7.png",
      alt: "Gallery Image 7",
      title: "Gallery Image 7",
      description: ""
    },
    {
      id: 8,
      src: "/Gallery/8.png",
      alt: "Gallery Image 8",
      title: "Gallery Image 8",
      description: ""
    }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div id="gallery" className="w-full max-w-7xl mx-auto px-4 py-8 bg-transparent">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
          Gallery
        </h1>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {/* First Row - 2 landscape images */}
        <div className="col-span-1 md:col-span-2">
          <div 
            className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer group"
            onClick={() => openModal(galleryImages[0])}
          >
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        <div 
          className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer group"
          onClick={() => openModal(galleryImages[1])}
        >
          <img
            src={galleryImages[1].src}
            alt={galleryImages[1].alt}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        <div 
          className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer group"
          onClick={() => openModal(galleryImages[2])}
        >
          <img
            src={galleryImages[2].src}
            alt={galleryImages[2].alt}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        <div 
          className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer group"
          onClick={() => openModal(galleryImages[3])}
        >
          <img
            src={galleryImages[3].src}
            alt={galleryImages[3].alt}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* Second Row - 6 portrait images */}
        <div 
          className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer group"
          onClick={() => openModal(galleryImages[4])}
        >
          <img
            src={galleryImages[4].src}
            alt={galleryImages[4].alt}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <div 
            className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer group"
            onClick={() => openModal(galleryImages[5])}
          >
            <img
              src={galleryImages[5].src}
              alt={galleryImages[5].alt}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        <div 
          className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer group"
          onClick={() => openModal(galleryImages[6])}
        >
          <img
            src={galleryImages[6].src}
            alt={galleryImages[6].alt}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        <div 
          className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden shadow-md cursor-pointer group"
          onClick={() => openModal(galleryImages[7])}
        >
          <img
            src={galleryImages[7].src}
            alt={galleryImages[7].alt}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      {/* View All Photos Button */}
      <div className="text-center">
        <a
          href="https://www.google.com/search?client=mobilesearchapp&sca_esv=a3e392cc0b6211b6&channel=iss&cs=1&hl=en_GB&rlz=1MDAPLA_en-GB__1122__1123&v=374.0.773146746&sxsrf=AE3TifOTfGUnEoxN8vnmH6tdfuAaszHTew:1752472237254&q=Jaunpurs+sweets+and+Restaurant+photos&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIei9-d4bDCYGWNP_eFTtBNEwuAQVK0rg-1c_JXtht-6ycxvKDPTKNp6eCaIzje8gksMvn1RAh6-1pbvg_voRLMm0IydHeJ7ZIuEmioN9bCM90quuPU4wOZBvxexDhWa0dXhaglSPfh5Bt2An38kxZ_wbhogPUTOiGgsmID4u6VRofxzdDuw&sa=X&ved=2ahUKEwjqsbjp07uOAxVdd_UHHdCaC1wQtKgLKAF6BAgUEAE&biw=1699&bih=804&dpr=1.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
            View all Photos
          </button>
        </a>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10"
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
        
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;