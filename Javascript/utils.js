export function formatTime(secs) {
    const menit = Math.floor(secs / 60);
    const detik = secs % 60;
    return String(menit).padStart(2, "0") + ":" + String(detik).padStart(2, "0");
}