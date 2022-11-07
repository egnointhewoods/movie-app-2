import * as React from "react";
import Navbar from "./components/Layout/Navbar";
import { useState, useEffect } from "react";

import "./App.css";
import LoadingScreen from "./components/LoadingScreen";
import { BrowserRouter as Router } from "react-router-dom";

import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  const [isPageLoaded, pageLoaded] = useState(false);

  useEffect(() => pageLoaded(true), []);

  if (!isPageLoaded) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  } else
    return (
      <Router>
        <div>
          <Navbar />
          <AnimatedRoutes />
        </div>
      </Router>
    );
}

export default App;
