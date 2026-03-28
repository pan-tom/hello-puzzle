import React from 'react'
import { TileButton, TileImage } from './Item.styles'

// Single puzzle tile; clickable only when it is currently movable.
const Item = ({ tileSize, tile, image, isBoardActive, onTileClick }) => {
  const isMovable = isBoardActive && tile.active
  const isHidden = isBoardActive && tile.id === 1

  const handleClick = () => {
    if (isMovable) {
      onTileClick(tile.id)
    }
  }

  return (
    <TileButton
      $isActive={isMovable}
      style={{
        width: tileSize + 'px',
        height: tileSize + 'px',
        top: tile.row * tileSize + 'px',
        left: tile.col * tileSize + 'px',
      }}
      onClick={handleClick}
    >
      {image && (
        <TileImage
          src={image}
          alt={`piece ${tile.id}`}
          draggable={false}
          $isHidden={isHidden}
        />
      )}
    </TileButton>
  )
}

export default Item
