import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/navBar";
import UserInfo from "./components/userInfo";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/:id?" component={UserInfo} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
