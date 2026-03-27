import React from 'react'
import Board from '@/components/board'
import { PictureAttribution, PictureSourceActions } from '@/components/picture'
import AppGlobalStyle from '@/shared/styles/AppGlobalStyle'
import useAppController from './useAppController'

// Top-level app composition: puzzle board + user actions.
const App = () => {
  const {
    picture,
    pictureAttribution,
    isPictureLoading,
    isPreparingBoard,
    handleLoadPicture,
    handleUploadPicture,
    setPreparingBoard,
  } = useAppController()

  return (
    <>
      <AppGlobalStyle />

      <Board
        cols={4}
        rows={4}
        shifts={20}
        size={80}
        picture={picture}
        isPictureLoading={isPictureLoading}
        setPreparingBoard={setPreparingBoard}
      />

      <PictureAttribution
        isVisible={!!pictureAttribution && !isPictureLoading}
        attribution={pictureAttribution}
      />

      <PictureSourceActions
        isDisabled={isPreparingBoard}
        onLoadFromWeb={handleLoadPicture}
        onUploadFromDevice={handleUploadPicture}
      />
    </>
  )
}

export default App
