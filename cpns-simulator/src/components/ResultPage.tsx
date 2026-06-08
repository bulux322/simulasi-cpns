"use client";

import { ExamResult } from "@/types";
import { EXAM_TITLE, KKM_SCORE, KATEGORI_LABELS } from "@/data/soal";
import { Trophy, RotateCcw, CheckCircle, XCircle, MinusCircle } from "lucide-react";

interface ResultPageProps {
  result: ExamResult;
  onRestart: () => void;
}

const SESI_COLOR: Record<string, string> = {
  TWK: "bg-blue-500",
  TIU: "bg-purple-500",
  TKP: "bg-emerald-500",
};
const SESI_BADGE: Record<string, string> = {
  TWK: "bg-blue-100 text-blue-700",
  TIU: "bg-purple-100 text-purple-700",
  TKP: "bg-emerald-100 text-emerald-700",
};

export default function ResultPage({ result, onRestart }: ResultPageProps) {
  const { sesiResults, totalScore, totalCorrect, totalWrong, totalSkip, passed } = result;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pb-10">
      <div className="w-full max-w-lg">

        {/* Score card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center mb-4">
          <div className="flex justify-center mb-3">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${passed ? "bg-blue-100" : "bg-red-100"}`}>
              <Trophy size={36} className={passed ? "text-blue-600" : "text-red-400"} />
            </div>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-0.5">Ujian Selesai!</h1>
          <p className="text-xs sm:text-sm text-gray-400 mb-4 px-2">{EXAM_TITLE}</p>
          <div className="text-6xl sm:text-7xl font-black text-blue-700 leading-none mb-1">{totalScore}</div>
          <p className="text-gray-400 text-sm mb-4">Rata-rata Skor</p>
          <span className={`inline-block px-5 py-2 rounded-full font-bold text-sm ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            {passed ? "✓ LULUS" : "✗ TIDAK LULUS"} (KKM: {KKM_SCORE})
          </span>
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: <CheckCircle size={22} className="text-green-500" />, value: totalCorrect, label: "Benar", color: "text-green-600" },
            { icon: <XCircle size={22} className="text-red-400" />, value: totalWrong, label: "Salah", color: "text-red-500" },
            { icon: <MinusCircle size={22} className="text-amber-400" />, value: totalSkip, label: "Dilewati", color: "text-amber-500" },
          ].map(({ icon, value, label, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-3 text-center shadow-sm">
              <div className="flex justify-center mb-1">{icon}</div>
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <div className="text-[11px] text-gray-500 font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* Per sesi */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
          <h3 className="font-bold text-gray-700 text-sm mb-4">Perincian per Sesi</h3>
          <div className="flex flex-col gap-5">
            {sesiResults.map((r) => {
              const pct = Math.round((r.correct / r.total) * 100);
              return (
                <div key={r.kategori}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${SESI_BADGE[r.kategori]}`}>{r.kategori}</span>
                      <span className="text-xs text-gray-500 hidden sm:inline">{KATEGORI_LABELS[r.kategori]}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{r.score} <span className="text-xs text-gray-400 font-normal">/ 500</span></span>
                  </div>
                  {/* Mini stats */}
                  <div className="flex gap-3 text-xs mb-2">
                    <span className="text-green-600 font-semibold">✓ {r.correct} benar</span>
                    <span className="text-red-500 font-semibold">✗ {r.wrong} salah</span>
                    <span className="text-amber-500 font-semibold">– {r.skip} skip</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${SESI_COLOR[r.kategori]}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 text-right">{pct}%</p>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base py-4 rounded-2xl transition-colors touch-manipulation"
        >
          <RotateCcw size={18} />
          Mulai Ulang Tryout
        </button>
      </div>
    </div>
  );
}
