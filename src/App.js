import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/mainstyle.css';
import './styles/queries.css'

import Styleguide from './pages/Styleguide';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/styleguide" exact component={Styleguide} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
