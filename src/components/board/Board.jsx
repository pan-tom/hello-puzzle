import React from 'react'
import BoardView from './BoardView'
import useBoardController from './useBoardController'

// Container component: wires board controller state into the view.
const Board = ({ cols, rows, size, shifts, picture, setPictureLoading }) => {
  const {
    loading,
    boardMap,
    boardImages,
    boardActive,
    boardDone,
    onTileClick,
  } = useBoardController({
    cols,
    rows,
    size,
    shifts,
    picture,
    setPictureLoading,
  })

  return (
    <BoardView
      cols={cols}
      rows={rows}
      size={size}
      loading={loading}
      boardMap={boardMap}
      boardImages={boardImages}
      boardActive={boardActive}
      boardDone={boardDone}
      onTileClick={onTileClick}
    />
  )
}

export default Board
