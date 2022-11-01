import React, { Component } from "react";
import Movies from "./components/movies";
import LoginForm from "./components/loginForm";
import Home from "./components/home";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";
import BootstrapNavBar from "./components/common/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

class App extends Component {
  state = {};

  render() {
    console.log("App - Rendered");

    return (
      <React.Fragment>
        <BootstrapNavBar />
        <div className="content">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/movies" from="/" />
            <Route path="/" exact component={Home} />
            {/* Redirect if page is not found */}
            {/* <Route path="/" exact component={Home} /> // we can use exact to match exact, or switch to only match first */}
            <Redirect to="/not-found" /> {/* Redirect if page is not found */}
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
