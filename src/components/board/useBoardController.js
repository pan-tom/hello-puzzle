import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react'
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
  tileSize,
  shuffleSteps,
  pictureUrl,
  setPreparingBoard,
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

  // Sync before paint when `pictureUrl` changes: avoids one frame of old tiles while
  // isPictureLoading is already false (fetch done) and async init has not run yet.
  useLayoutEffect(() => {
    if (!pictureUrl) {
      return
    }
    boardMapTools.clearShuffleInterval()
    dispatch(boardActions.resetForNewPicture())
  }, [pictureUrl])

  useEffect(() => {
    let cancelled = false

    // Async: slice image -> build board -> shuffle -> activate user input.
    // Reset/clear already applied in useLayoutEffect when pictureUrl changed.
    const initializeBoard = async () => {
      if (!pictureUrl) {
        return
      }

      const pieces = await imagePieces.make({
        pictureUrl,
        tileSize,
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

      await boardMapTools.shuffleItems(shuffleSteps, {
        getMovableTiles: () => movableTilesRef.current,
        moveTile: tileId => moveBoardTile(tileId),
      })

      if (cancelled) {
        setPreparingBoard(false)
        return
      }

      dispatch(boardActions.setBoardActive(true))
      setPreparingBoard(false)
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
      setPreparingBoard(false)
    })

    return () => {
      cancelled = true
      boardMapTools.clearShuffleInterval()
    }
  }, [
    cols,
    rows,
    tileSize,
    shuffleSteps,
    pictureUrl,
    setPreparingBoard,
    moveBoardTile,
  ])

  return {
    ...state,
    onTileClick: moveBoardTile,
  }
}

export default useBoardController
