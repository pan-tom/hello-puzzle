import { TileButton, TileImage } from './Item.styles'
import { getTileAriaLabel } from './tileAriaLabel'
import type { Tile } from '@/components/board/boardMapTools'

type ItemProps = {
  tileSize: number
  tile: Tile
  image: string
  isBoardActive: boolean
  isBoardDone: boolean
  onTileClick: (id: number) => void
}

// Single puzzle tile; keyboard/click only when adjacent to the empty slot.
const Item = ({
  tileSize,
  tile,
  image,
  isBoardActive,
  isBoardDone,
  onTileClick,
}: ItemProps) => {
  const isMovable = isBoardActive && tile.active
  const isHidden = isBoardActive && tile.id === 1
  const row = tile.row + 1
  const col = tile.col + 1

  const handleClick = () => {
    if (isMovable) {
      onTileClick(tile.id)
    }
  }

  const tileAriaLabel = getTileAriaLabel({
    row,
    col,
    isBoardDone,
    isBoardActive,
    isHidden,
    isMovable,
  })

  return (
    <TileButton
      type="button"
      $isActive={isMovable}
      disabled={!isMovable}
      aria-label={tileAriaLabel}
      style={{
        width: tileSize + 'px',
        height: tileSize + 'px',
        top: tile.row * tileSize + 'px',
        left: tile.col * tileSize + 'px',
      }}
      onClick={handleClick}
    >
      {image && (
        <TileImage src={image} alt="" draggable={false} $isHidden={isHidden} />
      )}
    </TileButton>
  )
}

export default Item
