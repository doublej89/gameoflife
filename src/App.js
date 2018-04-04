import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 30;
    this.cols = 50;
    this.state = {
      grid: Array.fill(this.rows).fill(Array.fill(this.cols).fill(false)),
      generation: 0,
      speed: 100
    };
  }

  play() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      let grid = this.state.grid;
      let newGrid = grid.map(arr => arr.slice());

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let count = 0;
          if (i > 0 && grid[i-1][j]) count++;
          if (i < this.rows && grid[i+1][j]) count++;
          if (i > 0 && j > 0 && grid[i-1][j-1]) count++;
          if (i < this.rows && j < this.cols && grid[i+1][j+1]) count++;
          if (j < this.cols && grid[i][j+1]) count++;
          if (j > 0 && grid[i][j-1]) count++;
          if (j > 0 && i < this.rows && grid[i+1][j-1]) count++;
          if (i > 0 && j < this.cols && grid[i-1][j+1]) count++;
          if (!grid[i][j] && count === 3) newGrid[i][j] = true;
          if (grid[i][j] && (count < 2 || count > 3)) newGrid[i][j] = false;
        }
      }
      this.setState({
        grid: newGrid,
        generation: this.state.generation + 1
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
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
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

  render() {
    return (
      <div className="App">
        <h1>The Game of Life!</h1>

      </div>
    );
  }
}

export default App;
