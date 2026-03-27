import React from 'react'
import Button from '@/shared/ui/button'
import Upload from '@/shared/ui/upload'
import { ActionsRoot } from './PictureSourceActions.styles'

// Chooses puzzle image source: random web image or local file upload.
const PictureSourceActions = ({
  disabled,
  onLoadFromWeb,
  onUploadFromDevice,
}) => (
  <ActionsRoot aria-label="Load puzzle image">
    <Button onClick={onLoadFromWeb} disabled={disabled}>
      Load from web
    </Button>

    <Upload onComplete={onUploadFromDevice} disabled={disabled}>
      Upload from device
    </Upload>
  </ActionsRoot>
)

export default PictureSourceActions
