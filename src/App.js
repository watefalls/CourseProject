import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/hoc/appLoader";

function App() {
  return (
    <div>
      <AppLoader>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:id?/:edit?" component={Users} />
          <Route path="/login:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
        <ToastContainer />
      </AppLoader>
    </div>
  );
}

export default App;
