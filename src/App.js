import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/mainstyle.css';
import './styles/queries.css'

import Styleguide from './pages/Styleguide';
import Gate from './pages/Gate';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/"} exact component={Gate} />
          <Route path="/styleguide" exact component={Styleguide} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
