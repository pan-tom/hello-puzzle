import Item from '@/components/item'
import Loading from '@/components/loading'
import { BoardContainer } from './BoardView.styles'
import type { BoardProps } from './Board'
import type { BoardMap } from './boardMapTools'

type BoardViewProps = {
  isInitializing: boolean
  isPictureLoading: boolean
  boardMap: BoardMap
  boardImages: string[]
  isBoardActive: boolean
  isBoardDone: boolean
  onTileClick: (id: number) => void
} & Pick<BoardProps, 'cols' | 'rows' | 'tileSize'>

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
  isBoardDone,
  onTileClick,
}: BoardViewProps) => {
  const isBusy = isInitializing || isPictureLoading

  return (
    <BoardContainer
      aria-label="Sliding puzzle board"
      aria-busy={isBusy}
      $tileSize={tileSize}
      $cols={cols}
      $rows={rows}
    >
      {isBusy ? (
        <Loading />
      ) : (
        boardMap.map(tile => (
          <Item
            key={tile.id}
            tile={tile}
            tileSize={tileSize}
            image={boardImages[tile.id - 1] || ''}
            isBoardActive={isBoardActive}
            isBoardDone={isBoardDone}
            onTileClick={onTileClick}
          />
        ))
      )}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {isBoardDone ? 'Puzzle solved.' : ''}
      </p>
    </BoardContainer>
  )
}

export default BoardView
