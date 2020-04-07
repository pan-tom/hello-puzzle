import React from 'react';
import styles from './Board.module.scss';
import imagePieces from '../libs/imagePieces';
import Item from './Item';
import Loading from './Loading';
import * as boardMapTools from './boardMapTools';

import classnames from 'classnames/bind';
var cx = classnames.bind(styles);

class Board extends React.Component {

  initialState = {};

  constructor(props) {
    super(props);
    const { cols, rows, size } = props;
    this.initialState = {
      cols,
      rows,
      size,
      loading: false,
      boardMap: [],
      boardImages: [],
      activeItems: [],
      boardActive: false,
      boardDone: false,
    }
    this.state = this.initialState;
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { picture } = this.props;
    const { loading, boardMap } = this.state;
    return !picture || picture !== nextProps.picture
      || (!loading && nextState.loading)
      || (boardMap.length === nextState.boardMap.length);
  };
  
  async componentDidUpdate(prevProps) {
    const { cols, rows, size, shifts, picture, setButtonState } = this.props;
    if(picture && prevProps.picture !== picture) {
      boardMapTools.clearShuffleInterval();
      this.setState({
        ...this.initialState,
        loading: true,
      });
      const pieces = await imagePieces.make({
        picture,
        size,
        cols,
        rows,
      });
      this.setState({
        loading: false,
        boardMap: boardMapTools.generateBoard(cols, rows),
        boardImages: pieces,
      });
      await this.setMapActiveItems();
      setButtonState(true);
      await boardMapTools.shuffleItems(shifts, {
        getItems: () => this.state.activeItems,
        clickItem: id => this.clickItem(id),
      });
      this.setState({ boardActive: true });
    }
  };

  componentWillUnmount() {
    boardMapTools.clearShuffleInterval();
  };

  setMapActiveItems = () => {
    return new Promise(resolve => {
      this.setState(state => {
        const { boardMap, activeItems }
          = boardMapTools.getActiveItems(state.boardMap, state.cols);
        return { boardMap, activeItems };
      }, resolve);
    });
  };

  clickItem = id => {
    return new Promise(resolve => {
      this.setState(state => {
        const boardMap = boardMapTools.moveItem(state.boardMap, id);
        return { boardMap };
      }, async () => {
        if(boardMapTools.checkIntegrity(this.state.boardMap)) {
          setTimeout(() => {
            this.setState({
              boardActive: false,
              boardDone: true,
            });
          }, 250);
        } else {
          await this.setMapActiveItems();
          resolve();
        }
      });
    });
  };

  render() {
    
    const { cols, rows, size, loading, boardMap,
      boardImages, boardActive, boardDone } = this.state;
   
    return (
      <div
        id={styles.board}
        className={cx({ boardDone })}
        style={{
          width: size * cols,
          height: size * rows,
        }}
      >
        {loading && <Loading />}

        {!loading && boardMap.map(item =>
          <Item
            key={item.id}
            size={size}
            item={item}
            image={boardImages[item.id-1] || ''}
            boardActive={boardActive}
            boardDone={boardDone}
            clickItem={this.clickItem}
          />
        )}
      </div>
    )

  }

};

export default Board;
