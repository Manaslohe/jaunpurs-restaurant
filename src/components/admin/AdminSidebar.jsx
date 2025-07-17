import React from 'react';
import { X, Mail, LogOut } from 'lucide-react';

const AdminSidebar = ({
  sidebarOpen = false,
  onClose = () => {},
  onLogout = () => {}, // <-- add onLogout prop
}) => {
  const SidebarContent = (
    <>
      {/* Logo Section */}
      <div className="mb-8 text-center w-full flex justify-center">
        <div className="bg-white rounded-xl p-1 shadow-sm">
          <img
            src="/logow.png"
            alt="Konnect Logo"
            className="h-38 md:h-52 w-auto object-contain mx-auto"
            style={{ maxHeight: '100px' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="hidden text-xl font-bold text-[#3B0A3B]">K</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
          Main Menu
        </div>
        
        {/* Enquiries */}
        <a
          href="#"
          className="flex items-center px-3 py-2.5 text-white bg-[#3B0A3B] rounded-lg transition-colors duration-200 group"
        >
          <Mail className="h-5 w-5 mr-3 text-white" />
          <span className="font-medium">Enquiries</span>
        </a>
      </nav>

      {/* User Profile Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center px-3 py-2 rounded-lg">
          <div className="w-8 h-8 bg-[#B32AAC] rounded-full flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">Admin</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          className="w-full mt-3 flex items-center px-3 py-2.5 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group"
          onClick={onLogout} // <-- call onLogout on click
        >
          <LogOut className="h-5 w-5 mr-3 text-gray-500 group-hover:text-red-600" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span>Crafted by</span>
          <span className="font-semibold text-[#B32AAC]">FrameX</span>
        </div>
        <div>&copy; {new Date().getFullYear()} Jaunpurs</div>
      </div>
    </>
  );

  // Desktop sidebar
  if (!sidebarOpen) {
    return (
      <aside className="hidden md:flex w-full md:w-64 bg-white shadow-lg flex-col py-6 px-4 h-screen max-h-screen overflow-y-auto z-10 fixed left-0 top-0 border-r border-gray-200">
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
      <aside className="relative w-64 max-w-full bg-white shadow-xl flex flex-col py-6 px-4 min-h-screen z-50 animate-slide-in-left border-r border-gray-200">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-sm transition-colors duration-200"
          onClick={onClose}
          aria-label="Close sidebar"
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
        {SidebarContent}
      </aside>
    </div>
  );
};

export default AdminSidebar;