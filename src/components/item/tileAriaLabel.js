// Accessible name for a puzzle tile control (row/column are 1-based).
export const getTileAriaLabel = ({
  row,
  col,
  isBoardDone,
  isBoardActive,
  isHidden,
  isMovable,
}) => {
  if (isBoardDone) {
    return `Tile row ${row}, column ${col}. Puzzle complete.`
  }
  if (!isBoardActive) {
    return `Tile row ${row}, column ${col}. Puzzle not ready.`
  }
  if (isHidden) {
    return `Empty space, row ${row}, column ${col}.`
  }
  if (isMovable) {
    return `Tile row ${row}, column ${col}. Press to slide into empty space.`
  }
  return `Tile row ${row}, column ${col}. Not next to empty space.`
}
