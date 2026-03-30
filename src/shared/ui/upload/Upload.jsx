import React, { useId, useRef } from 'react'
import Button from '@/shared/ui/button'
import { UploadButtonWrapper } from './Upload.styles'

// Visually hidden file input; visible button opens picker (still in a11y tree).
const Upload = ({ children, disabled, onComplete }) => {
  const inputRef = useRef()
  const inputId = useId()

  const handleButtonClick = () => inputRef.current.click()

  // Reads selected image file as data URL and forwards it upstream.
  const handleFileChange = event => {
    const reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = ({ target }) => onComplete(target.result)
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
