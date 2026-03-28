import { CORS_HEADERS } from './constants.js'

// JSON response headers.
const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  ...CORS_HEADERS,
}

// Returns a JSON response with the given payload.
export const toJsonResponse = payload => ({
  statusCode: 200,
  headers: jsonHeaders,
  body: JSON.stringify(payload),
})

// Returns a JSON response with the given status code and error message.
export const errorJsonResponse = (statusCode, error) => ({
  statusCode,
  headers: jsonHeaders,
  body: JSON.stringify({ error }),
})

// Returns a 204 No Content response with CORS headers.
export const optionsResponse = () => ({
  statusCode: 204,
  headers: CORS_HEADERS,
  body: '',
})
