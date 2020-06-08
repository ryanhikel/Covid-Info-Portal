import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListArticles from '../ListArticles/ListArticles';
import Statistics from '../Statistics/Statistics';
import Navigation from '../Navigation/Navigation'
import LandingPage from '../LandingPage/LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Navigation />
          <Route path={`/statistics`} component={Statistics} />
          <Route path='/articles' component={ListArticles} />
          <Route path='/' exact component={LandingPage} />
        </div>
      </Router>
    )
  }
}

export default App;
