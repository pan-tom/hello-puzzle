import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Item = ({
  size,
  item,
  image,
  boardActive,
  clickItem,
}) => (
  <button
    className={
      styles.boardItem + (boardActive &&
        item.active ? ' '+styles.boardItemActive : '')
    }
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

Item.propTypes = {
  size: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    active: PropTypes.bool,
    col: PropTypes.number,
    row: PropTypes.number,
    ord: PropTypes.number,
  }).isRequired,
  image: PropTypes.string.isRequired,
  boardActive: PropTypes.bool.isRequired,
  clickItem: PropTypes.func.isRequired,
}

export default Item;