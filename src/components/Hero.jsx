import React from 'react';
import Marquee from "react-fast-marquee";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GiCakeSlice, GiFullPizza, GiMilkCarton } from 'react-icons/gi';
import { MdFastfood } from 'react-icons/md';
import Header from './Header';

const categories = [
	{
		icon: <img src="/Hero/sweet.png" alt="Sweets" className="h-10 w-10 object-contain" />,
		label: 'Sweets',
		color: 'bg-orange-400',
		text: 'text-white',
	},
	{
		icon: <img src="/Hero/namkeen.png" alt="Namkeen" className="h-10 w-10 object-contain" />,
		label: 'Namkeen',
		color: 'bg-purple-700',
		text: 'text-white',
	},
	{
		icon: <img src="/Hero/meal.png" alt="Meals" className="h-10 w-10 object-contain" />,
		label: 'Meals',
		color: 'bg-purple-700',
		text: 'text-white',
	},
	{
		icon: <img src="/Hero/dairy.png" alt="Dairy Product" className="h-10 w-10 object-contain" />,
		label: 'Dairy Product',
		color: 'bg-purple-700',
		text: 'text-white',
	},
];

// Helper to map button label to section id in Categories.jsx
const getCategorySectionId = (label) => {
	switch (label.toLowerCase()) {
		case 'sweets':
			return 'sweet';
		case 'namkeen':
			return 'namkeen';
		case 'meals':
			return 'vegmeals';
		case 'dairy product':
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
			<div className="hidden md:flex absolute top-6 right-10 z-30 items-center gap-2 bg-transparent">
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
							className={`flex justify-between items-center px-3 py-2 rounded-r-full font-semibold text-sm shadow cursor-pointer transition duration-500 ease-in-out
								bg-white text-black border border-gray-200
								hover:bg-orange-400 hover:text-white hover:scale-105
							`}
							onClick={() => {
								const sectionId = getCategorySectionId(cat.label);
								if (onCategoryClick && sectionId) {
									onCategoryClick(sectionId);
								}
							}}
						>
							<span className="flex-1 text-left">{cat.label}</span>
							<div className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 bg-white ml-2">
								{/* Increased w/h to w-9 h-9, border to border, bg to white, ml-2 for spacing */}
								{cat.icon}
							</div>
						</div>
					))}
				</div>
			</div>
			{/* Thali Image below main content and above buttons */}
			<img
			   src="/Hero/thali.png"
			   alt="Thali"
			   className="absolute left-60 bottom-30 md:bottom-30 z-30 h-[40vh] w-auto object-contain"
			/>
			{/* Thali2 Image beside thali.png, desktop only */}
			<img
			   src="/Hero/thali2.png"
			   alt="Thali 2"
			   className="hidden md:block absolute left-[41vw] bottom-8 z-30 h-[30vw] w-auto object-contain"
			/>
			{/* Sidebar for categories */}
			<div className="hidden md:flex flex-col absolute right-0 top-36 gap-4 z-20">
				{categories.map((cat, idx) => (
					<div
						key={cat.label}
						className={`flex border border-white items-center gap-2 px-6 pl-1 py-1 rounded-l-full text-white font-semibold shadow-lg cursor-pointer transition duration-500 ease-in-out
							bg-transparent hover:bg-orange-400 hover:scale-110
						`}
						onClick={() => {
							const sectionId = getCategorySectionId(cat.label);
							if (onCategoryClick && sectionId) {
								onCategoryClick(sectionId);
							}
						}}
					>
						<div className="flex items-center justify-center w-10 h-10 rounded-full border-1 border-white bg-transparent">
							{cat.icon}
						</div>
						{cat.label}
					</div>
				))}
			</div>
			{/* Swiggy & Zomato Buttons at Bottom */}
			<div className="absolute bottom-[6vh] z-40 flex gap-4 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 justify-center md:justify-start w-full md:w-auto">
				<button className="p-0 bg-transparent hover:scale-105 transition">
					<img
						src="/Hero/swiggy.png"
						alt="Order on Swiggy"
						className="h-8 w-auto object-contain"
					/>
				</button>
				<button className="p-0 bg-transparent hover:scale-105 transition">
					<img
						src="/Hero/zomato.png"
						alt="Order on Zomato"
						className="h-8 w-auto object-contain"
					/>
				</button>
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
