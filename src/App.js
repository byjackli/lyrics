import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/mainstyles.css';
import './styles/queries.css'

import Gate from './pages/Gate';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/"} exact component={Gate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
