import React, { useRef } from 'react'
import Button from '@/shared/ui/button'
import { UploadButtonWrapper } from './Upload.styles'

// Hidden file input wrapped in a styled button.
const Upload = ({ children, disabled, onComplete }) => {
  const inputRef = useRef()

  const handleButtonClick = () => inputRef.current.click()

  // Reads selected image file as data URL and forwards it upstream.
  const handleFileChange = event => {
    const reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = e => onComplete(e.target.result)
  }

  return (
    <UploadButtonWrapper>
      <Button disabled={disabled} onClick={handleButtonClick}>
        {children}
      </Button>
      <input
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        accept="image/jpeg,image/png"
      />
    </UploadButtonWrapper>
  )
}

export default Upload
