import React from 'react'
import BoardView from './BoardView'
import useBoardController from './useBoardController'

// Container component: wires board controller state into the view.
const Board = ({
  cols,
  rows,
  tileSize,
  shuffleSteps,
  pictureUrl,
  isPictureLoading,
  setPreparingBoard,
}) => {
  const {
    isInitializing,
    boardMap,
    boardImages,
    isBoardActive,
    isBoardDone,
    onTileClick,
  } = useBoardController({
    cols,
    rows,
    tileSize,
    shuffleSteps,
    pictureUrl,
    setPreparingBoard,
  })

  return (
    <BoardView
      cols={cols}
      rows={rows}
      tileSize={tileSize}
      isInitializing={isInitializing}
      isPictureLoading={isPictureLoading}
      boardMap={boardMap}
      boardImages={boardImages}
      isBoardActive={isBoardActive}
      isBoardDone={isBoardDone}
      onTileClick={onTileClick}
    />
  )
}

export default Board
