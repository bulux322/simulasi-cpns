"use client";

import { Soal } from "@/types";
import { cn } from "@/lib/utils";

interface SoalGridProps {
  currentQ: number;
  answers: Record<number, number>;
  onSelect: (index: number) => void;
  onClose?: () => void;
  soalList: Soal[];
}

export default function SoalGrid({ currentQ, answers, onSelect, onClose, soalList }: SoalGridProps) {
  const answeredCount = soalList.filter((q) => answers[q.id] !== undefined).length;
  const unansweredCount = soalList.length - answeredCount;

  const handleSelect = (index: number) => {
    onSelect(index);
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
        <h3 className="font-bold text-gray-700 text-sm">Daftar Soal</h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 touch-manipulation p-1">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      <div className="flex gap-3 flex-wrap text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600 inline-block" />Aktif</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100 border border-green-400 inline-block" />Dijawab</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-100 border border-gray-300 inline-block" />Belum</span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-5 gap-1.5 max-h-60 overflow-y-auto pr-1">
        {soalList.map((soal, index) => {
          const isActive = currentQ === index;
          const isAnswered = answers[soal.id] !== undefined;
          return (
            <button
              key={soal.id}
              onClick={() => handleSelect(index)}
              className={cn(
                "aspect-square rounded-lg text-xs font-bold border-2 transition-all touch-manipulation select-none active:scale-95",
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : isAnswered
                  ? "bg-green-50 text-green-700 border-green-400"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:border-blue-300"
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs">
        <div className="flex justify-between mb-1">
          <span className="text-gray-500">Dijawab</span>
          <span className="font-bold text-green-600">{answeredCount}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Belum dijawab</span>
          <span className="font-bold text-red-500">{unansweredCount}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${(answeredCount / soalList.length) * 100}%` }} />
        </div>
        <p className="text-gray-400 text-center mt-1">{Math.round((answeredCount / soalList.length) * 100)}% selesai</p>
      </div>
    </div>
  );
}
