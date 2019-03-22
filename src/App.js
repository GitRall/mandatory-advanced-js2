import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';
import Details from './Details';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path='/' component={Home} />
          <Route path='/add' component={Add} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/details/:id' component={Details} />
        </div>
      </Router>
    );
  }
}

export default App;
