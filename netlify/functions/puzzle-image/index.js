import { DEFAULT_TOPIC } from './constants.js'
import {
  errorJsonResponse,
  optionsResponse,
  toJsonResponse,
} from './responses.js'
import { fetchUnsplashPhoto, notifyUnsplashDownload } from './unsplash.js'

// Netlify Functions handler for puzzle image endpoint.
export const handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse()
  }

  const topic = event.queryStringParameters?.topic || DEFAULT_TOPIC
  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  if (!accessKey) {
    return errorJsonResponse(500, 'UNSPLASH_ACCESS_KEY is required')
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
    return errorJsonResponse(502, 'Failed to load puzzle image from Unsplash')
  }
}
