import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NotFound from "./components/common/not-found";
import Home from "./components/home";
import NavBar from "./components/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import LoginForm from "./components/common/loginForm";
import Logout from "./components/common/logout";
import News from "./components/News/news";
import NewsForm from "./components/News/newsForm";

import "react-toastify/dist/ReactToastify.css";
import "./assets/fontawesome-5.8.1/css/all.css";

export default () => {
  return (
    <Fragment>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <ProtectedRoute path="/logout" component={Logout} />
          <ProtectedRoute path="/news/:id" component={NewsForm} />
          <ProtectedRoute path="/news" component={News} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="not-found" />
        </Switch>
      </main>
    </Fragment>
  );
};
