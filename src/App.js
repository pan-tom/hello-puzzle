import React from 'react';
import './App.scss';
import Board from './Board/index';
import Button from './Button/index';
import Upload from './Upload/index';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      boardOn: false,
      picture: null,
      btnDisabled: false,
      resetBoard: false,
    }
  }

  loadPicture = () => {
    this.setState({
      boardOn: true,
      picture: 'https://picsum.photos/800/600/?random&_t='
        + (new Date().getTime()),
      resetBoard: false,
    });
  };

  clickLoadPicture = event => {
     this.setState({
      btnDisabled: true,
      boardOn: false,
      resetBoard: true,
    }, () => {
      setTimeout(() => {
        this.loadPicture();
      }, 500);
    });
  };

  uploadPicture = dataURL => {
    this.setState({
      btnDisabled: true,
      boardOn: false,
      resetBoard: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          picture: dataURL,
          resetBoard: false,
        });
      }, 250);
    });
  };

  disableButton = flag => {
    this.setState({
      btnDisabled: flag
    });
  }
  
  render() {
    const { boardOn, picture, btnDisabled, resetBoard } = this.state;
    return (
      <React.Fragment>
        <Board
          cols={4}
          rows={4}
          size={80}
          shifts={24}
          boardOn={boardOn}
          picture={picture}
          disableButton={this.disableButton}
          reset={resetBoard}
        />
        <Button
          onClick={this.clickLoadPicture}
          disabled={btnDisabled}
        >
          Load from web
        </Button>
        <Upload
          onUpload={this.uploadPicture}
          disabled={btnDisabled}
        >
          Upload from device
        </Upload>
      </React.Fragment>
    )
  }

}

export default App;
