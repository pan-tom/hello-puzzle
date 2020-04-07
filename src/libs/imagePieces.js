class ImagePieces {

  _params = {};

  make(params) {
    this._params = params;
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = params.picture;
    return new Promise((resolve, reject) => {
      image.onload = () => {
        this._params.image = image;
        const pieces = this._process();
        resolve(pieces);
      };
      image.onerror = () => {
        reject(`Error loading image ${params.picture}`);
      };
    });
  };

  _process = () => {
    const { image, size, cols, rows } = this._params;
    const { width, height } = image;
    const boardWidth = size * cols;
    const boardHeight = size * rows;
    const squareSize = Math.min(...[width, height]);
    const sizeRatio = squareSize / (width >= height ? boardWidth : boardHeight);
    const offsetX = squareSize > height ? (width - boardWidth) / 2 : 0;
    const offsetY = squareSize > width ? (height - boardHeight) / 2 : 0;
    this._params = {
      image,
      cols,
      rows,
      size: size * sizeRatio,
      offsetX: offsetX / sizeRatio,
      offsetY: offsetY / sizeRatio,
    };
    return this._cutImage();
  };

  _cutImage = () => {
    const { image, size, cols, rows, offsetX, offsetY } = this._params;
    const pieces = [];
    for(var y = 0; y < cols; y++) {
      for(var x = 0; x < rows; x++) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;
        context.drawImage(
          image,
          x * size + offsetX,
          y * size + offsetY,
          size,
          size,
          0,
          0,
          canvas.width,
          canvas.height,
        );
        pieces.push(canvas.toDataURL());
      }
    }
    return pieces;
  };

};

export default new ImagePieces();
