export function formatTime(seconds: number): {
  jam: string;
  menit: string;
  detik: string;
} {
  const jam = Math.floor(seconds / 3600);
  const menit = Math.floor((seconds % 3600) / 60);
  const detik = seconds % 60;
  return {
    jam: String(jam).padStart(2, "0"),
    menit: String(menit).padStart(2, "0"),
    detik: String(detik).padStart(2, "0"),
  };
}

export function cn(...classes: (string | undefined | boolean | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
