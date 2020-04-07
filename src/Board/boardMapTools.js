import { findIndex, findKey, orderBy, random } from 'lodash';

let intvalShuffle;

const _getNeighbours = ({ boardMap, cols }) => {
    const map = orderBy(boardMap, 'ord', 'asc');
    const o_first = map[findIndex(map, {id: 1})];
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

const generateBoard = (cols, rows) => {
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

const getActiveItems = (boardMap, cols) => {
    const activeItems = _getNeighbours({ boardMap, cols });
    const activeBoardMap = boardMap.map(item => {
        item.active = findIndex(activeItems, {id: item.id}) !== -1;
        return item;
    });
    return { boardMap: activeBoardMap, activeItems };
};

const clearShuffleInterval = () => clearInterval(intvalShuffle);

const shuffleItems = (iterations, { clickItem, getItems }) => {
    let counter = 0;
    let id = 0;
    let lastId = -1;
    return new Promise(resolve => {
        intvalShuffle = setInterval(async () => {
            do {
                const items = getItems();
                const item = items[random(0, items.length - 1)];
                id = item.id;
            } while (id === lastId);
            lastId = id;
            await clickItem(id);
            if(++counter === iterations) {
                clearShuffleInterval();
                resolve();
            }
        }, 500);
    });
};

const moveItem = (boardMap, id) => {
    const map1 = boardMap[findKey(boardMap, { 'id': 1 })];
    const map2 = boardMap[findKey(boardMap, { 'id': id })];
    const { col, row, ord } = map1;
    map1.col = map2.col;
    map1.row = map2.row;
    map1.ord = map2.ord;
    map2.col = col;
    map2.row = row;
    map2.ord = ord;
    return boardMap;
};

const checkIntegrity = boardMap => {
    const orderedBoardMap = orderBy(boardMap, 'ord', 'asc');
    return !orderedBoardMap.some((item, i) => {
        return i > 0 && item.id !== orderedBoardMap[i-1].id + 1;
    });
};

export {
    checkIntegrity,
    clearShuffleInterval,
    generateBoard,
    getActiveItems,
    moveItem,
    shuffleItems,
};
