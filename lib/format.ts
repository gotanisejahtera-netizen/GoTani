export function getLocale(language: 'id' | 'en') {
  return language === 'id' ? 'id-ID' : 'en-US'
}

export function formatCurrencyAmount(value: any, language: 'id' | 'en', opts?: Intl.NumberFormatOptions) {
  if (value === null || value === undefined || value === '') return null
  const digits = String(value).replace(/[^0-9]/g, '')
  if (!digits) return String(value)
  const n = Number(digits)
  const locale = getLocale(language)
  const options: Intl.NumberFormatOptions = { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, ...(opts || {}) }
  return new Intl.NumberFormat(locale, options).format(n)
}
