import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: Array.fill(this.state.rows).fill(Array.fill(this.state.cols).fill(false)),
      generation: 0,
      speed: 100,
      rows = 30,
      cols = 50
    };
  }

  play() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      let { grid, rows, cols, generation } = this.state;
      let newGrid = grid.map(arr => arr.slice());
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let neighbors = 0;
          if (i > 0 && grid[i-1][j]) neighbors++;
          if (i < rows && grid[i+1][j]) neighbors++;
          if (i > 0 && j > 0 && grid[i-1][j-1]) neighbors++;
          if (i < rows && j < cols && grid[i+1][j+1]) neighbors++;
          if (j < cols && grid[i][j+1]) neighbors++;
          if (j > 0 && grid[i][j-1]) neighbors++;
          if (j > 0 && i < rows && grid[i+1][j-1]) neighbors++;
          if (i > 0 && j < cols && grid[i-1][j+1]) neighbors++;
          if (!grid[i][j] && neighbors === 3) newGrid[i][j] = true;
          if (grid[i][j] && (neighbors < 2 || neighbors > 3)) newGrid[i][j] = false;
        }
      }
      this.setState({
        grid: newGrid,
        generation: generation++
      });
    }, this.state.speed);
  }

  pause() {
    clearInterval(this.intervalId);
  }

  liveOrDie(row, col) {
    let newGrid = this.state.grid.map(arr => arr.slice());
    newGrid[row][col] = !newGrid[row][col];
    this.setState({
      grid: newGrid
    }); 
  }

  populate() {
    let newGrid = this.state.grid.map(arr => arr.slice());
    let { rows, cols } = this.state;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.random() <= 0.25) newGrid[i][j] = true;
      }
    }
    this.setState({
      grid: newGrid
    });
  }

  speedUp() {
    this.setState({
      speed: this.state.speed - 100
    });
  }

  slowDown() {
    this.setState({
      speed: this.state.speed + 100
    });
  }

  changeResolution(size) {
    switch (size) {
      case 'small':
        this.setState({
          rows: 10,
          cols: 20
        });
        break;
      case 'large':
        this.setState({
          rows: 50,
          cols: 70
        });
        break;
      default:
        this.setState({
          rows: 30,
          cols: 50
        });
    }
    this.reset();
  }

  reset() {
    this.setState({
      grid: Array.fill(this.state.rows).fill(Array.fill(this.state.cols).fill(false)),
      generation: 0,
      speed: 100
    });
  }

  render() {
    let {grid, rows, cols, generation} = this.state;
    return (
      <div className="App">
        <h1>The Game of Life!</h1>
        <Controls
          play={this.play}
          pause={this.pause}
          speedUp={this.speedUp}
          slowDown={this.slowDown}
          populate={this.populate}
          reset={this.reset}
          changeResolution={this.changeResolution} />
        <Grid rows={rows} cols={cols} liveOrDie={this.liveOrDie} grid={grid}/>
        <h2>Generations: {generation}</h2>
      </div>
    );
  }
}

export default App;
