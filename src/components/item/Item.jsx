import React from 'react'
import { TileButton, TileImage } from './Item.styles'

// Single puzzle tile; clickable only when it is currently movable.
const Item = ({ size, tile, image, boardActive, onTileClick }) => (
  <TileButton
    $isActive={boardActive && tile.active}
    onClick={event =>
      boardActive && tile.active ? onTileClick(tile.id, event) : null
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
        $isHidden={boardActive && tile.id === 1}
      />
    )}
  </TileButton>
)

export default Item
