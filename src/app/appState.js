const APP_ACTIONS = {
  LOAD_PICTURE: 'LOAD_PICTURE',
  SET_BUTTON_STATE: 'SET_BUTTON_STATE',
}

// App-level state: selected image and control lock state.
const initialAppState = {
  picture: null,
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
    default:
      throw new Error('Unknown app action')
  }
}

// Adds cache-busting timestamp so each request fetches a fresh random image.
const makeRandomPictureUrl = () =>
  `https://picsum.photos/800/600/?random&_t=${new Date().getTime()}`

export { appActions, appReducer, initialAppState, makeRandomPictureUrl }
