import { useCallback, useEffect, useReducer, useRef } from 'react'
import imagePieces from '@/shared/lib/imagePieces'
import * as boardMapTools from './boardMapTools'
import {
  boardActions,
  boardReducer,
  cloneBoardTiles,
  deriveBoardPosition,
  initialBoardState,
} from './boardState'

// Controls puzzle lifecycle: initialize, shuffle, moves, solved state.
const useBoardController = ({
  cols,
  rows,
  size,
  shifts,
  picture,
  setPictureLoading,
}) => {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState)
  const { boardMap, movableTiles } = state

  const boardMapRef = useRef(boardMap)
  const movableTilesRef = useRef(movableTiles)

  useEffect(() => {
    boardMapRef.current = boardMap
  }, [boardMap])

  useEffect(() => {
    movableTilesRef.current = movableTiles
  }, [movableTiles])

  // Recomputes board map + movable tiles atomically after each move.
  const commitBoardPosition = useCallback(
    inputMap => {
      const sourceMap = inputMap || boardMapRef.current
      const nextPosition = deriveBoardPosition(sourceMap, cols)
      boardMapRef.current = nextPosition.boardMap
      movableTilesRef.current = nextPosition.movableTiles
      dispatch(boardActions.setBoardPosition(nextPosition))
    },
    [cols]
  )

  // Executes a single legal tile move and marks completion when solved.
  const moveBoardTile = useCallback(
    tileId => {
      const movedBoardMap = boardMapTools.moveTile(
        cloneBoardTiles(boardMapRef.current),
        tileId
      )
      const solved = boardMapTools.isBoardSolved(movedBoardMap)

      commitBoardPosition(movedBoardMap)
      if (solved) {
        setTimeout(() => {
          dispatch(boardActions.setBoardDone())
        }, 250)
      }
    },
    [commitBoardPosition]
  )

  useEffect(() => {
    let cancelled = false

    // Full board setup flow for a new picture:
    // reset -> slice image -> build board -> shuffle -> activate user input.
    const initializeBoard = async () => {
      if (!picture) {
        return
      }

      boardMapTools.clearShuffleInterval()
      dispatch(boardActions.resetForNewPicture())

      const pieces = await imagePieces.make({
        picture,
        size,
        cols,
        rows,
      })

      if (cancelled) {
        return
      }

      const generatedBoard = boardMapTools.generateBoard(cols, rows)
      const initializedPosition = deriveBoardPosition(generatedBoard, cols)
      boardMapRef.current = initializedPosition.boardMap
      movableTilesRef.current = initializedPosition.movableTiles
      dispatch(
        boardActions.setInitializedBoard({
          boardMap: initializedPosition.boardMap,
          movableTiles: initializedPosition.movableTiles,
          boardImages: pieces,
        })
      )
      setPictureLoading(false)

      await boardMapTools.shuffleItems(shifts, {
        getMovableTiles: () => movableTilesRef.current,
        moveTile: tileId => moveBoardTile(tileId),
      })

      if (cancelled) {
        return
      }

      dispatch(boardActions.setBoardActive(true))
    }

    initializeBoard().catch(error => {
      if (cancelled) {
        return
      }
      console.error(error)
      dispatch(
        boardActions.setInitializedBoard({
          boardMap: [],
          movableTiles: [],
          boardImages: [],
        })
      )
      setPictureLoading(false)
    })

    return () => {
      cancelled = true
      boardMapTools.clearShuffleInterval()
    }
  }, [cols, moveBoardTile, picture, rows, setPictureLoading, shifts, size])

  return {
    ...state,
    onTileClick: moveBoardTile,
  }
}

export default useBoardController
