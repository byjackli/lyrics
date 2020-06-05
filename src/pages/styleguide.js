import React, { Component } from 'react';
import { Navbar, CompactNavbar, Menubar, Footer } from '../components/Navigation';
import { Searchbar, Suggestbox } from '../components/Search';
import { Card, Slot } from '../components/Nodes';
import { BoxFill, PillFill, Intext } from '../components/Clicks';


class Styleguide extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <main className="styleguide">
                <h1>Styleguide</h1>
                <section className="navigation">
                    <h2>Navigation</h2>
                </section>
                <section className="typography">
                    <h2>Typography</h2>
                </section>
                <section>
                    <h2>Color Palette</h2>
                </section>
                <section className="buttons-and-links">
                    <h2>Buttons and Links</h2>
                </section>
                <section className="cards-and-slots">
                    <h2>Cards and Slots</h2>
                </section>
            </main>
        )
    }
}

export default Styleguide;