import React from 'react';
import style from './index.module.scss';
import Button from '../Button/index';

class Upload extends React.Component {

  constructor() {
    super();
    this.state = {
      picture: null
    }
  }

  handleFileChange = event => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = e => {
      this.props.onUpload(e.target.result);
    }
  };

  render() {
    const { disabled, children } = this.props;
    return (
      <div className={style['upload-btn-wrapper']}>
        <Button
          disabled={disabled}
          onClick={() => this.inputRef.click()}
        >
          {children}
        </Button>
        <input
          ref={ref => this.inputRef = ref}
          onChange={this.handleFileChange}
          type="file"
          accept="image/jpeg,image/png"
        />
      </div>

    )
  }

}

export default Upload;
