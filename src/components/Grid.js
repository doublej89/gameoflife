import React from 'react';
import Cell from './Cell';

const Grid = ({grid, rows, cols, liveOrDie}) => {
    let cellStyle = '';
    let gridRows = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            cellStyle = grid[i][j] ? 'cell alive' : 'cell dead'; 
            gridRows.push(
                <Cell cellStyle={cellStyle} liveOrDie={liveOrDie} key={`${i}x${j}`} row={i} col={j} />
            );        
        }
    }
    return (
        <div className='grid'>
            {gridRows}
        </div>
    );
};

export default Grid;