import Board from '@/components/board'
import { PictureMetaSection, PictureSourceActions } from '@/components/picture'
import AppGlobalStyle from '@/shared/styles/AppGlobalStyle'
import { AppShell } from './App.styles'
import AppHeader from './AppHeader'
import useAppController from './useAppController'

// Top-level app composition: puzzle board + user actions.
const App = () => {
  const {
    pictureUrl,
    pictureAttribution,
    pictureFetchError,
    isPictureLoading,
    isPreparingBoard,
    handleLoadPicture,
    handleUploadPicture,
    setPreparingBoard,
  } = useAppController()

  return (
    <>
      <AppGlobalStyle />

      <AppShell>
        <AppHeader />

        <Board
          cols={4}
          rows={4}
          shuffleSteps={20}
          tileSize={80}
          pictureUrl={pictureUrl}
          isPictureLoading={isPictureLoading}
          setPreparingBoard={setPreparingBoard}
        />

        <PictureMetaSection
          pictureFetchError={pictureFetchError}
          isPictureLoading={isPictureLoading}
          pictureAttribution={pictureAttribution}
        />

        <PictureSourceActions
          isDisabled={isPreparingBoard}
          onLoadFromWeb={handleLoadPicture}
          onUploadFromDevice={handleUploadPicture}
        />
      </AppShell>
    </>
  )
}

export default App
