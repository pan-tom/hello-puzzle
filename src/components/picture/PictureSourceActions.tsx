import Button from '@/shared/ui/button'
import Upload from '@/shared/ui/upload'
import { ActionsRoot } from './PictureSourceActions.styles'

type PictureSourceActionsProps = {
  isDisabled: boolean
  onLoadFromWeb: () => void
  onUploadFromDevice: (dataURL: string) => void
}

// Chooses puzzle image source: random web image or local file upload.
const PictureSourceActions = ({
  isDisabled,
  onLoadFromWeb,
  onUploadFromDevice,
}: PictureSourceActionsProps) => (
  <ActionsRoot aria-label="Load puzzle image">
    <Button disabled={isDisabled} onClick={onLoadFromWeb}>
      Load from web
    </Button>

    <Upload disabled={isDisabled} onComplete={onUploadFromDevice}>
      Upload from device
    </Upload>
  </ActionsRoot>
)

export default PictureSourceActions
