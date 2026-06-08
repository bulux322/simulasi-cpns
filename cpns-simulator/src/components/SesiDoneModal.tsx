"use client";

import { KategoriSoal } from "@/types";
import { SESI_CONFIG, KATEGORI_LABELS } from "@/data/soal";
import { CheckCircle, ChevronRight, Flag } from "lucide-react";

interface SesiDoneModalProps {
  currentSesi: number;
  answeredCount: number;
  totalCount: number;
  isTimeUp: boolean;
  onContinue: () => void;   // lanjut ke sesi berikutnya
  onFinishAll: () => void;  // selesaikan semua (hanya jika sesi terakhir atau batal)
}

export default function SesiDoneModal({
  currentSesi,
  answeredCount,
  totalCount,
  isTimeUp,
  onContinue,
  onFinishAll,
}: SesiDoneModalProps) {
  const isLastSesi = currentSesi >= SESI_CONFIG.length - 1;
  const nextSesi = SESI_CONFIG[currentSesi + 1];
  const currSesi = SESI_CONFIG[currentSesi];
  const unanswered = totalCount - answeredCount;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden">

        {/* Header strip */}
        <div className={`px-5 py-4 text-white ${isTimeUp ? "bg-amber-500" : "bg-blue-600"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              {isTimeUp
                ? <span className="text-xl">⏰</span>
                : <CheckCircle size={22} />
              }
            </div>
            <div>
              <p className="font-bold text-base leading-snug">
                {isTimeUp ? "Waktu Habis!" : "Sesi Selesai!"}
              </p>
              <p className="text-white/80 text-xs mt-0.5">
                Sesi {currentSesi + 1}: {currSesi.label}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-green-600">{answeredCount}</div>
              <div className="text-xs text-green-700 mt-0.5 font-medium">Soal Dijawab</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-red-500">{unanswered}</div>
              <div className="text-xs text-red-600 mt-0.5 font-medium">Belum Dijawab</div>
            </div>
          </div>

          {!isLastSesi ? (
            <>
              {/* Next sesi info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                <p className="text-xs text-blue-600 font-semibold mb-1">Sesi Berikutnya:</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-blue-800 text-sm">{nextSesi?.kategori}</span>
                    <span className="text-blue-600 text-xs ml-2">{KATEGORI_LABELS[nextSesi?.kategori]}</span>
                  </div>
                  <span className="text-blue-600 text-xs font-semibold bg-blue-100 px-2 py-0.5 rounded-full">7 menit</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm text-center mb-4">
                Apakah Anda siap melanjutkan ke sesi berikutnya?
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={onContinue}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm py-3.5 rounded-xl transition-colors touch-manipulation"
                >
                  Lanjut ke Sesi {currentSesi + 2}
                  <ChevronRight size={17} />
                </button>
                <button
                  onClick={onFinishAll}
                  className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium py-2 rounded-xl transition-colors touch-manipulation"
                >
                  Akhiri Semua Ujian
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 text-sm text-center mb-4">
                Anda telah menyelesaikan semua sesi ujian. Lihat hasil Anda!
              </p>
              <button
                onClick={onFinishAll}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm py-3.5 rounded-xl transition-colors touch-manipulation"
              >
                <Flag size={16} />
                Lihat Hasil Ujian
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
