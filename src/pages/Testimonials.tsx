import React, { useState } from 'react';
import { Star, Quote, Send, CheckCircle2, User, Globe2 } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { Testimonial } from '../types';

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [authorName, setAuthorName] = useState('');
  const [country, setCountry] = useState('');
  const [tourTaken, setTourTaken] = useState('Somaliland Grand Discovery Tour');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newRev: Testimonial = {
      id: `test-${Date.now()}`,
      name: authorName,
      country: country || 'International Traveler',
      tourTaken,
      rating,
      date: 'Just now (Demo)',
      review: reviewText,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setAuthorName('');
    setCountry('');
    setReviewText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Guest Feedback & Stories
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Guest Testimonials
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Read what previous adventurers, solo travelers, and cultural historians share about their experiences traversing Somaliland with Golis Expeditions. Note: Sample demonstration feedback.
          </p>
        </div>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{rev.review}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#161A18] font-display">{rev.name}</h4>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Globe2 className="w-3 h-3 text-[#0F382A]" />
                  {rev.country}
                </span>
              </div>
              <span className="text-[11px] text-[#0F382A] font-semibold bg-[#0F382A]/5 px-2.5 py-1 rounded">
                {rev.tourTaken}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Leave a Review Interactive Form */}
      <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200 p-8 sm:p-10 max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-[#161A18] font-display">
            Leave a Demonstration Review
          </h3>
          <p className="text-xs text-slate-500">
            Simulate submitting your travel feedback to experience real-time React state updates on the frontend.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
            <p className="text-sm font-bold">Review Added Successfully!</p>
            <p className="text-xs text-emerald-700">Your review is now rendered live at the top of the list above.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-emerald-800 underline mt-2 block mx-auto"
            >
              Write Another Review
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Country of Origin</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Canada"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tour Completed</label>
                <select
                  value={tourTaken}
                  onChange={(e) => setTourTaken(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Somaliland Grand Discovery Tour">Somaliland Grand Discovery Tour</option>
                  <option value="Laas Geel Prehistoric Rock Art Tour">Laas Geel Rock Art Tour</option>
                  <option value="Berbera Coastal Escape">Berbera Coastal Escape</option>
                  <option value="Sheikh Mountain Adventure">Sheikh Mountain Adventure</option>
                  <option value="Zeila Ancient Maritime Expedition">Zeila Maritime Expedition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 / 5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 / 5)</option>
                  <option value={3}>⭐⭐⭐ (3 / 5)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review *</label>
              <textarea
                required
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your impressions of Somaliland, the guides, and the archaeological sites..."
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] text-white font-bold text-xs sm:text-sm py-2.5 rounded-lg shadow transition-colors"
            >
              <Send className="w-4 h-4 text-[#C5A059]" />
              <span>Submit Demonstration Review</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
