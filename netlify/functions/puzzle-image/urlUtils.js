import { UTM_MEDIUM, UTM_SOURCE } from './constants.js'

// Tries to parse a URL string into a URL object.
export const tryParseUrl = rawUrl => {
  if (typeof rawUrl !== 'string' || rawUrl.length === 0) {
    return null
  }
  try {
    return new URL(rawUrl)
  } catch {
    return null
  }
}

// Adds Unsplash UTM parameters to a URL.
export const withUnsplashUtm = url => {
  const next = new URL(url.href)
  next.searchParams.set('utm_source', UTM_SOURCE)
  next.searchParams.set('utm_medium', UTM_MEDIUM)
  return next.toString()
}
