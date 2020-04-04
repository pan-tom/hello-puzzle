import { min } from 'lodash';

class ImagePieces {

  constructor(params) {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = params.picture;
    image.onload = () => {
      params.image = image;
      this._process(params);
    };
  };

  _process = params => {
    const { image, size, cols, rows, setStateFn } = params;
    const boardWidth = size*cols;
    const boardHeight = size*rows;
    const { width, height } = image;
    const squareSize = min([width, height]);
    const sizeRatio = squareSize/(width >= height ? boardWidth : boardHeight);
    const offsetX = squareSize > height ? (width - boardWidth)/2 : 0;
    const offsetY = squareSize > width ? (height - boardHeight)/2 : 0;
    this.params = {
      image, size: size*sizeRatio, cols, rows,
      offsetX: offsetX/sizeRatio, offsetY: offsetY/sizeRatio,
    };
    setStateFn({ pieces: this._cutImage() });
  };

  _cutImage = () => {
    const { image, size, cols, rows, offsetX, offsetY } = this.params;
    const pieces = [];
    for(var y = 0; y < cols; y++) {
      for(var x = 0; x < rows; x++) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;
        context.drawImage(image, x*size+offsetX, y*size+offsetY,
          size, size, 0, 0, canvas.width, canvas.height);
        pieces.push(canvas.toDataURL());
      }
    }
    return pieces;
  }

}

export default ImagePieces;
