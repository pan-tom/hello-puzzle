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
  const { picture, pictureAttribution, isPictureLoading } = state

  // Requests Unsplash metadata through Netlify and starts board initialization.
  const handleLoadPicture = useCallback(async () => {
    dispatch(appActions.setPictureLoading(true))

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

      dispatch(appActions.setPictureAttribution(payload.attribution || null))
      dispatch(appActions.loadPicture(payload.imageUrl))
    } catch (error) {
      console.error(error)
      dispatch(appActions.setPictureLoading(false))
    }
  }, [])

  // Uses user-provided image data URL as puzzle source.
  const handleUploadPicture = useCallback(dataURL => {
    dispatch(appActions.setPictureAttribution(null))
    dispatch(appActions.loadPicture(dataURL))
  }, [])

  // Enables/disables load/upload controls during board lifecycle.
  const setPictureLoading = useCallback(flag => {
    dispatch(appActions.setPictureLoading(flag))
  }, [])

  return {
    picture,
    pictureAttribution,
    isPictureLoading,
    handleLoadPicture,
    handleUploadPicture,
    setPictureLoading,
  }
}

export default useAppController
