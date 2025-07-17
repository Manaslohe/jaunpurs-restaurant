import React, { useEffect, useState } from 'react';
import { Copy, Eye, X, Check, Calendar, User, Phone, Mail, Globe, FileImage } from 'lucide-react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const BACKEND_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

// Enhanced Card Component
const DataCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 ${className}`}>
    {children}
  </div>
);

// Copy Button Component
const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors duration-200 text-sm"
      title={`Copy ${label}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

// Image Modal Component
const ImageModal = ({ src, alt, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
    <div className="relative max-w-4xl max-h-full">
      <button
        onClick={onClose}
        className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
      >
        <X size={24} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[70vh] object-contain rounded-xl border-4 border-white shadow-lg"
      />
      <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-60 text-white p-2 rounded text-sm">
        {alt}
      </div>
    </div>
  </div>
);

const AdminPortal = ({ onLogout, username = 'manas' }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/admin/enquiries`)
      .then(res => res.ok ? res.json() : [])
      .then(data => Array.isArray(data) ? data : [])
      .catch(() => [])
      .then((enquiryData) => {
        setEnquiries(enquiryData);
        setLoading(false);
      });
  }, []);

  // Calculate today's enquiries
  const todayCount = enquiries.filter(e => {
    const created = new Date(e.createdAt);
    const now = new Date();
    return created.getDate() === now.getDate() &&
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear();
  }).length;

  // Summary Cards Component
  const SummaryCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      <DataCard className="flex items-center gap-4 p-6">
        <Calendar className="text-blue-600" size={32} />
        <div>
          <p className="text-sm text-gray-500 font-medium">Today's Enquiries</p>
          <p className="text-2xl font-bold text-blue-700">{todayCount}</p>
        </div>
      </DataCard>
      <DataCard className="flex items-center gap-4 p-6">
        <FileImage className="text-green-600" size={32} />
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Enquiries</p>
          <p className="text-2xl font-bold text-green-700">{enquiries.length}</p>
        </div>
      </DataCard>
    </div>
  );

  const EnquiryTable = () => (
    <DataCard className="p-0">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileImage className="text-green-600" size={28} />
            Enquiry Submissions
          </h2>
          <div className="text-base text-gray-500 font-medium">
            Total: <span className="font-bold text-green-700">{enquiries.length}</span>
          </div>
        </div>
        <div className="space-y-6">
          {enquiries.map((enquiry) => (
            <div key={enquiry._id} className="border border-gray-200 rounded-xl p-5 bg-white hover:border-green-400 transition-colors shadow-sm hover:shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                <div className="flex items-center gap-3">
                  <User className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Name</p>
                    <p className="text-lg text-gray-900 font-semibold">{enquiry.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Phone</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-900">{enquiry.phone}</span>
                      <CopyButton text={enquiry.phone} label="phone number" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Email</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-900">{enquiry.email}</span>
                      <CopyButton text={enquiry.email} label="email" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Country</p>
                    <p className="text-lg text-gray-900">{enquiry.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Date</p>
                    <p className="text-lg text-gray-900">{new Date(enquiry.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileImage className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Image</p>
                    {enquiry.fileName ? (
                      <div className="flex items-center gap-2 mt-1">
                        <img
                          src={`${BACKEND_URL}/api/admin/enquiry/image/${enquiry._id}`}
                          alt={enquiry.fileName}
                          className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage({
                            src: `${BACKEND_URL}/api/admin/enquiry/image/${enquiry._id}`,
                            alt: enquiry.fileName
                          })}
                        />
                        <button
                          onClick={() => setSelectedImage({
                            src: `${BACKEND_URL}/api/admin/enquiry/image/${enquiry._id}`,
                            alt: enquiry.fileName
                          })}
                          className="flex items-center gap-1 px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors text-sm"
                        >
                          <Eye size={12} />
                          View
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2">Message</p>
                <p className="text-base text-gray-900 leading-relaxed">{enquiry.message}</p>
              </div>
            </div>
          ))}
        </div>
        {enquiries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileImage size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No enquiry submissions found</p>
          </div>
        )}
      </div>
    </DataCard>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9C77F] to-[#FBE6B7] transition-all duration-300">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />
        {/* Main layout column */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          {/* Header */}
          <div className="fixed top-0 left-0 right-0 z-20 md:ml-64">
            <AdminHeader
              username={username}
              onLogout={onLogout}
            />
          </div>
          {/* Content */}
          <main className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto mt-[64px] md:mt-[72px]">
            <div className="max-w-5xl mx-auto">
              <div className="transition-all duration-300">
                {loading ? (
                  <DataCard className="p-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 text-lg font-medium">Loading enquiries...</p>
                    </div>
                  </DataCard>
                ) : (
                  <>
                    <SummaryCards />
                    <EnquiryTable />
                  </>
                )}
              </div>
            </div>
          </main>
          {/* Mobile Footer */}
          <footer className="md:hidden bg-white border-t border-gray-200 text-center py-3">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Konnect. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default AdminPortal;