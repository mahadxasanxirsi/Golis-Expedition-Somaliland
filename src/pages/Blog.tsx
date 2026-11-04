import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, X, Tag, BookOpen } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { BLOG_DATA } from '../data/blog';
import { BlogPost } from '../types';

export const Blog: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = ['all', 'Laas Geel', 'Rock Art', 'Berbera', 'Sheikh', 'Travel Tips', 'Culture'];

  const filteredPosts = selectedTag === 'all'
    ? BLOG_DATA
    : BLOG_DATA.filter((post) => post.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Dispatches from the Horn
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Somaliland Travel & Culture Blog
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Archaeological discoveries, coastal histories, highland trekking guides, and cultural essays penned by our guides, historians, and researchers.
          </p>
        </div>
      </div>

      {/* Tag Filter */}
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500 mr-2">Filter by Topic:</span>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 text-xs rounded-full transition-colors cursor-pointer ${
              selectedTag === tag
                ? 'bg-[#0F382A] text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tag === 'all' ? 'All Articles' : tag}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0F382A]/90 backdrop-blur-sm text-[#C5A059] text-[10px] font-bold px-2.5 py-1 rounded">
                  {post.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    {post.date}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#161A18] group-hover:text-[#0F382A] transition-colors leading-snug font-display">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <User className="w-3.5 h-3.5 text-[#0F382A]" aria-hidden="true" />
                  <span>By {post.author}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => setActiveArticle(post)}
                aria-label={`Read full article: ${post.title}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF9F5] hover:bg-[#0F382A] hover:text-white text-[#0F382A] text-xs font-bold py-2.5 rounded-lg border border-slate-300 transition-colors cursor-pointer"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-article-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="relative h-64 bg-slate-900 shrink-0">
              <ImageWithFallback
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                  {activeArticle.category}
                </span>
                <h2 id="blog-article-modal-title" className="text-xl sm:text-2xl font-bold font-display leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <span>By <strong>{activeArticle.author}</strong></span>
                <span>Published {activeArticle.date} · {activeArticle.readTime}</span>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 items-center">
                <Tag className="w-4 h-4 text-slate-400" />
                {activeArticle.tags.map((t, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
