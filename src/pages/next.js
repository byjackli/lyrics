import React from 'react';
import firebase from '../config/firebase';
import { Button } from '../components/Clicks';
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } from '../config/spotify';
import { GENIUS_CLIENT_ID, GENIUS_REDIRECT_URI, GENIUS_SCOPES } from '../config/genius';

class Next extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPage: ["profile", "spotify", "confirm"],
            curPage: "profile",

            displayName: "",
            firstName: "",
            lastName: "",
            profileImage: "",

            spotifyAcc: "not connected",
            geniusAcc: "not connected",

            displayNameMessage: null,
            firstNameMessage: null,
            lastNameMessage: null,
            message: null,
            label: "confirm",

            spotifyAuth: null,
            geniusASuth: null,

            good: false,
            done: false,
            confirm: 0,
        }
    }

    componentDidMount() {
        firebase.firestore().collection("users").doc(JSON.parse(localStorage.getItem("user")).uid).get()
            .then(user => {
                if (user.exists) {
                    if (user.data().spotifyAuth && user.data().geniusAuth) { this.setState({ spotifyAcc: "Connected", geniusAcc: "Connected" }); }
                    else if (user.data().spotifyAuth) { this.setState({ spotifyAcc: "Connected" }); }
                    else if (user.data().geniusAuth) { this.setState({ geniusAcc: "Connected" }); }
                    this.setState({
                        displayName: user.data().displayName,
                        firstName: user.data().firstName,
                        lastName: user.data().lastName,
                        profileImage: user.data().profileImage,
                        good: user.data().good
                    })

                }
            })
        if (window.location.href.includes("spotifyAuth?code=") || localStorage.getItem("spotifyAuth")) {
            this.setState({ spotifyAcc: "Connected", curPage: "spotify" });
        }
        // if (window.location.href.includes("geniusAuth?code=") || localStorage.getItem("geniusAuth")) {
        //     this.setState({ geniusAcc: "Connected", curPage: "confirm" });
        // }
    }
    componentWillUnmount() {
        clearInterval(this.spotifyTokenInterval);
        clearInterval(this.geniusTokenInterval);
    }



    // navigate between pages
    changePage(data, event) {
        let
            index = this.state.allPage.indexOf(this.state.curPage),
            spotify = localStorage.getItem("spotifyAuth"),
            genius = localStorage.getItem("geniusAuth");


        if (data === 0 && -1 < index - 1) {
            this.setState({ curPage: this.state.allPage[index - 1] });
        }
        else if (data === 1) {
            if (index + 1 < this.state.allPage.length) {
                this.setState({ curPage: this.state.allPage[index + 1] });
            }
            else if (index + 1 === this.state.allPage.length) {
                if (spotify) {
                    if (genius) {
                        firebase.firestore().collection("users").doc(JSON.parse(localStorage.getItem("user")).uid).set({
                            spotifyAuth: spotify,
                            geniusAuth: genius,
                            done: true
                        }, { merge: true });
                    }
                    firebase.firestore().collection("users").doc(JSON.parse(localStorage.getItem("user")).uid).set({
                        spotifyAuth: spotify,
                        done: true
                    }, { merge: true });
                }
                else if (genius) {
                    firebase.firestore().collection("users").doc(JSON.parse(localStorage.getItem("user")).uid).set({
                        geniusAuth: genius,
                        done: true
                    }, { merge: true });
                }
                else {
                    firebase.firestore().collection("users").doc(JSON.parse(localStorage.getItem("user")).uid).set({
                        done: true
                    }, { merge: true });
                }

                fetch("https://api.spotify.com/v1/me", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        console.info("result of requesting user ID", result)
                        fetch(`https://api.spotify.com/v1/users/${result.id}/playlists`, {
                            method: "POST",
                            body: JSON.stringify({
                                name: `${localStorage.getItem("user+")}'s Queue - lyrics.byjackli.com`,
                                description: `This playlist was automatically generated by lyrics.byjackli.com`,
                                public: true
                            }),
                            headers: {
                                Accept: "application/json",
                                Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
                                "Content-Type": "application/json"
                            }
                        })
                            .then(res2 => res2.json())
                            .then(result2 => {
                                console.info("result of requesting playlist ID", result2.id);
                                localStorage.setItem("created", true);
                                firebase.firestore().collection("users").doc(JSON.parse(localStorage.getItem("user")).uid).set({
                                    queueID: result2.id
                                }, { merge: true });
                            })
                    })
                window.location.replace("/");
                localStorage.removeItem("spotifyAuth");
                localStorage.removeItem("geniusAuth");
            }
        }
    }

    // ============ PROFILE ============ //
    // submit handler
    submitProfile() {
        if (this.state.good) {
            if (0 < this.state.confirm) {
                firebase.firestore().collection("users").doc(JSON.parse(localStorage.getItem("user")).uid).set({
                    displayName: this.state.displayName,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    profileImage: this.state.profileImage,
                    good: this.state.good
                }, { merge: true });

                this.setState({ message: null, curPage: "spotify" });
                localStorage.setItem("user+", this.state.firstName);
            }
            else {
                this.setState({ confirm: this.state.confirm + 1, message: "Great, you just confirmed the data is correct. Now hit save!", label: "save" });
            }
        }
        else {
            this.setState({ message: "Make sure required fields are not blank!" })
        }
    }
    // input handlers
    displayNameChangeHandler(event) {
        let data = event.target.value;

        if (data.length < 4) { this.setState({ displayName: data, displayNameMessage: "at least 4 characters", good: false }); }
        else if (12 < data.length) { this.setState({ displayName: data, displayNameMessage: "less than 12 characters", good: false }); }
        else { this.setState({ displayName: data, displayNameMessage: null, good: true }); }

    }
    firstNameChangeHandler(event) {
        let data = event.target.value;

        if (data.length < 1) { this.setState({ firstName: data, firstNameMessage: "cannot be empty", good: false }); }
        else { this.setState({ firstName: data, firstNameMessage: null, good: true }); }
    }
    lastNameChangeHandler(event) {
        let data = event.target.value;

        if (data.length < 1) { this.setState({ lastName: data, lastNameMessage: "cannot be empty", good: false }); }
        else { this.setState({ lastName: data, lastNameMessage: null, good: true }); }
    }
    profileImageChangeHandler(event) {
        this.setState({ profileImage: event.target.value })
    }
    // render basic profile page
    renderProfile() {
        return (
            <>
                <div><input type="text" placeholder={this.state.displayName === "" ? "Display Name (required)" : this.state.displayName} onChange={this.displayNameChangeHandler.bind(this)} onPaste={this.displayNameChangeHandler.bind(this)}></input><p className="next-error">{this.state.displayNameMessage}</p></div>
                <div><input type="text" placeholder={this.state.firstName === "" ? "First Name (required)" : this.state.firstName} onChange={this.firstNameChangeHandler.bind(this)} onPaste={this.firstNameChangeHandler.bind(this)}></input><p className="next-error">{this.state.firstNameMessage}</p></div>
                <div><input type="text" placeholder={this.state.lastName === "" ? "Last Name (required)" : this.state.lastName} onChange={this.lastNameChangeHandler.bind(this)} onPaste={this.lastNameChangeHandler.bind(this)}></input><p className="next-error">{this.state.lastNameMessage}</p></div>
                <div><input type="text" placeholder={this.state.profileImage === "" ? "Profile Image" : this.state.profileImage} onChange={this.profileImageChangeHandler.bind(this)} onPaste={this.profileImageChangeHandler.bind(this)}></input><p className="next-error">{this.state.profileImageMessage}</p></div>
                <div className="profileImage" style={{ backgroundImage: `url(${this.state.profileImage})` }}></div>
                <div className="hrzCC">
                    <p>Yes, all the information looks correct.&nbsp;</p>
                    <Button shape="pill" color="fill" label={this.state.label} onClick={this.submitProfile.bind(this)} />
                </div>
                {/* preview profile image */}
            </>
        )
    }

    // ============ SPOTIFY ============ //
    // render spotify page
    renderSpotify() {
        return (
            <>
                <p className="style4">Spotify is {this.state.spotifyAcc}</p>
                <div className="hrzCC">
                    <Button shape="pill" color="fill" label="skip" id="skip-spotify" onClick={this.changePage.bind(this, 1)} />
                    <Button shape="pill" color="fill" label="authenticate"
                        href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}${SPOTIFY_SCOPES ? `&scope=${encodeURIComponent(SPOTIFY_SCOPES)}` : ''}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`}
                    />
                </div>
                <br />
                <div className="vrtTL">
                    <h2>By authenticating,</h2>
                    <p>- you acknowledge that LYRICS byjackli will create a singular playlist on your behalf.</p>
                    <p>- you acknowledge that LYRICS byjackli is not responsible of any damages to playlists or account while using this particular service.</p>
                    <p>- you acknowledge that LYRICS byjackli is not directly affiliated with Spotify</p>
                    <p>- you acknowledge that LYRICS byjackli requires a Spotify account in order for the app to work properly</p>
                </div>
            </>
        )
    }

    // ============ GENIUS ============ //
    // render genius page
    renderGenius() {
        return (
            <>
                <p className="style4">Genius is {this.state.geniusAcc}</p>
                <div className="hrzCC">
                    <Button shape="pill" color="fill" label="skip" id="skip-genius" onClick={this.changePage.bind(this, 1)} />
                    <Button shape="pill" color="fill" label="authenticate"
                        href={`https://api.genius.com/oauth/authorize?response_type=code&client_id=${GENIUS_CLIENT_ID}${GENIUS_SCOPES ? `&scope=${encodeURIComponent(GENIUS_SCOPES)}` : ''}&redirect_uri=${encodeURIComponent(GENIUS_REDIRECT_URI)}`}
                    />
                </div>
            </>
        )
    }

    // ============ CONFIRM ============ //
    // render confirm page
    renderConfirm() {
        return (
            <>
                <div>
                    <div className="vrtTL">
                        <h2>profile</h2>
                        <div>
                            <p><span className="style5">Display Name: </span>{this.state.displayName}</p>
                            <p><span className="style5">First Name: </span>{this.state.firstName}</p>
                            <p><span className="style5">Last Name: </span>{this.state.lastName}</p>
                            <p className="style5">Profile Image Preview:</p>
                            <div className="profileImage" style={{ backgroundImage: `url(${this.state.profileImage})` }}></div>
                        </div>
                    </div>
                    <div className="vrtTL">
                        <h2>spotify</h2>
                        <p><span className="style5">Status: </span>{this.state.spotifyAcc}</p>
                    </div>
                    {/* <div className="vrtTL">
                        <h2>genius</h2>
                        <p><span className="style5">Status: </span>{this.state.geniusAcc}</p>
                    </div> */}

                </div>
            </>
        )
    }




    // page render handler
    renderHandler() {
        if (this.state.curPage === "profile") { return this.renderProfile(); }
        else if (this.state.curPage === "spotify") { return this.renderSpotify(); }
        else if (this.state.curPage === "genius") { return this.renderGenius(); }
        else if (this.state.curPage === "confirm") { return this.renderConfirm(); }
    }
    // specific page render handler
    renderPage(data, event) {
        this.setState({ curPage: data });
    }
    // button render handler
    renderButtons() {
        let arr = [], color = "fill";
        this.state.allPage.forEach(page => {
            if (this.state.curPage === page) { color = "fill" }
            else { color = "nofill" }
            arr.push(
                <Button
                    key={page}
                    shape="pill"
                    color={color}
                    label={this.state.allPage.indexOf(page) + 1}
                    onClick={this.renderPage.bind(this, page)}
                />
            );
        })
        return arr;
    }

    render() {
        return (
            <main className="next">
                <section className={`vrtTC ${this.state.curPage}`}>
                    <div className="next-nav vrtTL">
                        <h1>{this.state.curPage}</h1>
                        <div className="supercede hrzTL">
                            {this.renderButtons()}
                        </div>
                        <p style={{ backgroundColor: "var(--DarkL)", color: "var(--LightL)" }}>{this.state.message}</p>
                    </div>
                    <div className="next-form vrtTC">
                        {this.renderHandler()}
                    </div>
                    <div className="supercede next-buttons hrzCC">
                        <Button shape="pill" color="fill" label="<" onClick={this.changePage.bind(this, 0)} />
                        <Button shape="pill" color="fill" label=">" onClick={this.changePage.bind(this, 1)} />
                    </div>
                </section>
            </main>
        )
    }
}

export default Next;