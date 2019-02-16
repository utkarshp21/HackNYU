import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HeartBeat from './Heartbeat';
import _ from 'lodash';

class App extends Component {
  constructor(props){
    super(props)
    this.interval = null;
    this.state = {
      data: {"heartBeat": 75},
      prev:{
        "heartBeat":[['x','y']]
      }
    }
  }

  componentDidMount(){
    this.interval = setInterval(async () => {
      let response = await fetch('https://9d7e18d3.ngrok.io/values');
      let sensorValues = await response.json();
      

      let prevBeats = this.state.prev.heartBeat;
      let addBeats = this.getHeartBeat(sensorValues.values.hrm.heartRate);
      let newHeartBeats = _.concat(prevBeats, [addBeats]);
      
      this.setState({
        prev: {
          "heartBeat": newHeartBeats
        }
      })
    }, 2000);

  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  getHeartBeat(rate){
    // console.log(this.state.prev);
    return [
      Math.floor(Date.now()/1000),
      parseInt(rate)
    ]
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <HeartBeat data={this.state.prev.heartBeat}></HeartBeat>
        </div>
      </div>
    );
  }
}

export default App;
