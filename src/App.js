import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './config/firebase';

import './styles/mainstyle.css';
import './styles/queries.css'

import Styleguide from './pages/styleguide';
import Gate from './pages/gate';
import Next from './pages/next';
import { CompactNavbar } from './components/Navigation';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      pages: <>
      </>
    }
  }

  confirm() {
    console.info("confirming");
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Confirm by re-entering your email.")
      }
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(result => {
          localStorage.removeItem("emailForSignIn");
          localStorage.setItem("user", JSON.stringify(result.user));
          window.location.replace("/");

          console.info(result.user);
          console.info(result);
        })
    }
  }

  componentDidMount() {
    console.info("didMount", this.state.user);
    if (window.location.search) {
      this.confirm();
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          pages: <>
            <Route path="/" exact component={Styleguide} />
            <Route path="/next" exact component={Next} />
          </>,
          user: user
        })
      }
      else {
        this.setState({
          pages: <>
            <Route path="/" exact component={Gate} />
            <Route path={["/login", "/signup"]} component={Gate} />
          </>,
          user: user
        })
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    console.info("didRender", this.state.pages);
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
