/**
 * Unsplash API compliance (see https://unsplash.com/documentation — guidelines):
 * - Hotlink: imageUrl uses photo.urls from the API (Unsplash CDN), not a rehosted file.
 * - Download: GET photo.links.download_location unchanged, then server notifies tracking.
 * - Attribution: client shows photographer + Unsplash with referral params on public links.
 */
const DEFAULT_TOPIC = 'forest,animals'
const UNSPLASH_RANDOM_URL = 'https://api.unsplash.com/photos/random'
const UNSPLASH_SITE_URL = 'https://unsplash.com/'
const UTM_SOURCE = 'hello_puzzle'
const UTM_MEDIUM = 'referral'
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const tryParseUrl = rawUrl => {
  if (typeof rawUrl !== 'string' || rawUrl.length === 0) {
    return null
  }
  try {
    return new URL(rawUrl)
  } catch {
    return null
  }
}

const withUnsplashUtm = url => {
  const next = new URL(url.href)
  next.searchParams.set('utm_source', UTM_SOURCE)
  next.searchParams.set('utm_medium', UTM_MEDIUM)
  return next.toString()
}

const toJsonResponse = payload => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...CORS_HEADERS,
    },
    body: JSON.stringify(payload),
  }
}

const fetchUnsplashPhoto = async (topic, accessKey) => {
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

const notifyUnsplashDownload = async (downloadLocation, accessKey) => {
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

export const handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    }
  }

  const topic = event.queryStringParameters?.topic || DEFAULT_TOPIC
  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  if (!accessKey) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        ...CORS_HEADERS,
      },
      body: JSON.stringify({
        error: 'UNSPLASH_ACCESS_KEY is required',
      }),
    }
  }

  try {
    const photoPayload = await fetchUnsplashPhoto(topic, accessKey)
    await notifyUnsplashDownload(photoPayload.downloadLocation, accessKey)

    return toJsonResponse({
      imageUrl: photoPayload.imageUrl,
      attribution: photoPayload.attribution,
    })
  } catch (error) {
    console.error(error)
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        ...CORS_HEADERS,
      },
      body: JSON.stringify({
        error: 'Failed to load puzzle image from Unsplash',
      }),
    }
  }
}
