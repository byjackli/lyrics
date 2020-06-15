import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './config/firebase';

import './styles/mainstyle.css';
import './styles/queries.css'

import Styleguide from './pages/styleguide';
import Gate from './pages/gate';
import { CompactNavbar, Footer } from './components/Navigation';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: [
        <Route path="/" exact component={Gate} />,
        <Route path={["/login", "/signup"]} component={Gate} />
      ]
    }
  }

  componentWillMount() {
    this.checkLogin();
  }

  checkLogin() {
    if (localStorage.getItem("user")) {
      this.setState({
        pages: [
          <Route path="/" exact component={Styleguide} />
        ]
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <CompactNavbar />
          <Switch>
            {this.state.pages}
            <Route path="/styleguide" exact component={Styleguide} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router >
    )
  }
}

export default App;
