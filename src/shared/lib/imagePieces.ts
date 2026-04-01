type Params = {
  cols: number
  rows: number
  tileSize: number
  pictureUrl: string
}

type ParamsLoaded = Params & {
  image: HTMLImageElement
}

/** Geometry after crop/scale; ready for canvas slicing. */
type LayoutForCut = {
  image: HTMLImageElement
  cols: number
  rows: number
  /** scaled tile edge length used when drawing slices */
  tileSize: number
  offsetX: number
  offsetY: number
}

class ImagePieces {
  // Loads source image and generates tile images as base64 data URLs.
  make(params: Params): Promise<string[]> {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = params.pictureUrl
    return new Promise((resolve, reject) => {
      image.onload = () => {
        const loaded: ParamsLoaded = { ...params, image }
        const layout = this.computeLayout(loaded)
        resolve(this.cutImage(layout))
      }
      image.onerror = () => {
        reject(new Error(`Error loading image ${params.pictureUrl}`))
      }
    })
  }

  private computeLayout(loaded: ParamsLoaded): LayoutForCut {
    const { image, tileSize, cols, rows } = loaded
    const { width, height } = image
    const boardWidth = tileSize * cols
    const boardHeight = tileSize * rows
    const squareSize = Math.min(width, height)
    const sizeRatio = squareSize / (width >= height ? boardWidth : boardHeight)
    const offsetX = squareSize > height ? (width - boardWidth) / 2 : 0
    const offsetY = squareSize > width ? (height - boardHeight) / 2 : 0
    return {
      image,
      cols,
      rows,
      tileSize: tileSize * sizeRatio,
      offsetX: offsetX / sizeRatio,
      offsetY: offsetY / sizeRatio,
    }
  }

  private cutImage(layout: LayoutForCut): string[] {
    const { image, tileSize, cols, rows, offsetX, offsetY } = layout
    const pieces: string[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) {
          throw new Error('Could not get 2D canvas context')
        }
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
