"use client";

import React, { useState } from "react";
import { Play, FileText, Trash2, Sparkles } from "lucide-react";
import { VideoPlayerModal } from "./VideoPlayerModal";

interface LessonCardProps {
  index: number;
  title: string;
  videoUrl: string;
  pdfUrl?: string;
  isFree: boolean;
  onDelete?: () => void;
}

export function LessonCard({
  index,
  title,
  videoUrl,
  pdfUrl,
  isFree,
  onDelete,
}: LessonCardProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-4 sm:p-5 backdrop-blur-md transition-all duration-200 hover:border-amber-500/40 hover:shadow-md">
        
        {/* Left Side: Order Badge & Lesson Details */}
        <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 text-sm font-bold text-amber-900 dark:text-amber-300 shrink-0 shadow-xs">
            {index + 1}
          </span>
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 truncate max-w-sm sm:max-w-md">
                {title}
              </h4>
              {isFree && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                  <Sparkles className="w-3 h-3" />
                  معاينة مجانية
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              درس رقم {index + 1}
            </p>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          
          {/* Watch Video Button */}
          {videoUrl && (
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 text-xs font-bold shadow-sm transition-all duration-200 hover:shadow active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>مشاهدة الفيديو</span>
            </button>
          )}

          {/* PDF Note Button */}
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 text-xs font-bold transition-colors duration-200"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>المذكرة</span>
            </a>
          )}

          {/* Delete Button */}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors duration-200 cursor-pointer"
              title="حذف الدرس"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Feature-Rich Interactive Video Player Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
        title={title}
        lessonNumber={index + 1}
      />
    </>
  );
}

export default LessonCard;