"use client";

import { Soal } from "@/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface QuestionCardProps {
  soal: Soal;
  currentIndex: number;
  totalSoal: number;
  selectedAnswer?: number;
  sesiLabel: string;
  finishLabel: string;
  onAnswer: (soalId: number, opsiIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

const KATEGORI_COLOR: Record<string, string> = {
  TWK: "bg-blue-100 text-blue-700",
  TIU: "bg-purple-100 text-purple-700",
  TKP: "bg-emerald-100 text-emerald-700",
};

export default function QuestionCard({
  soal,
  currentIndex,
  totalSoal,
  selectedAnswer,
  sesiLabel,
  finishLabel,
  onAnswer,
  onNext,
  onPrev,
  onFinish,
}: QuestionCardProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSoal - 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 w-full">
      {/* Header */}
      <div className="pb-3 border-b border-gray-100 mb-3">
        <p className="text-xs text-gray-400 font-medium">{sesiLabel}</p>
      </div>

      {/* Kategori + counter */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn("text-xs font-semibold px-3 py-1 rounded-full", KATEGORI_COLOR[soal.kategori] ?? "bg-gray-100 text-gray-700")}>
          {soal.kategori}
        </span>
        <span className="text-xs text-gray-400 font-medium">{currentIndex + 1} / {totalSoal}</span>
      </div>

      {/* Soal */}
      <p className="text-sm sm:text-[15px] font-semibold text-gray-800 mb-4 leading-relaxed">
        {currentIndex + 1}. {soal.soal}
      </p>

      {/* Opsi */}
      <div className="flex flex-col gap-2.5">
        {soal.opsi.map((opsi, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedAnswer === idx;
          return (
            <button
              key={idx}
              onClick={() => onAnswer(soal.id, idx)}
              className={cn(
                "flex items-center gap-3 px-3 sm:px-4 py-3.5 rounded-xl border-2 text-left transition-all touch-manipulation select-none active:scale-[0.99] w-full",
                isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
              )}
            >
              <span className={cn(
                "w-8 h-8 min-w-[2rem] rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0",
                isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-500"
              )}>
                {letter}
              </span>
              <span className={cn("text-sm font-medium flex-1 text-left", isSelected ? "text-blue-800" : "text-gray-700")}>
                {opsi}
              </span>
              {isSelected && <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={cn(
            "flex items-center gap-1 px-3 sm:px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all touch-manipulation select-none active:scale-95 min-w-[80px] justify-center",
            isFirst ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
          )}
        >
          <ChevronLeft size={16} />
          <span>Prev</span>
        </button>

        {isLast ? (
          <button
            onClick={onFinish}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-semibold transition-colors touch-manipulation select-none active:scale-95"
          >
            <CheckCircle size={15} />
            <span className="text-xs sm:text-sm">{finishLabel}</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-1 px-3 sm:px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold transition-colors touch-manipulation select-none active:scale-95 min-w-[80px] justify-center"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
