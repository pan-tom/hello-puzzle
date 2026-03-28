import React from 'react'
import Item from '@/components/item'
import Loading from '@/components/loading'
import { BoardContainer } from './BoardView.styles'

// Pure board presentation: layout + rendered tiles/spinner.
const BoardView = ({
  cols,
  rows,
  tileSize,
  isInitializing,
  isPictureLoading,
  boardMap,
  boardImages,
  isBoardActive,
  onTileClick,
}) => (
  <BoardContainer $tileSize={tileSize} $cols={cols} $rows={rows}>
    {isInitializing || isPictureLoading ? (
      <Loading />
    ) : (
      boardMap.map(tile => (
        <Item
          key={tile.id}
          tile={tile}
          tileSize={tileSize}
          image={boardImages[tile.id - 1] || ''}
          isBoardActive={isBoardActive}
          onTileClick={onTileClick}
        />
      ))
    )}
  </BoardContainer>
)

export default BoardView
