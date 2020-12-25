import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Router } from "@reach/router";
import Employees from "./page/employees";
import RoomFee from "./page/roomFee";
import ShowRooms from "./page/rooms/showRooms";
import Rooms from "./page/rooms";
import AddRoom from "./page/rooms/addRoom";
import ShowMonth from "./page/rooms/showFeeMonth";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Router>
          <Route path="/employees" component={Employees} />
          <Route path="/roomFee" component={RoomFee} />

          <Route path="/" component={Rooms} />
          <Route path="/addRoom" component={AddRoom} />
          <Route path="/showRooms" component={ShowRooms} />
          <Route path="/showMonth" component={ShowMonth} />
        </Router>
      </div>
    )
  }
}
export default App