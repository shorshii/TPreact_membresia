import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './modules/home';
import Planilla from './modules/planilla';
import Fin from './modules/fin';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/planilla" component={Planilla} />
            <Route path="/fin" component={Fin} />
            
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;