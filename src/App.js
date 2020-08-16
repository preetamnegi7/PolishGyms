import React from "react";
import { Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import PrimarySearchAppBar from "./components/Navbar/Header";
import Home from "./components/home";
import Error from "./components/Error";
import "./App.css";
import Map from "./components/Map";
import LabelBottomNavigation from "./components/Navbar/Footer";
const App = () => {
  return (
    <>
      <CssBaseline />
      <PrimarySearchAppBar />
      <Map />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Error} />
      </Switch>
      <LabelBottomNavigation />
    </>
  );
};

export default App;
