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
                        <button className="dragoff" aria-label="Menu" onClick={this.toggleMenu.bind(this)}>{
                            this.state.menu
                                ? <i className="style3 fas fa-times"></i>
                                : <i className="style3 fas fa-bars"></i>
                        }</button>
                        <a href="https://www.byjackli.com/projects">explore more byjackli</a>
                    </div>
                    <div>
                        <a href={`https://byjackli.com/project/lyrics`}>learn more about this project</a>
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
                <div className="categories">
                    <p>Greetings and Good {greetings()}!</p>
                    <ol role="group" aria-label="pages">
                        <li>Jack</li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="https://byjackli.com/resume" label="Resume" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="https://byjackli.com/about" label="About" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="https://byjackli.com/projects" label="Projects" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="https://byjackli.com/about" label="Contact" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="/styleguide" label="Styleguide" type="nofill" className="type4" /></li>
                    </ol>
                    <ol role="group" aria-label="projects">
                        <li>Projects</li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="/projects" label="See All" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="/project/lyrics" label="Lyrics" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="/project/pages" label="Pages" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="/project/topix" label="Topix" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="/project/travel" label="Travel" type="nofill" className="type4" /></li>
                        <li><Button role="menuitem" shape="box" color="nofill" href="/project/playlist" label="Playlist" type="nofill" className="type4" /></li>
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
                <a className="style3" href="https://byjackli.com">byjackli</a>
                <p>DARE TO IMAGINE.</p>
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
                    <li><a href="https://byjackli.com/project/lyrics">Lyrics - music and lyrics side-by-side</a></li>
                    <li><a href="https://byjackli.com/project/pages">Pages - simple website builder</a></li>
                    <li><a href="https://byjackli.com/project/focus">Topix - academic sharing platform</a></li>
                    <li><a href="https://byjackli.com/project/travel">Travel - help travelers make decisions</a></li>
                    <li><a href="https://byjackli.com/project/playlists">Playlists - share your spotify playlists</a></li>
                </ol>
            </div>
        </footer>
    );
}