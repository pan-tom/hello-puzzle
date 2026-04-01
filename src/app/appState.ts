const APP_ACTIONS = {
  BEGIN_WEB_IMAGE_FETCH: 'BEGIN_WEB_IMAGE_FETCH',
  WEB_IMAGE_FETCH_SUCCEEDED: 'WEB_IMAGE_FETCH_SUCCEEDED',
  WEB_IMAGE_FETCH_FAILED: 'WEB_IMAGE_FETCH_FAILED',
  START_UPLOAD_FROM_DEVICE: 'START_UPLOAD_FROM_DEVICE',
  SET_PREPARING_BOARD: 'SET_PREPARING_BOARD',
} as const

// App-level state: selected image and preparing board state.
export const initialAppState = {
  pictureUrl: null,
  pictureAttribution: null,
  isPictureLoading: false,
  pictureFetchError: null,
  isPreparingBoard: false,
}

// One action per user-visible flow step (board still calls setPreparingBoard for lifecycle).
export const appActions = {
  beginWebImageFetch: () => ({
    type: APP_ACTIONS.BEGIN_WEB_IMAGE_FETCH,
  }),
  webImageFetchSucceeded: ({
    attribution,
    imageUrl,
  }: {
    attribution: PictureAttribution
    imageUrl: string
  }) => ({
    type: APP_ACTIONS.WEB_IMAGE_FETCH_SUCCEEDED,
    payload: { attribution, imageUrl },
  }),
  webImageFetchFailed: (message: string) => ({
    type: APP_ACTIONS.WEB_IMAGE_FETCH_FAILED,
    payload: message,
  }),
  startUploadFromDevice: (dataURL: string) => ({
    type: APP_ACTIONS.START_UPLOAD_FROM_DEVICE,
    payload: dataURL,
  }),
  setPreparingBoard: (preparing: boolean) => ({
    type: APP_ACTIONS.SET_PREPARING_BOARD,
    payload: preparing,
  }),
}

export type PictureAttribution = {
  photographerUrl: string
  photographerName: string
  unsplashUrl: string
} | null

export type AppState = {
  pictureUrl: string | null
  pictureAttribution: PictureAttribution
  isPictureLoading: boolean
  pictureFetchError: string | null
  isPreparingBoard: boolean
}
export type AppAction = ReturnType<(typeof appActions)[keyof typeof appActions]>

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case APP_ACTIONS.BEGIN_WEB_IMAGE_FETCH:
      return {
        ...state,
        isPictureLoading: true,
        pictureAttribution: null,
        pictureFetchError: null,
        isPreparingBoard: true,
      }
    case APP_ACTIONS.WEB_IMAGE_FETCH_SUCCEEDED: {
      const { attribution, imageUrl } = action.payload
      return {
        ...state,
        isPictureLoading: false,
        pictureAttribution: attribution,
        pictureUrl: imageUrl,
        pictureFetchError: null,
      }
    }
    case APP_ACTIONS.WEB_IMAGE_FETCH_FAILED:
      return {
        ...state,
        isPictureLoading: false,
        pictureAttribution: null,
        isPreparingBoard: false,
        pictureFetchError:
          typeof action.payload === 'string' && action.payload
            ? action.payload
            : 'Could not load an image from the web.',
      }
    case APP_ACTIONS.START_UPLOAD_FROM_DEVICE:
      return {
        ...state,
        pictureAttribution: null,
        pictureUrl: action.payload,
        pictureFetchError: null,
        isPreparingBoard: true,
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

// Builds metadata endpoint request with cache-busting query.
export const makePuzzleImageRequestUrl = () => {
  const origin = import.meta.env.VITE_FUNCTIONS_ORIGIN || ''
  return `${origin}/.netlify/functions/puzzle-image`
}
