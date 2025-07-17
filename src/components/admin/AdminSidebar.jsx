import React from 'react';

// Use solid, subtle theme colors
const SIDEBAR_BG = 'bg-[#4D124A]/90';

const AdminSidebar = ({
  sidebarOpen = false,
  onClose = () => {},
}) => {
  const SidebarContent = (
    <>
      <div className="mb-0 md:mb-10 text-center w-full flex justify-center">
        <img
          src="/logow.png"
          alt="Konnect Logo"
          className="h-10 md:h-24 w-auto object-contain mx-auto"
          style={{ maxHeight: '100px' }}
        />
      </div>
      {/* Enquiry Button */}
      <div className="w-full flex flex-col items-center mt-6">
        <button
          className="w-full md:w-11/12 px-4 py-2 rounded-lg font-semibold bg-[#E78D3F] text-white shadow hover:bg-[#B32AAC] hover:text-white transition-all duration-200"
          style={{ fontSize: '1rem' }}
          disabled
        >
          Enquiry
        </button>
      </div>
      <div className="flex-1 hidden md:block" />
      <div className="mt-0 md:mt-10 text-xs text-white/70 text-center w-full hidden md:block">
        &copy; {new Date().getFullYear()} Jaunpurs
      </div>
    </>
  );

  // Desktop sidebar
  if (!sidebarOpen) {
    return (
      <aside className={`hidden md:flex w-full md:w-64 ${SIDEBAR_BG} shadow-xl flex-col py-4 md:py-8 px-2 md:px-4 h-screen max-h-screen overflow-y-auto z-10 fixed left-0 top-0`}>
        {SidebarContent}
      </aside>
    );
  }

  // Mobile sidebar overlay
  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside className={`relative w-64 max-w-full ${SIDEBAR_BG} shadow-xl flex flex-col py-8 px-4 min-h-screen z-50 animate-slide-in-left`}>
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white bg-[#E78D3F] rounded-full p-2 shadow hover:bg-[#B32AAC] transition"
          onClick={onClose}
          aria-label="Close sidebar"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 6L14 14M14 6L6 14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {SidebarContent}
        <div className="mt-10 text-xs text-white/70 text-center w-full md:hidden">
          &copy; {new Date().getFullYear()} Konnect
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
