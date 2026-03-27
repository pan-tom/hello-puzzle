const APP_ACTIONS = {
  LOAD_PICTURE: 'LOAD_PICTURE',
  SET_PICTURE_LOADING: 'SET_PICTURE_LOADING',
  SET_PICTURE_ATTRIBUTION: 'SET_PICTURE_ATTRIBUTION',
}

// App-level state: selected image and control lock state.
export const initialAppState = {
  picture: null,
  pictureAttribution: null,
  isPictureLoading: false,
}

// Action creators keep dispatch payloads consistent.
export const appActions = {
  loadPicture: pictureUrl => ({
    type: APP_ACTIONS.LOAD_PICTURE,
    payload: pictureUrl,
  }),
  setPictureLoading: isLoading => ({
    type: APP_ACTIONS.SET_PICTURE_LOADING,
    payload: isLoading,
  }),
  setPictureAttribution: attribution => ({
    type: APP_ACTIONS.SET_PICTURE_ATTRIBUTION,
    payload: attribution,
  }),
}

// Handles app state transitions for image loading and button lock.
export const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.LOAD_PICTURE:
      return {
        ...state,
        isPictureLoading: true,
        picture: action.payload,
      }
    case APP_ACTIONS.SET_PICTURE_LOADING:
      return {
        ...state,
        isPictureLoading: action.payload,
      }
    case APP_ACTIONS.SET_PICTURE_ATTRIBUTION:
      return {
        ...state,
        pictureAttribution: action.payload,
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
