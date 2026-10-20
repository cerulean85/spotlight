/**
 * 'YYYY-MM'    -> 'September 2021'
 * 'YYYY-MM-DD' -> 'October 15, 2026'
 */
export function formatDate(dateString: string) {
  let hasDay = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
  let normalized = hasDay ? dateString : `${dateString}-01`

  return new Date(`${normalized}T00:00:00Z`).toLocaleDateString('en-US', {
    ...(hasDay && { day: 'numeric' }),
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** 'YYYY-MM' -> 'YYYY.MM' */
function formatYearMonth(dateString: string) {
  let [year, month] = dateString.split('-')
  return `${year}.${month}`
}

/** Project period, e.g. '2024.04 – 2025.12' or '2026.09 – 진행 중' */
export function formatPeriod(startDate: string, endDate?: string) {
  return `${formatYearMonth(startDate)} – ${endDate ? formatYearMonth(endDate) : '진행 중'}`
}
