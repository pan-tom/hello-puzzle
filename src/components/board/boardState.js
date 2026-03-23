import * as boardMapTools from './boardMapTools'

// Produces a detached board copy before mutating operations.
const cloneBoardTiles = boardMap => boardMap.map(tile => ({ ...tile }))

// Single source of truth for board UI/gameplay state.
const initialBoardState = {
  loading: false,
  boardMap: [],
  boardImages: [],
  movableTiles: [],
  boardActive: false,
  boardDone: false,
}

const ACTIONS = {
  RESET_FOR_NEW_PICTURE: 'RESET_FOR_NEW_PICTURE',
  SET_INITIALIZED_BOARD: 'SET_INITIALIZED_BOARD',
  SET_BOARD_POSITION: 'SET_BOARD_POSITION',
  SET_BOARD_ACTIVE: 'SET_BOARD_ACTIVE',
  SET_BOARD_DONE: 'SET_BOARD_DONE',
}

// Action creators keep board updates explicit and predictable.
const boardActions = {
  resetForNewPicture: () => ({ type: ACTIONS.RESET_FOR_NEW_PICTURE }),
  setInitializedBoard: ({ boardMap, movableTiles, boardImages }) => ({
    type: ACTIONS.SET_INITIALIZED_BOARD,
    payload: { boardMap, movableTiles, boardImages },
  }),
  setBoardPosition: payload => ({
    type: ACTIONS.SET_BOARD_POSITION,
    payload,
  }),
  setBoardActive: isActive => ({
    type: ACTIONS.SET_BOARD_ACTIVE,
    payload: isActive,
  }),
  setBoardDone: () => ({ type: ACTIONS.SET_BOARD_DONE }),
}

// Reducer for board state transitions used by the controller hook.
const boardReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET_FOR_NEW_PICTURE:
      return {
        ...initialBoardState,
        loading: true,
      }
    case ACTIONS.SET_INITIALIZED_BOARD:
      return {
        ...state,
        loading: false,
        boardMap: action.payload.boardMap,
        movableTiles: action.payload.movableTiles,
        boardImages: action.payload.boardImages,
      }
    case ACTIONS.SET_BOARD_POSITION:
      return {
        ...state,
        boardMap: action.payload.boardMap,
        movableTiles: action.payload.movableTiles,
      }
    case ACTIONS.SET_BOARD_ACTIVE:
      return {
        ...state,
        boardActive: action.payload,
      }
    case ACTIONS.SET_BOARD_DONE:
      return {
        ...state,
        boardActive: false,
        boardDone: true,
      }
    default:
      return state
  }
}

// Derives active/movable tile metadata from current board position.
const deriveBoardPosition = (inputMap, cols) => {
  const { boardMap, movableTiles } = boardMapTools.deriveMovableTilesState(
    cloneBoardTiles(inputMap),
    cols
  )

  return {
    boardMap: [...boardMap],
    movableTiles: [...movableTiles],
  }
}

export {
  boardActions,
  boardReducer,
  cloneBoardTiles,
  deriveBoardPosition,
  initialBoardState,
}
