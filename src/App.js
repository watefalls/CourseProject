import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./comopnents/layouts/users";
import Main from "./comopnents/layouts/main";
import Login from "./comopnents/layouts/login";
import NavBar from "./comopnents/navBar";
import UserInfo from "./comopnents/userInfo";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/login" component={Login} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/:id?" component={UserInfo} />
      </Switch>
    </>
  );
}

export default App;
