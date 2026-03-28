class ImagePieces {
  _params = {}

  // Loads source image and generates tile images as base64 data URLs.
  make(params) {
    this._params = params
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = params.pictureUrl
    return new Promise((resolve, reject) => {
      image.onload = () => {
        this._params.image = image
        const pieces = this._process()
        resolve(pieces)
      }
      image.onerror = () => {
        reject(`Error loading image ${params.pictureUrl}`)
      }
    })
  }

  // Normalizes crop/scale data so image fills the target board area.
  _process = () => {
    const { image, tileSize, cols, rows } = this._params
    const { width, height } = image
    const boardWidth = tileSize * cols
    const boardHeight = tileSize * rows
    const squareSize = Math.min(...[width, height])
    const sizeRatio = squareSize / (width >= height ? boardWidth : boardHeight)
    const offsetX = squareSize > height ? (width - boardWidth) / 2 : 0
    const offsetY = squareSize > width ? (height - boardHeight) / 2 : 0
    this._params = {
      image,
      cols,
      rows,
      tileSize: tileSize * sizeRatio,
      offsetX: offsetX / sizeRatio,
      offsetY: offsetY / sizeRatio,
    }
    return this._cutImage()
  }

  // Slices the prepared image into board-sized canvas tiles.
  _cutImage = () => {
    const { image, tileSize, cols, rows, offsetX, offsetY } = this._params
    const pieces = []
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = tileSize
        canvas.height = tileSize
        context.drawImage(
          image,
          x * tileSize + offsetX,
          y * tileSize + offsetY,
          tileSize,
          tileSize,
          0,
          0,
          canvas.width,
          canvas.height
        )
        pieces.push(canvas.toDataURL())
      }
    }
    return pieces
  }
}

export default new ImagePieces()
