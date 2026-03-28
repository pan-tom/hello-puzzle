/**
 * Unsplash API compliance (see https://unsplash.com/documentation — guidelines):
 * - Hotlink: imageUrl uses photo.urls from the API (Unsplash CDN), not a rehosted file.
 * - Download: GET photo.links.download_location unchanged, then server notifies tracking.
 * - Attribution: client shows photographer + Unsplash with referral params on public links.
 */
export const DEFAULT_TOPIC = 'forest,animals'
export const UNSPLASH_RANDOM_URL = 'https://api.unsplash.com/photos/random'
export const UNSPLASH_SITE_URL = 'https://unsplash.com/'
export const UTM_SOURCE = 'hello_puzzle'
export const UTM_MEDIUM = 'referral'

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
