import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './config/firebase';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from './config/spotify';

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

          console.info(result.user);
          console.info(result);
          window.location.replace("/");
        })
    }
  }

  componentDidMount() {
    console.info("didMount", this.state.user);

    // application authentication (protected pages & page re-direction)
    const db = firebase.firestore();
    if (window.location.search) {
      this.confirm();
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.info(user.uid)
        db.collection("users").doc(user.uid).get()
          .then(doc => {
            if (!doc.exists || (doc.exists && !doc.data().done)) {
              this.setState({
                pages: <>
                  <Route path="/" exact component={Next} />
                  <Route path="/spotifyAuth" exact component={Next} />
                  <Route path="/geniusAuth" exact component={Next} />
                </>,
                user: user
              })
            }
            else {
              console.info(user)
              this.setState({
                pages: <Route path="/" exact component={Styleguide} />,
                user: user
              })

              // API token request manager
              if (localStorage.getItem("spotifyRefresh") && doc.data().spotifyAuth) { this.spotifyTokenInterval = setInterval(this.spotifyTokenRefresh, 3500000); }

              // if (window.location.href.includes("spotifyAuth?code=") || localStorage.getItem("spotifyAuth") || doc.data().spotifyAuth) {
              //   let spotifyAuth = window.location.href.split("?code=")[1];
              //   if (doc.data().spotifyAuth) { spotifyAuth = doc.data().spotifyAuth; }
              //   localStorage.setItem("spotifyAuth", window.location.href.split("?code=")[1]);
              //   fetch(`https://accounts.spotify.com/api/token`, {
              //     method: "POST",
              //     headers: {
              //       Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
              //       "Content-Type": "application/x-www-form-urlencoded"
              //     },
              //     body: `grant_type=authorization_code&code=${spotifyAuth}&redirect_uri=${SPOTIFY_REDIRECT_URI}`
              //   })
              //     .then(res => res.json())
              //     .then(result => {
              //       console.info("result from API token req", result);
              //       localStorage.setItem("spotifyToken", result.access_token);
              //       localStorage.setItem("spotifyRefresh", result.refresh_token);
              //       this.spotifyTokenInterval = setInterval(this.spotifyTokenRefresh, 6000);
              //     });
              // }
              // if (window.location.href.includes("geniusAuth?code=") || localStorage.getItem("geniusAuth") || doc.data().spotifyAuth) {
              //   let geniusAuth = window.location.href.split("?code=")[1];
              //   if (doc.data().geniusAuth) { geniusAuth = doc.data().geniusAuth; }
              //   localStorage.setItem("geniusAuth", geniusAuth);
              // }
            }
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
  componentWillUnmount() {
    clearInterval(this.spotifyTokenInterval);
  }

  spotifyTokenRefresh() {
    fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=refresh_token&refresh_token=${localStorage.getItem("spotifyRefresh")}&redirect_uri=${SPOTIFY_REDIRECT_URI}`
    })
      .then(res => res.json())
      .then(result => {
        console.info("spotify refresh token result", result);
        localStorage.setItem("spotifyToken", result.access_token);
      });
  }
  // geniusTokenRefresh() {
  //   fetch(`https://accounts.spotify.com/api/token`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: `grant_type=refresh_token&refresh_token=${localStorage.getItem("spotifyRefresh")}&redirect_uri=${REDIRECT_URI}`
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.info("genius refresh token result", result);
  //       localStorage.setItem("geniusToken", result.access_token);
  //     });
  // }

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
