import React, { useCallback, useReducer } from 'react';
import './App.scss';
import Board from '../Board';
import Button from '../Button';
import Upload from '../Upload';

const initialState = {
  boardOn: false,
  picture: null,
  btnDisabled: false,
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'LOAD_PICTURE':
      return {
        ...state,
        boardOn: false,
        btnDisabled: true,
        picture: action.payload,
      }
    case 'SET_BUTTON_STATE':
      return {
        ...state,
        btnDisabled: !action.payload,
      }
    default:
      throw new Error();
  }
};

const loadPicture = ({ dispatch }) => {
  dispatch({
    type: 'LOAD_PICTURE',
    payload: 'https://picsum.photos/800/600/?random&_t='
      + (new Date().getTime()),
  })
};

const uploadPicture = ({ dispatch, dataURL }) => {
  dispatch({
    type: 'LOAD_PICTURE',
    payload: dataURL,
  })
};

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {boardOn, picture, btnDisabled} = state;

  const doLoadPicture = useCallback(() => {
    loadPicture({ dispatch });
  }, []);

  const doUploadPicture = useCallback(dataURL => {
    uploadPicture({ dispatch, dataURL });
  }, []);

  const setButtonState = useCallback(flag => {
    dispatch({
      type: 'SET_BUTTON_STATE',
      payload: flag,
    });
  }, []);
  
  return (
    <>
      <Board
        cols={4}
        rows={4}
        shifts={16}
        size={80}
        boardOn={boardOn}
        picture={picture}
        setButtonState={setButtonState}
      />
      <Button
        onClick={doLoadPicture}
        disabled={btnDisabled}
      >
        Load from web
      </Button>
      <Upload
        onComplete={doUploadPicture}
        disabled={btnDisabled}
      >
        Upload from device
      </Upload>
    </>
  )

};

export default App;
