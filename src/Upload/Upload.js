import React, { useRef } from 'react';
import style from './Upload.module.scss';
import Button from '../Button';

const Upload = ({ children, disabled, onComplete }) => {

  const inputRef = useRef();

  const handleButtonClick = () => inputRef.current.click();

  const handleFileChange = event => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = e => onComplete(e.target.result);
  };

  return (
    <div className={style['upload-btn-wrapper']}>
      <Button
        disabled={disabled}
        onClick={handleButtonClick}
      >
        {children}
      </Button>
      <input
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        accept="image/jpeg,image/png"
      />
    </div>
  );

};

export default Upload;
