import React, { Component } from 'react';

class Controls extends Component {
    changeResolution(e) {
        this.props.changeResolution(e.target.id);
    }

    render() {
        let {play, pause, speedUp, slowDown, populate, reset} = this.props;
        return (
            <div className='control-buttons'>
                <ul>
                    <li onClick={play}>Start Simulation</li>
                    <li onClick={pause}>Pause</li>
                    <li onClick={speedUp}>Speed Up</li>
                    <li onClick={slowDown}>Slow Down</li>
                    <li onClick={populate}>Populate</li>
                    <li onClick={reset}>Reset</li>
                    <li>Grid Size:
                        <ul>
                            <li id='small' onClick={this.changeResolution}>Small</li>
                            <li id='medium' onClick={this.changeResolution}>Medium</li>
                            <li id='large' onClick={this.changeResolution}>Large</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}