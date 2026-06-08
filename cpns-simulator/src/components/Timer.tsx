"use client";

import { formatTime } from "@/lib/utils";

interface TimerProps {
  timeLeft: number;
  onFinish: () => void;
}

export default function Timer({ timeLeft, onFinish }: TimerProps) {
  const { jam, menit, detik } = formatTime(timeLeft);
  const isUrgent = timeLeft <= 60;
  const isWarning = timeLeft <= 120 && timeLeft > 60;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1.5 justify-center">
        {[
          { label: "Jam", value: jam },
          { label: "Menit", value: menit },
          { label: "Detik", value: detik },
        ].map(({ label, value }) => (
          <div
            key={label}
            className={`flex flex-col items-center justify-center border-2 rounded-xl flex-1 py-2 px-1 transition-colors ${
              isUrgent
                ? "border-red-500 bg-red-50"
                : isWarning
                ? "border-amber-400 bg-amber-50"
                : "border-blue-500 bg-white"
            }`}
          >
            <span
              className={`text-xl sm:text-2xl font-bold leading-none tabular-nums ${
                isUrgent ? "text-red-600 animate-pulse" : isWarning ? "text-amber-600" : "text-blue-700"
              }`}
            >
              {value}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5 font-medium">{label}</span>
          </div>
        ))}
      </div>
      {(isUrgent || isWarning) && (
        <p className={`text-xs text-center font-semibold ${isUrgent ? "text-red-500 animate-pulse" : "text-amber-500"}`}>
          {isUrgent ? "⚠ Waktu hampir habis!" : "⏰ Sisa 2 menit!"}
        </p>
      )}
      <button
        onClick={onFinish}
        className="w-full bg-red-500 active:bg-red-700 hover:bg-red-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors touch-manipulation select-none"
      >
        Akhiri Ujian
      </button>
    </div>
  );
}
