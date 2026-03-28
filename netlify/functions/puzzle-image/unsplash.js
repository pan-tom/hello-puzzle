import {
  UNSPLASH_RANDOM_URL,
  UNSPLASH_SITE_URL,
  UTM_MEDIUM,
  UTM_SOURCE,
} from './constants.js'
import { tryParseUrl, withUnsplashUtm } from './urlUtils.js'

// Fetches a random Unsplash photo matching the given topic.
export const fetchUnsplashPhoto = async (topic, accessKey) => {
  const randomUrl = new URL(UNSPLASH_RANDOM_URL)
  randomUrl.searchParams.set('query', topic)
  randomUrl.searchParams.set('orientation', 'landscape')

  const randomResponse = await fetch(randomUrl.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      'Accept-Version': 'v1',
    },
  })

  if (!randomResponse.ok) {
    throw new Error(`Unsplash API failed (${randomResponse.status})`)
  }

  const payload = await randomResponse.json()
  const urls = payload?.urls
  const baseImageUrl =
    (typeof urls?.raw === 'string' && urls.raw) ||
    (typeof urls?.regular === 'string' && urls.regular)
  if (
    !baseImageUrl ||
    !payload?.links?.download_location ||
    typeof payload?.user?.name !== 'string' ||
    typeof payload?.user?.links?.html !== 'string'
  ) {
    throw new Error(`No Unsplash results for "${topic}"`)
  }

  const imageUrlObj = tryParseUrl(baseImageUrl)
  const photographerUrlObj = tryParseUrl(payload.user.links.html)
  const unsplashSiteUrlObj = tryParseUrl(UNSPLASH_SITE_URL)
  if (!imageUrlObj || !photographerUrlObj || !unsplashSiteUrlObj) {
    throw new Error(`No Unsplash results for "${topic}"`)
  }

  imageUrlObj.searchParams.set('w', '800')
  imageUrlObj.searchParams.set('h', '800')
  imageUrlObj.searchParams.set('fit', 'crop')
  imageUrlObj.searchParams.set('crop', 'entropy')
  imageUrlObj.searchParams.set('auto', 'format')
  imageUrlObj.searchParams.set('q', '80')
  imageUrlObj.searchParams.set('utm_source', UTM_SOURCE)
  imageUrlObj.searchParams.set('utm_medium', UTM_MEDIUM)

  return {
    imageUrl: imageUrlObj.toString(),
    downloadLocation: payload.links.download_location,
    attribution: {
      photographerName: payload.user.name,
      photographerUrl: withUnsplashUtm(photographerUrlObj),
      unsplashUrl: withUnsplashUtm(unsplashSiteUrlObj),
    },
  }
}

// Notifies Unsplash of a download using the download location.
export const notifyUnsplashDownload = async (downloadLocation, accessKey) => {
  const response = await fetch(downloadLocation, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      'Accept-Version': 'v1',
    },
  })

  if (!response.ok) {
    throw new Error(`Unsplash download tracking failed (${response.status})`)
  }
}
