const DEFAULT_TOPIC = 'forest,animals'
const UNSPLASH_RANDOM_URL = 'https://api.unsplash.com/photos/random'
const UTM_SOURCE = 'hello_puzzle'
const UTM_MEDIUM = 'referral'
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const createUnsplashLink = rawUrl => {
  const url = new URL(rawUrl)
  url.searchParams.set('utm_source', UTM_SOURCE)
  url.searchParams.set('utm_medium', UTM_MEDIUM)
  return url.toString()
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
  if (!payload?.urls || !payload?.links?.download_location || !payload?.user) {
    throw new Error(`No Unsplash results for "${topic}"`)
  }

  const imageUrl = new URL(payload.urls.raw || payload.urls.regular)
  imageUrl.searchParams.set('w', '800')
  imageUrl.searchParams.set('h', '800')
  imageUrl.searchParams.set('fit', 'crop')
  imageUrl.searchParams.set('crop', 'entropy')
  imageUrl.searchParams.set('auto', 'format')
  imageUrl.searchParams.set('q', '80')
  imageUrl.searchParams.set('utm_source', UTM_SOURCE)
  imageUrl.searchParams.set('utm_medium', UTM_MEDIUM)

  return {
    imageUrl: imageUrl.toString(),
    downloadLocation: payload.links.download_location,
    attribution: {
      photographerName: payload.user.name,
      photographerUrl: createUnsplashLink(payload.user.links.html),
      unsplashUrl: createUnsplashLink(payload.links.html),
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
