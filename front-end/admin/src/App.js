import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
class App extends Component {
  render() {
    return (
      <div className="App">
        <DatePicker/>
      </div>
    );
  }
}

export default App;
