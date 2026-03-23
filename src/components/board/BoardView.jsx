import React from 'react'
import styles from './Board.module.scss'
import Item from '@/components/item'
import Loading from '@/components/loading'

import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

// Pure board presentation: layout + rendered tiles/spinner.
function BoardView({
  cols,
  rows,
  size,
  loading,
  boardMap,
  boardImages,
  boardActive,
  boardDone,
  onTileClick,
}) {
  return (
    <div
      id={styles.board}
      className={cx({ boardDone })}
      style={{
        width: size * cols,
        height: size * rows,
      }}
    >
      {loading && <Loading />}

      {!loading &&
        boardMap.map(tile => (
          <Item
            key={tile.id}
            size={size}
            tile={tile}
            image={boardImages[tile.id - 1] || ''}
            boardActive={boardActive}
            boardDone={boardDone}
            onTileClick={onTileClick}
          />
        ))}
    </div>
  )
}

export default BoardView
