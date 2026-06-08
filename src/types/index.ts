export type KategoriSoal = "TWK" | "TIU" | "TKP";

export interface Soal {
  id: number;
  kategori: KategoriSoal;
  soal: string;
  opsi: string[];
  jawaban: number;
}

export type SesiStatus = "active" | "done" | "pending";

export interface SesiInfo {
  kategori: KategoriSoal;
  label: string;
  durasi: number; // detik
  status: SesiStatus;
}

export interface SesiState {
  currentSesi: number;          // index 0=TWK, 1=TIU, 2=TKP
  currentQ: number;             // index soal dalam sesi aktif
  answers: Record<number, number>; // soalId -> index jawaban
  timeLeft: number;
  phase: "exam" | "sesi_done" | "all_done";
}

export interface SesiResult {
  kategori: KategoriSoal;
  correct: number;
  wrong: number;
  skip: number;
  score: number;
  total: number;
}

export interface ExamResult {
  sesiResults: SesiResult[];
  totalScore: number;
  totalCorrect: number;
  totalWrong: number;
  totalSkip: number;
  passed: boolean;
}
