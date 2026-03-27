import React from 'react'
import BoardView from './BoardView'
import useBoardController from './useBoardController'

// Container component: wires board controller state into the view.
const Board = ({
  cols,
  rows,
  size,
  shifts,
  picture,
  isPictureLoading,
  setPreparingBoard,
}) => {
  const { isInitializing, boardMap, boardImages, isBoardActive, onTileClick } =
    useBoardController({
      cols,
      rows,
      size,
      shifts,
      picture,
      setPreparingBoard,
    })

  return (
    <BoardView
      cols={cols}
      rows={rows}
      size={size}
      isInitializing={isInitializing}
      isPictureLoading={isPictureLoading}
      boardMap={boardMap}
      boardImages={boardImages}
      isBoardActive={isBoardActive}
      onTileClick={onTileClick}
    />
  )
}

export default Board
