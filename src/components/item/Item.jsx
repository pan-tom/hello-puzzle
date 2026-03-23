import React from 'react'
import styles from './Item.module.scss'

import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

// Single puzzle tile; clickable only when it is currently movable.
const Item = ({ size, tile, image, boardActive, onTileClick }) => (
  <button
    className={cx('boardItem', {
      boardItemActive: boardActive && tile.active,
    })}
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
      <img
        src={image}
        alt={`piece ${tile.id}`}
        draggable={false}
        className={boardActive && tile.id === 1 ? styles.hide : null}
      />
    )}
  </button>
)

export default Item
