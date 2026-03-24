import React from 'react'
import Board from '@/components/board'
import Button from '@/shared/ui/button'
import Upload from '@/shared/ui/upload'
import AppGlobalStyle from '@/shared/styles/AppGlobalStyle'
import useAppController from './useAppController'

// Top-level app composition: puzzle board + user actions.
const App = () => {
  const {
    picture,
    isButtonDisabled,
    handleLoadPicture,
    handleUploadPicture,
    setButtonState,
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
        setButtonState={setButtonState}
      />

      <Button onClick={handleLoadPicture} disabled={isButtonDisabled}>
        Load from web
      </Button>

      <Upload onComplete={handleUploadPicture} disabled={isButtonDisabled}>
        Upload from device
      </Upload>
    </>
  )
}

export default App
