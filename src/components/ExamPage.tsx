"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Timer from "@/components/Timer";
import SoalGrid from "@/components/SoalGrid";
import QuestionCard from "@/components/QuestionCard";
import ResultPage from "@/components/ResultPage";
import SesiDoneModal from "@/components/SesiDoneModal";
import SesiProgressBar from "@/components/SesiProgressBar";
import { useExam } from "@/hooks/useExam";
import { formatTime } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";

export default function ExamPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    state,
    currentSesiInfo,
    currentSoalList,
    currentSoal,
    answeredInSesi,
    unansweredInSesi,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    endCurrentSesi,
    proceedToNextSesi,
    finishAllExam,
    restartExam,
    getResult,
  } = useExam();

  const handleEndSesi = useCallback(() => {
    if (unansweredInSesi > 0) {
      const ok = window.confirm(
        `Masih ada ${unansweredInSesi} soal yang belum dijawab di sesi ini.\nYakin ingin mengakhiri sesi ${currentSesiInfo.kategori}?`
      );
      if (!ok) return;
    }
    endCurrentSesi();
  }, [unansweredInSesi, currentSesiInfo.kategori, endCurrentSesi]);

  // ── All done ──
  if (state.phase === "all_done") {
    return (
      <>
        <Navbar />
        <ResultPage result={getResult()} onRestart={restartExam} />
      </>
    );
  }

  const t = formatTime(state.timeLeft);
  const isUrgent = state.timeLeft <= 60;
  const isLastSesi = state.currentSesi >= 2;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <Navbar />

      {/* Sesi progress stepper */}
      <SesiProgressBar currentSesi={state.currentSesi} />

      {/* ── DESKTOP (md+) ─────────────────────── */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <aside className="w-72 bg-white border-r border-gray-200 p-5 flex flex-col gap-5 overflow-y-auto flex-shrink-0">
          {/* Sesi label */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-xs text-blue-500 font-semibold mb-0.5">Sesi {state.currentSesi + 1}/3</p>
            <p className="text-sm font-bold text-blue-800">{currentSesiInfo.label}</p>
          </div>
          <Timer timeLeft={state.timeLeft} onFinish={handleEndSesi} />
          <SoalGrid currentQ={state.currentQ} answers={state.answers} onSelect={goToQuestion} soalList={currentSoalList} />
        </aside>
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <QuestionCard
            soal={currentSoal}
            currentIndex={state.currentQ}
            totalSoal={currentSoalList.length}
            selectedAnswer={state.answers[currentSoal.id]}
            sesiLabel={`${currentSesiInfo.kategori} — Sesi ${state.currentSesi + 1}/3`}
            onAnswer={selectAnswer}
            onNext={nextQuestion}
            onPrev={prevQuestion}
            onFinish={handleEndSesi}
            finishLabel={isLastSesi ? "Selesai Semua" : `Selesai Sesi ${state.currentSesi + 1}`}
          />
        </main>
      </div>

      {/* ── MOBILE (< md) ─────────────────────── */}
      <div className="flex flex-col flex-1 md:hidden overflow-hidden">
        {/* Mobile top bar */}
        <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2">
          {/* Sesi chip */}
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-lg whitespace-nowrap">
            {currentSesiInfo.kategori} {state.currentSesi + 1}/3
          </span>

          {/* Timer pill */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 flex-1 justify-center
            ${isUrgent ? "border-red-400 bg-red-50" : "border-blue-300 bg-blue-50"}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isUrgent ? "#dc2626" : "#1d4ed8"} strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className={`text-sm font-bold tabular-nums ${isUrgent ? "text-red-600" : "text-blue-700"}`}>
              {t.menit}:{t.detik}
            </span>
          </div>

          {/* Answered badge */}
          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-bold text-green-600">{answeredInSesi}</span>/{currentSoalList.length}
          </span>

          {/* Soal drawer trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1 bg-blue-600 text-white px-2.5 py-2 rounded-lg text-xs font-bold touch-manipulation active:bg-blue-800 whitespace-nowrap"
          >
            <LayoutGrid size={13} />
            Soal
          </button>
        </div>

        {/* Question area */}
        <main className="flex-1 overflow-y-auto p-3 pb-24">
          <QuestionCard
            soal={currentSoal}
            currentIndex={state.currentQ}
            totalSoal={currentSoalList.length}
            selectedAnswer={state.answers[currentSoal.id]}
            sesiLabel={`${currentSesiInfo.kategori} — Sesi ${state.currentSesi + 1}/3`}
            onAnswer={selectAnswer}
            onNext={nextQuestion}
            onPrev={prevQuestion}
            onFinish={handleEndSesi}
            finishLabel={isLastSesi ? "Selesai Semua" : `Selesai Sesi ${state.currentSesi + 1}`}
          />
        </main>

        {/* Mobile bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40">
          <button
            onClick={handleEndSesi}
            className="w-full bg-red-500 active:bg-red-700 text-white font-bold text-sm py-3.5 rounded-xl touch-manipulation select-none"
          >
            {isLastSesi ? "Selesai & Lihat Hasil" : `Akhiri Sesi ${state.currentSesi + 1}`}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────── */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 md:hidden" onClick={() => setDrawerOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 md:hidden max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="px-5 py-3 overflow-y-auto">
              <SoalGrid
                currentQ={state.currentQ}
                answers={state.answers}
                onSelect={goToQuestion}
                onClose={() => setDrawerOpen(false)}
                soalList={currentSoalList}
              />
            </div>
          </div>
        </>
      )}

      {/* ── Sesi Done Modal ─────────────────────── */}
      {state.phase === "sesi_done" && (
        <SesiDoneModal
          currentSesi={state.currentSesi}
          answeredCount={answeredInSesi}
          totalCount={currentSoalList.length}
          isTimeUp={state.timeLeft === 0}
          onContinue={proceedToNextSesi}
          onFinishAll={finishAllExam}
        />
      )}
    </div>
  );
}
