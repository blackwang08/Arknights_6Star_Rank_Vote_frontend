/**
 * 加上 BASE_URL
 */
export function withBaseUrl(url: string) {
  return `${BASE_URL}/${url}`.replace(/\/+/g, '/')
}
