import React, { useEffect, useState } from 'react';
import { Copy, X, Check, Calendar, User, Phone, Mail, Globe } from 'lucide-react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

// Use REACT_APP_API_URL from .env, fallback to deployed backend if not set
const BACKEND_URL =
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.REACT_APP_API_URL
    ? import.meta.env.REACT_APP_API_URL
    : 'https://jaunpurs-be.vercel.app';

// Enhanced Card Component
const DataCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 ${className}`}>
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
      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded text-xs font-medium transition-colors duration-150"
      title={`Copy ${label}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const AdminPortal = ({ onLogout, username = 'manas' }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // <-- add sidebar state

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`${BACKEND_URL}/api/admin/enquiries`)
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          setError(`Failed to fetch enquiries: ${res.status} ${text || res.statusText}`);
          return [];
        }
        return res.json();
      })
      .then(data => Array.isArray(data) ? data : [])
      .catch(err => {
        setError('Network error or server unavailable.');
        console.error('AdminPortal fetch error:', err);
        return [];
      })
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
      <DataCard className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Calendar className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Today's Enquiries</p>
            <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
          </div>
        </div>
      </DataCard>
      <DataCard className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <Calendar className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Enquiries</p>
            <p className="text-2xl font-bold text-gray-900">{enquiries.length}</p>
          </div>
        </div>
      </DataCard>
    </div>
  );

  const EnquiryTable = () => (
    <DataCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Enquiry Submissions
          </h2>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{enquiries.length}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <div key={enquiry._id} className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <User className="text-gray-400 mt-1" size={16} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</p>
                    <p className="text-sm text-gray-900 font-medium mt-1">{enquiry.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="text-gray-400 mt-1" size={16} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-900">{enquiry.phone}</span>
                      <CopyButton text={enquiry.phone} label="phone number" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="text-gray-400 mt-1" size={16} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-900 break-all">{enquiry.email}</span>
                      <CopyButton text={enquiry.email} label="email" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="text-gray-400 mt-1" size={16} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Country</p>
                    <p className="text-sm text-gray-900 mt-1">{enquiry.country}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="text-gray-400 mt-1" size={16} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date</p>
                    <p className="text-sm text-gray-900 mt-1">{new Date(enquiry.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Message</p>
                <p className="text-sm text-gray-900 leading-relaxed">{enquiry.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        {enquiries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-sm">No enquiry submissions found</p>
          </div>
        )}
      </div>
    </DataCard>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => { // <-- pass onLogout to sidebar
            setSidebarOpen(false);
            if (typeof onLogout === 'function') onLogout();
          }}
        />
        
        {/* Main layout column */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          {/* Header */}
          <div className="fixed top-0 left-0 right-0 z-20 md:ml-64">
            <AdminHeader
              username={username}
              onLogout={onLogout}
              onOpenSidebar={() => setSidebarOpen(true)} // <-- pass open handler
            />
          </div>
          
          {/* Content */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto mt-[64px] md:mt-[72px]">
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <DataCard className="p-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm font-medium">Loading enquiries...</p>
                  </div>
                </DataCard>
              ) : error ? (
                <DataCard className="p-12">
                  <div className="text-center text-red-600">
                    <div className="mb-4">
                      <svg className="mx-auto h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold">Error loading enquiries</p>
                    <p className="mt-2 text-sm text-gray-600">{error}</p>
                  </div>
                </DataCard>
              ) : (
                <>
                  <SummaryCards />
                  <EnquiryTable />
                </>
              )}
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
    </div>
  );
};

export default AdminPortal;