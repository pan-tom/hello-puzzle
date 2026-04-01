import BoardView from './BoardView'
import useBoardController from './useBoardController'
import type { AppState } from '@/app/appState'

export type BoardProps = {
  cols: number
  rows: number
  tileSize: number
  shuffleSteps: number
  setPreparingBoard: (preparing: boolean) => void
} & Pick<AppState, 'pictureUrl' | 'isPictureLoading'>

// Container component: wires board controller state into the view.
const Board = ({
  cols,
  rows,
  tileSize,
  shuffleSteps,
  pictureUrl,
  isPictureLoading,
  setPreparingBoard,
}: BoardProps) => {
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
