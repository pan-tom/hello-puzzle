import { useCallback, useReducer } from 'react'
import {
  appActions,
  appReducer,
  initialAppState,
  makePuzzleImageRequestUrl,
} from './appState'

// Encapsulates app-level state transitions and UI handlers.
const useAppController = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)
  const { pictureUrl, pictureAttribution, isPictureLoading, isPreparingBoard } =
    state

  const setPreparingBoard = useCallback(preparing => {
    dispatch(appActions.setPreparingBoard(preparing))
  }, [])

  const handleLoadPicture = useCallback(async () => {
    dispatch(appActions.beginWebImageFetch())

    try {
      const response = await fetch(makePuzzleImageRequestUrl())
      if (!response.ok) {
        throw new Error(`Puzzle image endpoint failed (${response.status})`)
      }

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        const text = await response.text()
        const snippet = text.slice(0, 80).replace(/\s+/g, ' ')
        throw new Error(
          `Puzzle image endpoint returned non-JSON response: "${snippet}". ` +
            'Check local function server routing.'
        )
      }

      const payload = await response.json()
      if (!payload?.imageUrl) {
        throw new Error('Puzzle image endpoint returned no imageUrl')
      }

      dispatch(
        appActions.webImageFetchSucceeded({
          attribution: payload.attribution || null,
          imageUrl: payload.imageUrl,
        })
      )
    } catch (error) {
      console.error(error)
      dispatch(appActions.webImageFetchFailed())
    }
  }, [])

  const handleUploadPicture = useCallback(dataURL => {
    dispatch(appActions.startUploadFromDevice(dataURL))
  }, [])

  return {
    pictureUrl,
    pictureAttribution,
    isPictureLoading,
    isPreparingBoard,
    handleLoadPicture,
    handleUploadPicture,
    setPreparingBoard,
  }
}

export default useAppController
