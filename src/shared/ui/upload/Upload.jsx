import React, { useRef } from 'react'
import style from './Upload.module.scss'
import Button from '@/shared/ui/button'

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
    <div className={style['upload-btn-wrapper']}>
      <Button disabled={disabled} onClick={handleButtonClick}>
        {children}
      </Button>
      <input
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        accept="image/jpeg,image/png"
      />
    </div>
  )
}

export default Upload
