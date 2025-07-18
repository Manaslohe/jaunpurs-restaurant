import React from 'react';
import Marquee from "react-fast-marquee";
import { FaMapMarkerAlt } from 'react-icons/fa';
import Header from './Header';

const categories = [
	{
		icon: <img src="/Hero/sweet.png" alt="Sweets" className="h-10 w-10 object-cover rounded-full" />,
		label: 'Sweets',
		color: 'bg-orange-400',
		text: 'text-white',
	},
	{
		icon: <img src="/Hero/namkeen.png" alt="Namkeen" className="h-10 w-10 object-cover rounded-full" />,
		label: 'Namkeen',
		color: 'bg-purple-700',
		text: 'text-white',
	},
	{
		icon: <img src="/Hero/meal.png" alt="Meals" className="h-10 w-10 object-cover rounded-full" />,
		label: 'Meals',
		color: 'bg-purple-700',
		text: 'text-white',
	},
	{
		icon: <img src="/Hero/dairy.png" alt="Dairy Products" className="h-10 w-10 object-cover rounded-full" />,
		label: 'Dairy Products',
		color: 'bg-purple-700',
		text: 'text-white',
	},
];

// Helper to map button label to section id in Categories.jsx
const getCategorySectionId = (label) => {
	switch (label.toLowerCase()) {
		case 'sweets':
			return 'sweets';
		case 'namkeen':
			return 'namkeen';
		case 'meals':
			return 'vegmeals';
		case 'dairy products':
			return 'dairyproducts';
		default:
			return '';
	}
};

function Hero({ onCategoryClick }) {
	return (
		<section
			className="relative w-full min-h-[95vh] md:min-h-[100vh] flex items-start justify-start overflow-hidden font-inter"
			style={{ position: 'relative' }}
		>
			{/* Header */}
			<div className="absolute top-0 left-0 z-40 flex w-full justify-start">
				<Header />
			</div>
			{/* Location text at top right */}
			<div className="hidden md:flex absolute top-[1rem] right-[1rem] z-30 items-center gap-2 bg-transparent">
				<FaMapMarkerAlt className="text-white" size={22} />
				<span className="text-white text-[0.8vw] font-normal">
					Manewada Square Nagpur 27
				</span>
			</div>
			{/* Desktop background image (hidden on mobile) */}
			<div
				aria-hidden="true"
				className="hidden md:block absolute top-0 right-0 h-full z-0"
				style={{
					width: '120%',
					height: '100%',
					backgroundImage: "url('/Hero/background.png')",
					backgroundPosition: 'right',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'contain',
					pointerEvents: 'none',
					opacity: 1,
				}}
			/>
			{/* Mobile background image (only on mobile) */}
			<div
				aria-hidden="true"
				className="block md:hidden absolute top-0 left-0 w-full h-full z-0"
				style={{
					backgroundImage: "url('/Hero/mobilebg.png')",
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					pointerEvents: 'none',
					opacity: 1,
					height: '100%',
					width: '100%',
				}}
			/>
			{/* Main Content */}
			<div className="flex-1 flex flex-col justify-start items-start px-4 md:px-8 py-12 z-10 max-w-3xl mt-15 md:mt-24">
				<h1 className="font-montserrat text-3xl md:text-5xl font-bold text-black  md:leading-12 mb-2 drop-shadow-lg text-left">
					Taste Tradition.
					<br />Fresh at Jaunpur <br /> Sweets, Manewada.
				</h1>
				<p className="text-[3vw] md:text-[1vw] font-medium text-gray-700 mb-4 rounded w-fit text-left">
					Pure veg | Fresh dairy | Handcrafted sweets & namkeen
				</p>
				<button
					className="w-fit text-[3vw] md:text-[0.9vw] px-6 py-1 mb-8 rounded-full border border-black bg-orange-400 text-white font-medium shadow hover:bg-orange-500 transition"
					onClick={() => {
						const sectionId = getCategorySectionId('Sweets'); // scroll to first category section
						if (onCategoryClick && sectionId) {
							onCategoryClick(sectionId);
						}
					}}
				>
					EXPLORE MENU
				</button>
				{/* Mobile category buttons: left-aligned, reduced width, no left roundness, black text, icon after text */}
				<div className="flex flex-col gap-2 mt-2 md:hidden w-[55vw] min-w-[120px] max-w-[160px]">
					{categories.map((cat, idx) => (
						<div
							key={cat.label}
							className={`flex justify-between items-center px-3 py-2 rounded-r-full font-semibold text-sm shadow-md cursor-pointer transition-all duration-300 ease-in-out
								bg-white/90 border border-orange-200
								text-black
								hover:bg-orange-50 hover:border-orange-300 hover:text-black hover:shadow-lg hover:scale-105
								group
							`}
							onClick={() => {
								const sectionId = getCategorySectionId(cat.label);
								if (sectionId) {
									const el = document.getElementById(sectionId);
									if (el) {
										el.scrollIntoView({ behavior: 'smooth', block: 'start' });
									}
								}
								if (onCategoryClick && sectionId) {
									onCategoryClick(sectionId);
								}
							}}
						>
							<span className="flex-1 text-left">{cat.label}</span>
							<div className="flex items-center justify-center w-9 h-9 rounded-full border border-orange-200 bg-white ml-2 transition-all duration-300">
								{/* No hover effect on icon */}
								{cat.icon}
							</div>
						</div>
					))}
				</div>
			</div>
			{/* Thali Image below main content and above buttons (desktop only) */}
			<div className="hidden md:block absolute left-[18vw] top-[20rem] z-30 group">
				<img
					src="/Hero/thali.png"
					alt="Thali"
					className="h-[18vw] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			{/* Thali2 Image beside thali.png, desktop only */}
			<div className="hidden md:block absolute left-[41vw] top-[15rem] z-30 group">
				<img
					src="/Hero/thali2.png"
					alt="Thali 2"
					className="h-[30vw] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			{/* Thali Image for mobile only, center right aligned */}
			<div className="block md:hidden absolute -right-[35vw] top-1/2 transform -translate-y-1/2 z-30">
				<img
					src="/Hero/thali.png"
					alt="Thali"
					className="h-[60vw] w-auto object-contain"
				/>
			</div>
			{/* Sidebar for categories */}
			<div className="hidden md:flex flex-col absolute right-0 top-36 gap-4 z-20">
				{categories.map((cat, idx) => (
					<div
						key={cat.label}
						className={`flex border border-neutral-200 items-center gap-1 px-2 pl-1 py-1 rounded-l-full text-black font-semibold shadow-lg cursor-pointer transition-all duration-300 ease-in-out
							bg-neutral-50 hover:bg-neutral-200 hover:text-black hover:scale-110 hover:shadow-lg
							group
						`}
						onClick={() => {
							const sectionId = getCategorySectionId(cat.label);
							if (onCategoryClick && sectionId) {
								onCategoryClick(sectionId);
							}
						}}
					>
						<div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white transition-all duration-300">
							{/* No hover effect on icon */}
							{cat.icon}
						</div>
						{cat.label}
					</div>
				))}
			</div>
			{/* Swiggy & Zomato Buttons at Bottom */}
			<div className="absolute bottom-[8%] z-40 flex gap-4 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 justify-center md:justify-start w-full md:w-auto">
			   <a
				   href="https://www.swiggy.com/menu/1088255?source=sharing "
				   target="_blank"
				   rel="noopener noreferrer"
				   className="p-0 bg-transparent hover:scale-105 transition"
			   >
				   <img
					   src="/Hero/swiggy.png"
					   alt="Order on Swiggy"
					   className="h-[2rem] w-auto object-contain"
				   />
			   </a>
			   <a
				   href="https://zomato.onelink.me/xqzv/tjyw6w3v "
				   target="_blank"
				   rel="noopener noreferrer"
				   className="p-0 bg-transparent hover:scale-105 transition"
			   >
				   <img
					   src="/Hero/zomato.png"
					   alt="Order on Zomato"
					   className="h-[2rem] w-auto object-contain"
				   />
			   </a>
			</div>
			{/* Bottom hashtag bar */}
			<div className="absolute bottom-0 left-0 w-full bg-orange-400 text-white text-[3vw] md:text-[1vw] py-1 px-2 text-center z-30 overflow-hidden">
				<Marquee gradient={false} speed={40} pauseOnHover={true} pauseOnClick={true} style={{ width: '100%' }}>
					<span className="whitespace-nowrap">
						#Sweets #Namkeen #Meals #Sweets #Namkeen #Meals #Sweets #Namkeen #Meals #Sweets #Namkeen #Meals #Sweets #Namkeen #Meals #Sweets #Namkeen #Meals #Sweets #Namkeen #Meals #Sweets #Namkeen #Meals
					</span>
				</Marquee>
			</div>
		</section>
	);
}

export default Hero;
