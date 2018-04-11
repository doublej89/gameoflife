import React, { Component } from 'react';

class Cell extends Component {
    liveOrDie() {
        let {row, col} = this.props;
        this.props.liveOrDie(row, col);
    }

    render() {
        return (
            <div className={this.props.cellStyle} onClick={this.liveOrDie.bind(this)}></div>
        );
    }
}

export default Cell;
