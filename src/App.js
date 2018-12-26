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
      btnDisabled: true
    }
  }

  loadPicture = () => {
    this.setState({
      boardOn: true,
      picture: 'https://picsum.photos/800/600/?random&_t='
        + (new Date().getTime())
    });
  };

  clickLoadPicture = event => {
    this.setState({
      boardOn: false,
      picture: null
    }, () => {
      this.loadPicture();
    });
  };

  uploadPicture = dataURL => {
    this.setState({
      boardOn: false,
      picture: dataURL
    });
  };

  componentDidMount() {
    this.loadPicture();
  };

  disableButton = flag => {
    this.setState({
      btnDisabled: flag
    });
  }
  
  render() {
    const { boardOn, picture, btnDisabled } = this.state;
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
        />
        <Button
          onClick={this.clickLoadPicture}
          disabled={btnDisabled}
        >
          Try another picture
        </Button>
        <Upload
          onUpload={this.uploadPicture}
          disabled={btnDisabled}
        >
          Upload your own
        </Upload>
      </React.Fragment>
    )
  }

}

export default App;
