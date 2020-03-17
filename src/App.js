import React, { Component } from 'react'
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mainpage from './Mainpage'
import SuccessPage from './Component/SuccessPage'
export class App extends Component {
  render() {
    return (
           <BrowserRouter>
                <Switch>
                   <Route path="/" component={Mainpage} exact />
                   <Route path="/SuccessPage" component={SuccessPage} exact />
                </Switch>
           </BrowserRouter>
    )
  }
}

export default App
