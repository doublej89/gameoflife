import React from 'react';
import Cell from './Cell';

const Grid = ({grid, rows, cols, liveOrDie}) => {
    let cellStyle = '';
    let gridRows = [];
    let gridStyle = {
        gridTemplateColumns: 'repeat(' + cols + ', minmax(15px, 15px))',
        gridTemplateRows: 'repeat(' + rows + ', minmax(15px, 15px))'
    };
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {           
            cellStyle = grid[i][j] ? 'cell alive' : 'cell dead'; 
            gridRows.push(
                <Cell cellStyle={cellStyle} liveOrDie={liveOrDie} key={`${i}x${j}`} row={i} col={j} />
            );        
        }
    }
    return (
        <div className='grid' style={gridStyle}>
            {gridRows}
        </div>
    );
};

export default Grid;