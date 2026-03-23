import { useCallback, useReducer } from 'react'
import {
  appActions,
  appReducer,
  initialAppState,
  makeRandomPictureUrl,
} from './appState'

// Encapsulates app-level state transitions and UI handlers.
const useAppController = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)
  const { picture, isButtonDisabled } = state

  // Loads a random image and starts board initialization.
  const handleLoadPicture = useCallback(() => {
    dispatch(appActions.loadPicture(makeRandomPictureUrl()))
  }, [])

  // Uses user-provided image data URL as puzzle source.
  const handleUploadPicture = useCallback(dataURL => {
    dispatch(appActions.loadPicture(dataURL))
  }, [])

  // Enables/disables load/upload controls during board lifecycle.
  const setButtonState = useCallback(flag => {
    dispatch(appActions.setButtonState(flag))
  }, [])

  return {
    picture,
    isButtonDisabled,
    handleLoadPicture,
    handleUploadPicture,
    setButtonState,
  }
}

export default useAppController
