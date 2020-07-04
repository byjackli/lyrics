import React from 'react';
import { Search } from '../components/Nodes';
import { Intext } from '../components/Clicks';
import firebase from '../config/firebase';

class Gate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            portal: false,

            status: `Sign Up`,
            label: `Already have an account!`,
            message: ``,
            email: ``,

            sent: false,
            modal: {},
        }
    }

    componentDidMount() {
        this.analyzer(this.props.match.path);
    }

    analyzer(uri) {
        console.info(this.props.match);
        console.info(uri);

        if (uri === "/login") {
            this.togglePortal()
            this.toggleStatus();
        }
        else if (uri === "/signup") {
            this.togglePortal();
        }
    }

    togglePortal() { this.setState({ portal: !this.state.portal }) }
    toggleStatus() {
        if (this.state.status === 'Sign Up') {
            this.setState({
                status: `Log In`,
                label: `Don't have an account!`
            })
        }
        else {
            this.setState({
                status: `Sign Up`,
                label: `Already have an account!`
            })
        }
    }

    emailChangeHandler(event) {
        this.setState({ email: event.target.value })
    }
    submit(event) {
        console.log(this.state.email);
        let actionCodeSettings = {
            url: 'http://localhost:3000/',
            handleCodeInApp: true,
        };
        if (event.key === 'Enter' || event.target.id) {
            firebase.auth().sendSignInLinkToEmail(this.state.email, actionCodeSettings)
                .then(result => {
                    this.setState({ message: 'Just sent a verification link to your email.' });
                    window.localStorage.setItem('emailForSignIn', this.state.email);
                })
                .catch(error => {
                    this.setState({ message: error.message })
                    console.info(error.message)
                })
        };
    }

    renderPortal() {
        if (this.state.portal) {
            return (
                <div className="front-portal vrtCC">
                    <div className="front-form-all vrtCC">
                        <p className="style3">{this.state.status}</p>
                        <p>{this.state.message}</p>
                        <div className="hrzCC">
                            <input type="email" placeholder="email" onChange={this.emailChangeHandler.bind(this)} onPaste={this.emailChangeHandler.bind(this)} onKeyDown={this.submit.bind(this)}></input>
                            <i className="vrtCC fas fa-arrow-right" id="submit" onClick={this.submit.bind(this)}></i>
                        </div>
                        <Intext label={this.state.label} onClick={this.toggleStatus.bind(this)} />
                    </div>
                    <div className="modalbg" onClick={this.togglePortal.bind(this)}></div>
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <>
                {this.renderPortal()}
                <main className={`gate portal-modal-${this.state.portal}`}>
                    <section className="front vrtCC">
                        <Search page="gate" size="large" placeholder="Search a song" onClick={this.togglePortal.bind(this)} />
                        <div className="front-bg dragoff vrtCC">
                            <h1>Lyrics</h1>
                            <div className="front-img" style={{ backgroundImage: `radial-gradient(ellipse, var(--LightS) 2%, transparent 100%), url(https://i.scdn.co/image/ab67616d00001e0214d3a2a7a92b85a06c93e544)` }}></div>
                        </div>
                        {/* <PillFill label="SIGN UP" OnClick={this.toggleSignup.bind(this)} /> */}
                        {/* <Intext label="LOG IN" OnClick={this.toggleLogin.bind(this)} /> */}
                    </section>
                    {/* <section className="about">
                        <h1>ABOUT</h1>
                    </section> */}
                </main>
            </>
        )
    }
}

export default Gate;