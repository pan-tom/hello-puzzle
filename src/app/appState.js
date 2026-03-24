const APP_ACTIONS = {
  LOAD_PICTURE: 'LOAD_PICTURE',
  SET_BUTTON_STATE: 'SET_BUTTON_STATE',
  SET_PICTURE_ATTRIBUTION: 'SET_PICTURE_ATTRIBUTION',
}

// App-level state: selected image and control lock state.
const initialAppState = {
  picture: null,
  pictureAttribution: null,
  isButtonDisabled: false,
}

// Action creators keep dispatch payloads consistent.
const appActions = {
  loadPicture: pictureUrl => ({
    type: APP_ACTIONS.LOAD_PICTURE,
    payload: pictureUrl,
  }),
  setButtonState: isEnabled => ({
    type: APP_ACTIONS.SET_BUTTON_STATE,
    payload: isEnabled,
  }),
  setPictureAttribution: attribution => ({
    type: APP_ACTIONS.SET_PICTURE_ATTRIBUTION,
    payload: attribution,
  }),
}

// Handles app state transitions for image loading and button lock.
const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.LOAD_PICTURE:
      return {
        ...state,
        isButtonDisabled: true,
        picture: action.payload,
      }
    case APP_ACTIONS.SET_BUTTON_STATE:
      return {
        ...state,
        isButtonDisabled: !action.payload,
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
const makePuzzleImageRequestUrl = () => {
  const base = resolveFunctionsOrigin()
  return `${base}/.netlify/functions/puzzle-image`
}

export { appActions, appReducer, initialAppState, makePuzzleImageRequestUrl }
