import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Employees from "./page/employees";
import RoomFee from "./page/roomFee";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route path="/employees" component={Employees} />
        <Route path="/roomFee" component={RoomFee} />
      </div>
    )
  }
}
export default App