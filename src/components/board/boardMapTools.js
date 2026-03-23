import { findIndex, findKey, orderBy, random } from 'lodash'

let shuffleIntervalId

// Returns all tiles adjacent to the empty tile (id: 1).
const getAdjacentTiles = ({ boardMap, cols }) => {
  const orderedBoard = orderBy(boardMap, 'ord', 'asc')
  const emptyTile = orderedBoard[findIndex(orderedBoard, { id: 1 })]
  const emptyOrder = emptyTile.ord
  const topTile = orderedBoard[findIndex(orderedBoard, { ord: emptyOrder - cols })]
  const rightTile = orderedBoard[findIndex(orderedBoard, { ord: emptyOrder + 1 })]
  const bottomTile = orderedBoard[findIndex(orderedBoard, { ord: emptyOrder + cols })]
  const leftTile = orderedBoard[findIndex(orderedBoard, { ord: emptyOrder - 1 })]
  const adjacentTiles = []
  if (topTile && topTile.col === emptyTile.col) {
    adjacentTiles.push(topTile)
  }
  if (rightTile && rightTile.row === emptyTile.row) {
    adjacentTiles.push(rightTile)
  }
  if (bottomTile && bottomTile.col === emptyTile.col) {
    adjacentTiles.push(bottomTile)
  }
  if (leftTile && leftTile.row === emptyTile.row) {
    adjacentTiles.push(leftTile)
  }
  return adjacentTiles
}

// Creates solved board coordinates/order for provided dimensions.
const generateBoard = (cols, rows) => {
  const tiles = []
  let tileCounter = 0
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      tiles.push({
        id: tileCounter + 1,
        active: false,
        col: colIndex,
        row: rowIndex,
        ord: tileCounter++,
      })
    }
  }
  return tiles
}

// Flags currently movable tiles and returns both updated map + movable set.
const deriveMovableTilesState = (boardMap, cols) => {
  const movableTiles = getAdjacentTiles({ boardMap, cols })
  const boardWithMovableFlags = boardMap.map(tile => {
    tile.active = findIndex(movableTiles, { id: tile.id }) !== -1
    return tile
  })
  return { boardMap: boardWithMovableFlags, movableTiles }
}

const clearShuffleInterval = () => clearInterval(shuffleIntervalId)

// Picks next shuffle move with anti-backtrack + low-visit bias for wider spread.
const pickDiversifiedShuffleMove = ({
  movableTiles,
  previousTileId,
  visitCountByOrder,
}) => {
  const noImmediateBacktrack = movableTiles.filter(
    tile => tile.id !== previousTileId
  )
  const candidates = noImmediateBacktrack.length
    ? noImmediateBacktrack
    : movableTiles

  const lowestVisitCount = Math.min(
    ...candidates.map(tile => visitCountByOrder[tile.ord] || 0)
  )
  const leastVisitedCandidates = candidates.filter(
    tile => (visitCountByOrder[tile.ord] || 0) === lowestVisitCount
  )

  return leastVisitedCandidates[random(0, leastVisitedCandidates.length - 1)]
}

// Applies a sequence of legal moves to keep puzzle solvable after shuffling.
const shuffleItems = (steps, { moveTile, getMovableTiles }) => {
  let stepCount = 0
  let previousTileId = -1
  const visitCountByOrder = {}

  return new Promise(resolve => {
    shuffleIntervalId = setInterval(() => {
      const movableTiles = getMovableTiles()
      if (!movableTiles.length) {
        return
      }

      const selectedTile = pickDiversifiedShuffleMove({
        movableTiles,
        previousTileId,
        visitCountByOrder,
      })
      const selectedTileId = selectedTile.id

      previousTileId = selectedTileId
      visitCountByOrder[selectedTile.ord] =
        (visitCountByOrder[selectedTile.ord] || 0) + 1
      moveTile(selectedTileId)

      if (++stepCount === steps) {
        clearShuffleInterval()
        resolve()
      }
    }, 300)
  })
}

// Swaps selected tile with empty tile by exchanging positional fields.
const moveTile = (boardMap, tileId) => {
  const emptyTile = boardMap[findKey(boardMap, { id: 1 })]
  const targetTile = boardMap[findKey(boardMap, { id: tileId })]
  const { col, row, ord } = emptyTile
  emptyTile.col = targetTile.col
  emptyTile.row = targetTile.row
  emptyTile.ord = targetTile.ord
  targetTile.col = col
  targetTile.row = row
  targetTile.ord = ord
  return boardMap
}

// Checks whether tiles are in solved order.
const isBoardSolved = boardMap => {
  const orderedBoardMap = orderBy(boardMap, 'ord', 'asc')
  return !orderedBoardMap.some((tile, index) => {
    return index > 0 && tile.id !== orderedBoardMap[index - 1].id + 1
  })
}

export {
  isBoardSolved,
  clearShuffleInterval,
  deriveMovableTilesState,
  generateBoard,
  moveTile,
  shuffleItems,
}
