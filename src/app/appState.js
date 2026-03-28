const APP_ACTIONS = {
  BEGIN_WEB_IMAGE_FETCH: 'BEGIN_WEB_IMAGE_FETCH',
  WEB_IMAGE_FETCH_SUCCEEDED: 'WEB_IMAGE_FETCH_SUCCEEDED',
  WEB_IMAGE_FETCH_FAILED: 'WEB_IMAGE_FETCH_FAILED',
  START_UPLOAD_FROM_DEVICE: 'START_UPLOAD_FROM_DEVICE',
  SET_PREPARING_BOARD: 'SET_PREPARING_BOARD',
}

// App-level state: selected image and preparing board state.
export const initialAppState = {
  pictureUrl: null,
  pictureAttribution: null,
  isPictureLoading: false,
  isPreparingBoard: false,
}

// One action per user-visible flow step (board still calls setPreparingBoard for lifecycle).
export const appActions = {
  beginWebImageFetch: () => ({ type: APP_ACTIONS.BEGIN_WEB_IMAGE_FETCH }),
  webImageFetchSucceeded: ({ attribution, imageUrl }) => ({
    type: APP_ACTIONS.WEB_IMAGE_FETCH_SUCCEEDED,
    payload: { attribution, imageUrl },
  }),
  webImageFetchFailed: () => ({ type: APP_ACTIONS.WEB_IMAGE_FETCH_FAILED }),
  startUploadFromDevice: dataURL => ({
    type: APP_ACTIONS.START_UPLOAD_FROM_DEVICE,
    payload: dataURL,
  }),
  setPreparingBoard: preparing => ({
    type: APP_ACTIONS.SET_PREPARING_BOARD,
    payload: preparing,
  }),
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.BEGIN_WEB_IMAGE_FETCH:
      return {
        ...state,
        isPictureLoading: true,
        isPreparingBoard: true,
        pictureAttribution: null,
      }
    case APP_ACTIONS.WEB_IMAGE_FETCH_SUCCEEDED: {
      const { attribution, imageUrl } = action.payload
      return {
        ...state,
        pictureAttribution: attribution,
        isPictureLoading: false,
        pictureUrl: imageUrl,
      }
    }
    case APP_ACTIONS.WEB_IMAGE_FETCH_FAILED:
      return {
        ...state,
        isPictureLoading: false,
        isPreparingBoard: false,
      }
    case APP_ACTIONS.START_UPLOAD_FROM_DEVICE:
      return {
        ...state,
        pictureAttribution: null,
        isPreparingBoard: true,
        pictureUrl: action.payload,
      }
    case APP_ACTIONS.SET_PREPARING_BOARD:
      return {
        ...state,
        isPreparingBoard: action.payload,
      }
    default:
      throw new Error('Unknown app action')
  }
}

const resolveFunctionsOrigin = () => {
  const configuredOrigin = import.meta.env.VITE_FUNCTIONS_ORIGIN
  if (configuredOrigin) {
    return configuredOrigin.replace(/\/$/, '')
  }
  return ''
}

// Builds metadata endpoint request with cache-busting query.
export const makePuzzleImageRequestUrl = () => {
  const base = resolveFunctionsOrigin()
  return `${base}/.netlify/functions/puzzle-image`
}
