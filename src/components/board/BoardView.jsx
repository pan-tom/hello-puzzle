import React from 'react'
import Item from '@/components/item'
import Loading from '@/components/loading'
import { BoardContainer } from './BoardView.styles'

// Pure board presentation: layout + rendered tiles/spinner.
const BoardView = ({
  cols,
  rows,
  size,
  isInitializing,
  isPictureLoading,
  boardMap,
  boardImages,
  isBoardActive,
  onTileClick,
}) => (
  <BoardContainer
    style={{
      width: size * cols,
      height: size * rows,
    }}
  >
    {isInitializing || isPictureLoading ? (
      <Loading />
    ) : (
      boardMap.map(tile => (
        <Item
          key={tile.id}
          size={size}
          tile={tile}
          image={boardImages[tile.id - 1] || ''}
          isBoardActive={isBoardActive}
          onTileClick={onTileClick}
        />
      ))
    )}
  </BoardContainer>
)

export default BoardView
