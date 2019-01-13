import React from 'react';
import PropTypes from 'prop-types';
import { findIndex, findKey, orderBy, random } from 'lodash';
import styles from './index.module.scss';
import ImagePieces from '../libs/ImagePieces';
import Item from './Item';
import Loading from './Loading';

class Board extends React.Component {

  intvalShuffle = null;

  constructor(props) {
    super();
    const { cols, rows, size } = props;
    this.state = {
      cols, rows, size,
      loading: false,
      boardMap: [],
      boardImages: [],
      activeItems: [],
      boardActive: false,
      boardDone: false,
    }
  };
  
  componentDidUpdate(prevProps) {
    const { cols, rows, size, shifts, picture, disableButton, reset }
      = this.props;
    if(!prevProps.reset && reset) {
      this.resetItems();
    }
    if(prevProps.picture !== picture && picture) {
      this.setState({
        loading: true,
        boardMap: [],
        boardImages: [],
        activeItems: [],
        boardActive: false,
        boardDone: false
      }, () => {
        new ImagePieces({
          picture, size, cols, rows,
          setStateFn: res => {
            disableButton(false);
            this.setState({
              loading: false,
              boardMap: this.generateBoardMap({ cols, rows }),
              boardImages: res.pieces
            }, () => {
              setTimeout(() => {
                this.setMapActiveItems();
                this.shuffleItems(shifts, () => {
                  this.setState({
                    boardActive: true
                  });
                });
              }, 500);
            });
          }
        });
      });
    }
  };

  componentWillUnmount() {
    clearInterval(this.intvalShuffle);
  }

  generateBoardMap = params => {
    const { cols, rows } = params;
    const board = [];
    let id = 0;
    for(let i=0; i<cols; i++) {
      for(let j=0; j<rows; j++) {
        board.push({
          id: id+1,
          active: false,
          col: j,
          row: i,
          ord: id++,
        });
      }
    }
    return board;
  };

  checkIntegrity = () => {
    const boardMap = orderBy(this.state.boardMap, 'ord', 'asc');
    return !boardMap.some((item, i) => {
      return i > 0 && item.id !== boardMap[i-1].id + 1;
    });
  };

  _getNeighbours = (boardMap, id=1) => {
    const { cols } = this.state;
    const map = orderBy(boardMap, 'ord', 'asc');
    const o_first = map[findIndex(map, { id })];
    const ord = o_first.ord;
    const o_top = map[findIndex(map, { ord: ord - cols })];
    const o_right = map[findIndex(map, { ord: ord + 1 })];
    const o_bott = map[findIndex(map, { ord: ord + cols })];
    const o_left = map[findIndex(map, { ord: ord - 1 })];
    const items = [];
    if(o_top && o_top.col === o_first.col) {
      items.push(o_top);
    }
    if(o_right && o_right.row === o_first.row) {
      items.push(o_right);
    }
    if(o_bott && o_bott.col === o_first.col) {
      items.push(o_bott);
    }
    if(o_left && o_left.row === o_first.row) {
      items.push(o_left);
    }
    return items;
  };

  setMapActiveItems = () => {
    this.setState(state => {
      const activeItems = this._getNeighbours(state.boardMap);
      const boardMap = state.boardMap.map(item => {
        item.active = findIndex(activeItems, { 'id': item.id }) !== -1;
        return item;
      });
      return { boardMap, activeItems };
    });
  };

  resetItems = () => {
    clearInterval(this.intvalShuffle);
    this.setState(state => {
      const { cols, rows } = this.props;
      return {
        boardActive: false,
        boardMap: this.generateBoardMap({ cols, rows })
      }
    });
  };

  shuffleItems = (times, afterFn) => {
    let counter = 0;
    let id, lastId = -1;
    this.intvalShuffle = setInterval(() => {
      const items = this.state.activeItems;
      do {
        id = items[random(0, items.length - 1)].id;
      } while (id === lastId);
      lastId = id;
      this.clickItem(id);
      if(++counter === times) {
        clearInterval(this.intvalShuffle);
        afterFn();
      }
    }, 300);
  };

  clickItem = id => {
    this.setState(state => {
      const boardMap = state.boardMap;
      const map1 = boardMap[findKey(boardMap, { 'id': 1 })];
      const map2 = boardMap[findKey(boardMap, { 'id': id })];
      const { col, row, ord } = map1;
      map1.col = map2.col;
      map1.row = map2.row;
      map1.ord = map2.ord;
      map2.col = col;
      map2.row = row;
      map2.ord = ord;
      return { boardMap };
    }, () => {
      if(this.checkIntegrity()) {
        setTimeout(() => {
          this.setState({
            boardActive: false,
            boardDone: true,
          });
        }, 250);
      } else {
        this.setMapActiveItems();
      }
    });
  };

  render() {
    
    const { cols, rows, size, loading, boardMap,
      boardImages, boardActive, boardDone } = this.state;
   
    return (
      <div id={styles.board}
        className={boardDone ? styles.boardDone : null}
        style={{
          width: size * cols,
          height: size * rows,
        }}
      >
        { !loading ? boardMap.map(item =>
          <Item
            key={item.id}
            size={size}
            item={item}
            image={boardImages[item.id-1] || ''}
            boardActive={boardActive}
            boardDone={boardDone}
            clickItem={this.clickItem}
          />
        ) : <Loading /> }
      </div>
    )

  }

}

Board.propTypes = {
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  shifts: PropTypes.number.isRequired,
  picture: PropTypes.string,
}

export default Board;
