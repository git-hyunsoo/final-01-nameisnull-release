// 다양한 날짜 형식을 표준 ISO 8601 형식으로 정규화하기
export function parseSafeDate(dateString?: string) {
  if (!dateString) return null;

  // 예: '2026-01-31 14:30:00' → '2026-01-31T14:30:00'
  const normalized = dateString
    .replace(/\./g, '-') // 2026.01.31 → 2026-01-31
    .replace(' ', 'T'); // 공백 → T

  const date = new Date(normalized);

  return isNaN(date.getTime()) ? null : date;
}
