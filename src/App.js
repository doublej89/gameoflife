import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      speed: 100,
      //rows: 30,
      //cols: 50,
      grid: Array(this.rows).fill(Array(this.cols).fill(false))
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.liveOrDie = this.liveOrDie.bind(this);
    this.populate = this.populate.bind(this);
    this.speedUp = this.speedUp.bind(this);
    this.slowDown = this.slowDown.bind(this);
    this.changeResolution = this.changeResolution.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.populate();
  }

  play() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      let { grid } = this.state;
      let newGrid = grid.map(arr => arr.slice());
      
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let neighbors = 0;
          if (i > 0 && grid[i-1][j]) neighbors++;
          if (i < this.rows-1 && grid[i+1][j]) neighbors++;
          if (i > 0 && j > 0 && grid[i-1][j-1]) neighbors++;
          if (i < this.rows-1 && j < this.cols-1 && grid[i+1][j+1]) neighbors++;
          if (j < this.cols-1 && grid[i][j+1]) neighbors++;
          if (j > 0 && grid[i][j-1]) neighbors++;
          if (j > 0 && i < this.rows-1 && grid[i+1][j-1]) neighbors++;
          if (i > 0 && j < this.cols-1 && grid[i-1][j+1]) neighbors++;
          if (!grid[i][j] && neighbors === 3) newGrid[i][j] = true;
          if (grid[i][j] && (neighbors < 2 || neighbors > 3)) newGrid[i][j] = false;
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
    //let { rows, cols } = this.state;
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
    this.play();
  }

  slowDown() {
    this.setState({
      speed: this.state.speed + 100
    });
    this.play();
  }

  changeResolution(size) {
    
    switch (size) {
      case 'small':
        this.rows = 10;
        this.cols = 20;
        break;
      case 'large':
        this.rows = 50;
        this.cols = 70;
        break;
      default:
        this.rows = 30;
        this.cols = 50;
    }
    this.reset();
  }

  reset() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.setState({
      grid: Array(this.rows).fill(Array(this.cols).fill(false)),
      generation: 0,
      speed: 100
    });
  }

  render() {
    let {grid, generation} = this.state;
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
        <Grid rows={this.rows} cols={this.cols} liveOrDie={this.liveOrDie} grid={this.state.grid}/>
        <h2>Generations: {generation}</h2>
      </div>
    );
  }
}

export default App;
