import React from 'react'
import { TileButton, TileImage } from './Item.styles'

// Single puzzle tile; clickable only when it is currently movable.
const Item = ({ size, tile, image, isBoardActive, onTileClick }) => (
  <TileButton
    $isActive={isBoardActive && tile.active}
    onClick={event =>
      isBoardActive && tile.active ? onTileClick(tile.id, event) : null
    }
    style={{
      width: size + 'px',
      height: size + 'px',
      top: tile.row * size + 'px',
      left: tile.col * size + 'px',
    }}
  >
    {image && (
      <TileImage
        src={image}
        alt={`piece ${tile.id}`}
        draggable={false}
        $isHidden={isBoardActive && tile.id === 1}
      />
    )}
  </TileButton>
)

export default Item
