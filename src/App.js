import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './config/firebase';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from './config/spotify';
import { GENIUS_CLIENT_ID, GENIUS_CLIENT_SECRET, GENIUS_REDIRECT_URI } from './config/genius';

import './styles/mainstyle.css';
import './styles/queries.css'

import Styleguide from './pages/styleguide';
import Gate from './pages/gate';
import Next from './pages/next';
import Lyrics from './pages/lyrics';
import Error from './pages/error';
import { CompactNavbar, Footer } from './components/Navigation';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      pages: <><Route path="/" component={() => { return (<main><section></section></main>) }} /></>
    }
  }

  componentDidMount() {
    window.addEventListener("offline", this.renderOffline.bind(this));

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
              doc.data().queueID ? localStorage.setItem("queueID", doc.data().queueID) : console.log("Queue was deleted -- please reset.");
              this.setState({
                pages: <Route path="/" exact component={Lyrics} />,
                user: user
              })


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
    // API token refresh manager
    if (localStorage.getItem("spotifyRefresh")) {
      this.spotifyTokenInterval = setInterval(
        this.tokenRefresh(
          "spotify",
          "https://accounts.spotify.com/api/token",
          SPOTIFY_CLIENT_ID,
          SPOTIFY_CLIENT_SECRET,
          SPOTIFY_REDIRECT_URI,
        ), 3500000);
    }
    // if (localStorage.getItem("geniusRefresh")) {
    //   this.geniusTokenInterval = setInterval(
    //     this.tokenRefresh(
    //       "genius",
    //       "https://accounts.spotify.com/api/token",
    //       GENIUS_CLIENT_ID,
    //       GENIUS_CLIENT_SECRET,
    //       GENIUS_REDIRECT_URI,
    //     ), 3500000);
    // }

    if (window.location.href.includes("spotifyAuth?code=")) {
      localStorage.setItem("spotifyAuth", window.location.href.split("?code=")[1]);
      this.oAuth(
        "spotify",
        window.location.href.split("?code=")[1],
        "https://accounts.spotify.com/api/token",
        SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REDIRECT_URI,
        this.tokenRefresh.bind(this)
      );
    }
    // if (window.location.href.includes("geniusAuth?code=")) {
    //   localStorage.setItem("geniusAuth", window.location.href.split("?code=")[1]);
    //   // fetch("https://api.genius.com/oauth/token", {
    //   //   method: "POST",
    //   //   headers: {
    //   //     "Content-Type": "application/x-www-form-urlencoded"
    //   //   },
    //   //   body: `code=${window.location.href.split("?code=")[1]}&client_secret=${GENIUS_CLIENT_SECRET}&grant_type=authorization_code&client_id=${GENIUS_CLIENT_ID}&redirect_uri=${GENIUS_REDIRECT_URI}&response_type=code`

    //   // })
    //   this.oAuth(
    //     "genius",
    //     window.location.href.split("?code=")[1],
    //     "https://api.genius.com/oauth/token",
    //     GENIUS_CLIENT_ID,
    //     GENIUS_CLIENT_SECRET,
    //     GENIUS_REDIRECT_URI,
    //     // this.tokenRefresh.bind(this)
    //   );
    // }
  }
  componentWillUnmount() {
    clearInterval(this.spotifyTokenInterval);
    // clearInterval(this.geniusTokenInterval);
    window.removeEventListener("offline", this.renderOffline());
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

  renderOffline() {
    this.setState({
      pages: <>
        <Route path="/" component={Error} />
      </>
    })
  }


  // ============ GENIUS ============ //
  // Trade Auth code for Tokens
  oAuth(app, code, url, clientID, clientSECRET, redirectURI, callback) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=authorization_code&code=${code}&client_id=${clientID}&client_secret=${clientSECRET}&redirect_uri=${redirectURI}`
    })
      .then(res => res.json())
      .then(result => {
        result.access_token ? localStorage.setItem(`${app}Token`, result.access_token) : console.info("access token did not update");
        result.refresh_token ? localStorage.setItem(`${app}Refresh`, result.refresh_token) : console.info("refresh token did not update");

        if (app === "spotify") { this.spotifyTokenInterval = setInterval(callback, 3500000); }
        // else if (app === "genius") { this.geniusTokenInterval = setInterval(callback, 3500000); }

        window.location.replace("/");
      });

  }
  // Keeping tokens up-to-date
  tokenRefresh(app, url, clientID, clientSECRET, redirectURI) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=refresh_token&refresh_token=${localStorage.getItem(`${app}Refresh`)}&client_id=${clientID}&client_secret=${clientSECRET}&redirect_uri=${redirectURI}`
    })
      .then(res => res.json())
      .then(result => {
        console.info(`${app} refresh token result`, result);
        localStorage.setItem(`${app}Token`, result.access_token);
      });
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
          <Footer />
        </div>
      </Router >
    )
  }
}

export default App;
