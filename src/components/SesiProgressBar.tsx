"use client";

import { SESI_CONFIG } from "@/data/soal";
import { Check } from "lucide-react";

interface SesiProgressBarProps {
  currentSesi: number;
}

export default function SesiProgressBar({ currentSesi }: SesiProgressBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-center gap-1 max-w-xs mx-auto">
        {SESI_CONFIG.map((sesi, index) => {
          const isDone = index < currentSesi;
          const isActive = index === currentSesi;
          const isPending = index > currentSesi;
          return (
            <div key={sesi.kategori} className="flex items-center gap-1">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${isDone ? "bg-green-500 text-white" : isActive ? "bg-blue-600 text-white ring-2 ring-blue-300" : "bg-gray-200 text-gray-400"}`}>
                  {isDone ? <Check size={13} /> : <span>{index + 1}</span>}
                </div>
                <span className={`text-[9px] mt-0.5 font-semibold ${isActive ? "text-blue-600" : isDone ? "text-green-600" : "text-gray-400"}`}>
                  {sesi.kategori}
                </span>
              </div>
              {/* Connector */}
              {index < SESI_CONFIG.length - 1 && (
                <div className={`h-0.5 w-8 sm:w-12 mb-3 rounded-full transition-all ${isDone ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
