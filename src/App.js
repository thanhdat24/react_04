import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Header from "./components/Home/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import React from "react";
import ToDoListRCC from "./pages/ToDoList/ToDoListRCC";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/todolistrcc" component={ToDoListRCC} />
        <Route exact path="/todolistrfc" component={ToDoListRFC} />

        <Route exact path="*" component={PageNotFound} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
