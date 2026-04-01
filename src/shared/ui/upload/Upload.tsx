import { type ChangeEvent, type ReactNode, useId, useRef } from 'react'
import Button from '@/shared/ui/button'
import { UploadButtonWrapper } from './Upload.styles'

type UploadProps = {
  disabled: boolean
  onComplete: (dataUrl: string) => void
  children: ReactNode
}

// Visually hidden file input; visible button opens picker (still in a11y tree).
const Upload = ({ disabled, onComplete, children }: UploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  // Reads selected image file as data URL and forwards it upstream.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        onComplete(result)
      }
    }
  }

  return (
    <UploadButtonWrapper>
      <Button
        disabled={disabled}
        onClick={handleButtonClick}
        aria-controls={inputId}
      >
        {children}
      </Button>

      <input
        id={inputId}
        ref={inputRef}
        tabIndex={-1}
        onChange={handleFileChange}
        type="file"
        accept="image/jpeg,image/png"
        aria-label="Choose JPEG or PNG image file"
      />
    </UploadButtonWrapper>
  )
}

export default Upload
