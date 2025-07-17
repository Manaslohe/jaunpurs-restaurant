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

const AdminPortal = ({ onLogout, username = 'manas' }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      <DataCard className="flex items-center gap-4 p-6">
        <Calendar className="text-blue-600" size={32} />
        <div>
          <p className="text-sm text-gray-500 font-medium">Today's Enquiries</p>
          <p className="text-2xl font-bold text-blue-700">{todayCount}</p>
        </div>
      </DataCard>
      <DataCard className="flex items-center gap-4 p-6">
        <div className="text-green-600" size={32}>
          <Calendar className="text-green-600" size={32} />
        </div>
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
            <Calendar className="text-green-600" size={28} />
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
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
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
                ) : error ? (
                  <DataCard className="p-12">
                    <div className="text-center text-red-600">
                      <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                        </svg>
                      </div>
                      <p className="text-lg font-bold">Error loading enquiries</p>
                      <p className="mt-2 text-base">{error}</p>
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
    </div>
  );
};

export default AdminPortal;