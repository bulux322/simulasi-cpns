"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SesiState, ExamResult, SesiResult } from "@/types";
import { SOAL_DATA, SESI_CONFIG, getSoalBySesi, MAX_SCORE_PER_SESI, KKM_SCORE } from "@/data/soal";

const buildInitialState = (): SesiState => ({
  currentSesi: 0,
  currentQ: 0,
  answers: {},
  timeLeft: SESI_CONFIG[0].durasi,
  phase: "exam",
});

export function useExam() {
  const [state, setState] = useState<SesiState>(buildInitialState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSesiInfo = SESI_CONFIG[state.currentSesi];
  const currentSoalList = getSoalBySesi(currentSesiInfo.kategori);
  const currentSoal = currentSoalList[state.currentQ];

  // ── Timer ──────────────────────────────────────────
  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.phase !== "exam") { clearTimer(); return prev; }
        const next = prev.timeLeft - 1;
        if (next <= 0) {
          clearTimer();
          // time's up → langsung sesi_done
          return { ...prev, timeLeft: 0, phase: "sesi_done" };
        }
        return { ...prev, timeLeft: next };
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer]);

  // Re-start timer when sesi changes
  useEffect(() => {
    if (state.phase === "exam") startTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentSesi]);

  // ── Actions ────────────────────────────────────────
  const selectAnswer = useCallback((soalId: number, opsiIndex: number) => {
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [soalId]: opsiIndex } }));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setState((prev) => ({ ...prev, currentQ: index }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => ({ ...prev, currentQ: Math.min(prev.currentQ + 1, currentSoalList.length - 1) }));
  }, [currentSoalList.length]);

  const prevQuestion = useCallback(() => {
    setState((prev) => ({ ...prev, currentQ: Math.max(prev.currentQ - 1, 0) }));
  }, []);

  /** Dipanggil ketika user menekan "Akhiri Sesi" manual */
  const endCurrentSesi = useCallback(() => {
    clearTimer();
    setState((prev) => ({ ...prev, phase: "sesi_done" }));
  }, []);

  /** Dipanggil setelah konfirmasi modal → lanjut ke sesi berikutnya */
  const proceedToNextSesi = useCallback(() => {
    setState((prev) => {
      const nextSesi = prev.currentSesi + 1;
      if (nextSesi >= SESI_CONFIG.length) {
        return { ...prev, phase: "all_done" };
      }
      return {
        ...prev,
        currentSesi: nextSesi,
        currentQ: 0,
        timeLeft: SESI_CONFIG[nextSesi].durasi,
        phase: "exam",
      };
    });
  }, []);

  /** Dipanggil setelah konfirmasi modal → langsung selesai semua */
  const finishAllExam = useCallback(() => {
    clearTimer();
    setState((prev) => ({ ...prev, phase: "all_done" }));
  }, []);

  const restartExam = useCallback(() => {
    clearTimer();
    setState(buildInitialState());
    setTimeout(startTimer, 50);
  }, [startTimer]);

  // ── Result ─────────────────────────────────────────
  const getResult = useCallback((): ExamResult => {
    const sesiResults: SesiResult[] = SESI_CONFIG.map((sesi) => {
      const soalList = getSoalBySesi(sesi.kategori);
      let correct = 0, wrong = 0, skip = 0;
      soalList.forEach((q) => {
        if (state.answers[q.id] === undefined) skip++;
        else if (state.answers[q.id] === q.jawaban) correct++;
        else wrong++;
      });
      const score = Math.round((correct / soalList.length) * MAX_SCORE_PER_SESI);
      return { kategori: sesi.kategori, correct, wrong, skip, score, total: soalList.length };
    });
    const totalCorrect = sesiResults.reduce((a, r) => a + r.correct, 0);
    const totalWrong = sesiResults.reduce((a, r) => a + r.wrong, 0);
    const totalSkip = sesiResults.reduce((a, r) => a + r.skip, 0);
    const totalScore = Math.round(sesiResults.reduce((a, r) => a + r.score, 0) / sesiResults.length);
    return { sesiResults, totalScore, totalCorrect, totalWrong, totalSkip, passed: totalScore >= KKM_SCORE };
  }, [state.answers]);

  // ── Derived ────────────────────────────────────────
  const answeredInSesi = currentSoalList.filter((q) => state.answers[q.id] !== undefined).length;
  const unansweredInSesi = currentSoalList.length - answeredInSesi;

  return {
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
  };
}
