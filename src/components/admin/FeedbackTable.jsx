import React from 'react';
import { User, Calendar, MessageSquare, Star, Phone } from 'lucide-react';

const FeedbackTable = ({ feedbacks = [] }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#3B0A3B] tracking-tight">
          Feedback Submissions
        </h2>
        <div className="text-base text-gray-500 font-medium">
          Total: <span className="font-semibold text-[#B32AAC]">{feedbacks.length}</span>
        </div>
      </div>
      <div className="space-y-6">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="border border-gray-100 rounded-xl p-6 bg-gradient-to-br from-white via-[#F9F6FF] to-[#FFF7F0] hover:shadow-lg transition-colors duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
              <div className="flex items-center gap-3">
                <User className="text-[#B32AAC] bg-[#F3E8FF] rounded-full p-1" size={20} />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WhatsApp</p>
                  <p className="text-base text-gray-900 font-semibold mt-1">{fb.whatsappNumber || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-yellow-500 bg-yellow-100 rounded-full p-1" size={20} />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Experience</p>
                  <p className="text-base text-gray-900 mt-1">{fb.overallExperience}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-orange-500 bg-orange-100 rounded-full p-1" size={20} />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Food Quality</p>
                  <p className="text-base text-gray-900 mt-1">{fb.foodQuality}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="text-[#3B0A3B] bg-[#F3E8FF] rounded-full p-1" size={20} />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Service & Staff</p>
                  <p className="text-base text-gray-900 mt-1">{fb.serviceStaff}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#E78D3F] bg-orange-100 rounded-full p-1" size={20} />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tried</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Array.isArray(fb.whatDidYouTry) && fb.whatDidYouTry.length > 0 ? (
                      fb.whatDidYouTry.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs font-medium border border-orange-100"
                          style={{ wordBreak: 'break-word', maxWidth: '120px' }}
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-base text-gray-900">—</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="text-green-600 bg-green-100 rounded-full p-1" size={20} />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WhatsApp Updates</p>
                  <p className="text-base text-gray-900 mt-1">{fb.whatsappUpdates}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600 bg-blue-100 rounded-full p-1" size={20} />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</p>
                  <p className="text-base text-gray-900 mt-1">{new Date(fb.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Comments</p>
              <p className="text-base text-gray-900 leading-relaxed break-words max-h-[300px] overflow-y-auto">{fb.comments || "—"}</p>
            </div>
          </div>
        ))}
      </div>
      {feedbacks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-sm">No feedback submissions found</p>
        </div>
      )}
    </div>
  </div>
);

export default FeedbackTable;
