import * as boardMapTools from './boardMapTools'
import type { BoardMap, Tile } from './boardMapTools'

const BOARD_ACTIONS = {
  RESET_FOR_NEW_PICTURE: 'RESET_FOR_NEW_PICTURE',
  SET_INITIALIZED_BOARD: 'SET_INITIALIZED_BOARD',
  SET_BOARD_POSITION: 'SET_BOARD_POSITION',
  SET_BOARD_ACTIVE: 'SET_BOARD_ACTIVE',
  SET_BOARD_DONE: 'SET_BOARD_DONE',
} as const

// Produces a detached board copy before mutating operations.
export const cloneBoardTiles = (boardMap: BoardMap) =>
  boardMap.map((tile: Tile) => ({ ...tile }))

// Single source of truth for board UI/gameplay state.
export const initialBoardState = {
  isInitializing: false,
  boardMap: [],
  boardImages: [],
  movableTiles: [],
  isBoardActive: false,
  isBoardDone: false,
}

// Action creators keep board updates explicit and predictable.
export const boardActions = {
  resetForNewPicture: () => ({ type: BOARD_ACTIONS.RESET_FOR_NEW_PICTURE }),
  setInitializedBoard: ({
    boardMap,
    movableTiles,
    boardImages,
  }: {
    boardMap: BoardMap
    movableTiles: Tile[]
    boardImages: string[]
  }) => ({
    type: BOARD_ACTIONS.SET_INITIALIZED_BOARD,
    payload: { boardMap, movableTiles, boardImages },
  }),
  setBoardPosition: ({
    boardMap,
    movableTiles,
  }: {
    boardMap: BoardMap
    movableTiles: Tile[]
  }) => ({
    type: BOARD_ACTIONS.SET_BOARD_POSITION,
    payload: { boardMap, movableTiles },
  }),
  setBoardActive: (isActive: boolean) => ({
    type: BOARD_ACTIONS.SET_BOARD_ACTIVE,
    payload: isActive,
  }),
  setBoardDone: () => ({ type: BOARD_ACTIONS.SET_BOARD_DONE }),
}

type BoardState = {
  isInitializing: boolean
  boardMap: BoardMap
  boardImages: string[]
  movableTiles: BoardMap
  isBoardActive: boolean
  isBoardDone: boolean
}
type BoardAction = ReturnType<(typeof boardActions)[keyof typeof boardActions]>

// Reducer for board state transitions used by the controller hook.
export const boardReducer = (state: BoardState, action: BoardAction) => {
  switch (action.type) {
    case BOARD_ACTIONS.RESET_FOR_NEW_PICTURE:
      return {
        ...initialBoardState,
        isInitializing: true,
      }
    case BOARD_ACTIONS.SET_INITIALIZED_BOARD:
      return {
        ...state,
        isInitializing: false,
        boardMap: action.payload.boardMap,
        movableTiles: action.payload.movableTiles,
        boardImages: action.payload.boardImages,
      }
    case BOARD_ACTIONS.SET_BOARD_POSITION:
      return {
        ...state,
        boardMap: action.payload.boardMap,
        movableTiles: action.payload.movableTiles,
      }
    case BOARD_ACTIONS.SET_BOARD_ACTIVE:
      return {
        ...state,
        isBoardActive: action.payload,
      }
    case BOARD_ACTIONS.SET_BOARD_DONE:
      return {
        ...state,
        isBoardActive: false,
        isBoardDone: true,
      }
    default:
      return state
  }
}

// Derives active/movable tile metadata from current board position.
export const deriveBoardPosition = (inputMap: BoardMap, cols: number) => {
  const { boardMap, movableTiles } = boardMapTools.deriveMovableTilesState(
    cloneBoardTiles(inputMap),
    cols
  )

  return {
    boardMap: [...boardMap],
    movableTiles: [...movableTiles],
  }
}
