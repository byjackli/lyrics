import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Intext } from './Clicks';
import firebase from '../config/firebase';


// Navigation bar, use this on hompage
export class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
    }

    toggleMenu() {
        this.setState({ menu: !this.state.menu });
        console.log("pressed")
    }
    render() {
        return (
            <>
                <nav>

                </nav>
                {this.state.menu && (
                    <>
                        <Menubar toggleMenu={this.toggleMenu.bind(this)} />
                        <div className="modalbg" onClick={this.toggleMenu.bind(this)}></div>
                    </>
                )}
            </>
        );
    }
}


// Compact Navigation Bar, use this navigation bar on all project-specific pages
export class CompactNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
    }

    toggleMenu() { this.setState({ menu: !this.state.menu }); }

    render() {
        return (
            <>
                <div className="compact-navbar">
                    <div className="left">
                        <a aria-label="byjackli Menu" onClick={this.toggleMenu.bind(this)} ><i className="fas fa-bars"></i></a>
                        <a href="https://www.byjackli.com/projects">explore more byjackli</a>
                    </div>
                    <div>
                        <Link to={`/project/${this.props.uri}`}>click to learn more about this project</Link>
                    </div>
                </div>
                {this.state.menu && (
                    <>
                        <Menubar toggleMenu={this.toggleMenu.bind(this)} />
                        <div className="modalbg" onClick={this.toggleMenu.bind(this)}></div>
                    </>
                )}
            </>
        );
    }
}


// Menu Bar, use this on homepage
export function Menubar(props) {

    function greetings() {
        let date = new Date(), time = date.getHours() * 100 + date.getMinutes();
        if (559 < time && time < 1200) { return `Morning`; }
        else if (1200 < time && time < 1700) { return `Afternoon`; }
        else if (1700 < time && time < 2001) { return `Evening`; }
        else { return `Night`; }
    }
    function logout() { 
        firebase.auth().signOut(); 
        localStorage.clear();
        window.location.assign("/");
    }

    return (
        <div className="menubar vrtTL">
            <div className="top">
                <Button label="close menu" shape="box" color="fill" onClick={props.toggleMenu} />
                <div className="categories">
                    <p>Greetings and Good {greetings()}!</p>
                    <ol>
                        <li>Jack</li>
                        <li><Button shape="box" color="nofill" href="/resume" label="Resume" className="type4" /></li>
                        <li><Button shape="box" color="nofill" href="/about" label="About" className="type4" /></li>
                        <li><Button shape="box" color="nofill" href="/about" label="Contact" className="type4" /></li>
                    </ol>
                    <ol>
                        <li>Projects</li>
                        <li><Button shape="box" color="nofill" href="/project" label="See All" className="type4" /></li>
                        <li><Button shape="box" color="nofill" href="/project/travel" label="Travel" className="type4" /></li>
                        <li><Button shape="box" color="nofill" href="/project/photos" label="Photos" className="type4" /></li>
                        <li><Button shape="box" color="nofill" href="/project/focus" label="Focus" className="type4" /></li>
                        <li><Button shape="box" color="nofill" href="/project/lyrics" label="Lyrics" className="type4" /></li>
                        <li><Button shape="box" color="nofill" href="/project/playlist" label="Playlist" className="type4" /></li>
                    </ol>
                    <ol>
                        <li>Account</li>
                        <li><Button shape="box" color="nofill" label="Profile" className="type4 invalid" /></li>
                        <li><Button shape="box" color="nofill" label="Language" className="type4 invalid" /></li>
                        <li><Button shape="box" color="nofill" label="Country" className="type4 invalid" /></li>
                    </ol>
                </div>
            </div>
            <div className="bottom">
                <Button shape="box" color="fill" href="#" label="sign out" type="fill" onClick={logout} />
            </div>
        </div>
    );
}


// Footer, use this on all byjackli related pages
export function Footer(props) {
    return (
        <footer className="hrzTL">
            <div className="left">
                <Link className="style3" to="/">byjackli</Link>
                <p>if you can't make sacrifices, then you need a new goal</p>
            </div>
            <div className="hrzTL">

                <ol>
                    <li className="style5">Contact</li>
                    <li>347 476 - 4944</li>
                    <li>jackli@buffalo.edu</li>
                    <li>email@byjackli.com</li>
                </ol>
                <ol>
                    <li className="style5">Proudly built with</li>
                    <li>- Javascript</li>
                    <li>- Reactjs</li>
                    <li>- Visual Studio Code</li>
                    <li>- Firebase</li>
                </ol>
                <ol>
                    <li className="style5">Other projects</li>
                    <li><Intext flat={true} href="/project/travel" label="Travel - help travelers make decisions" /></li>
                    <li><Intext flat={true} href="/project/photos" label="Photos - immersive instagram experience" /></li>
                    <li><Intext flat={true} href="/project/focus" label="Focus - chrome extensions to improve focus" /></li>
                    <li><Intext flat={true} href="/project/lyrics" label="Lyrics - music and lyrics side-by-side" /></li>
                    <li><Intext flat={true} href="/project/playlists" label="Playlists - share your spotify playlists" /></li>
                </ol>
            </div>
        </footer>
    );
}