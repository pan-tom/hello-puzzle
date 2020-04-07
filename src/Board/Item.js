import React from 'react';
import styles from './Board.module.scss';

import classnames from 'classnames/bind';
var cx = classnames.bind(styles);

const Item = ({
  size,
  item,
  image,
  boardActive,
  clickItem,
}) => (
  <button
    className={cx('boardItem', {
      boardItemActive: boardActive && item.active,
    })}
    onClick={event =>
      boardActive && item.active ? clickItem(item.id, event) : null
    }
    style={{
      width: size+'px',
      height: size+'px',
      top: (item.row*size)+'px',
      left: (item.col*size)+'px'
    }}
  >
    { image && <img
      src={image}
      alt={`piece ${item.id}`}
      draggable={false}
      className={boardActive && item.id === 1 ? styles.hide : null}
    /> }
  </button>
);

export default Item;