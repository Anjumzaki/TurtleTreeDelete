import React from "react";
import Header from "./components/home/header/index";
import Home from "./components/home/index";
import News from "./components/home/news/News";
import Details from "./components/Details/Details";
import Login from "./components/admin/Login";
import AdminNews from "./components/admin/AdminNews";
import OtherHeader from './components/home/header/OtherHeader'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/news/detail/:heading" component={Details} />
          <Route path="/news">
            <OtherHeader/>
            <News />
          </Route>
          <Route exact path="/admin">
            <AdminNews />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
