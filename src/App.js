import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import Header from "./components/Home/Header/Header";
import Home from "./pages/Home/Home";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Login from "./pages/Login/Login";
import Modal from "./HOC/Modal/Modal";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import React from "react";
import ToDoListRCC from "./pages/ToDoList/ToDoListRCC";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import ToDoListSaga from "./pages/ToDoListSaga/ToDoListSaga";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";

function App() {
  return (
    <BrowserRouter>
      <Modal />
      <LoadingComponent />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/about" exact Component={About} />
        <HomeTemplate path="/dragdrop" exact Component={DemoDragDrop} />
        <HomeTemplate path="/dragdropdnd" exact Component={DragAndDropDnD} />
        <Route
          exact
          path="/contact"
          render={(propsRoute) => {
            return (
              <div style={{ background: "#fff" }}>
                <Contact {...propsRoute} />
              </div>
            );
          }}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/todolistrcc" component={ToDoListRCC} />
        <Route exact path="/todolistrfc" component={ToDoListRFC} />
        <Route exact path="/todolistredux" component={ToDoListRedux} />
        <Route exact path="/todolistsaga" component={ToDoListSaga} />
        <Route exact path="/demohocmodal" component={DemoHOCModal} />
        <Route exact path="*" component={PageNotFound} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
