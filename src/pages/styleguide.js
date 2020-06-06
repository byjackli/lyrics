import React, { Component } from 'react';
// import { Navbar, CompactNavbar, Menubar, Footer } from '../components/Navigation';
// import { Searchbar, Suggestbox } from '../components/Search';
// import { Card, Slot } from '../components/Nodes';
import { Button, Intext } from '../components/Clicks';


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
                    <div className="hrzTL">
                        <div>
                            <p>Roboto font family is used for most UI elements across the site.</p>
                            <div>
                                <h1>h1 and style1</h1>
                                <p>family:Roboto, size:3.25rem, weight:600</p>
                            </div>
                            <div>
                                <h2>h2 and style2</h2>
                                <p>family:Roboto, size:2.75rem, weight:600</p>
                            </div>
                            <div>
                                <h3>h3 and style3</h3>
                                <p>family:Roboto, size:2.00rem, weight:600</p>
                            </div>
                            <div>
                                <h4>h4 and style4</h4>
                                <p>family:Roboto, size:1.25rem, weight:600</p>
                            </div>
                            <div>
                                <h5>h5 and style5</h5>
                                <p>family:Roboto, size:1.00rem, weight:600</p>
                            </div>
                            <div>
                                <span>default, </span>
                                <em>italicized, </em>
                                <strong>bold, </strong>
                                <em><strong>bold and italicized</strong></em>
                                <p>family:Roboto, size:18px, weight:400, 400, 600, 600</p>
                            </div>
                        </div>
                        <div>
                            <p>Roboto-Slab font family is used soley for lyrics.</p>
                            <div>
                                <h1>h1 and style1</h1>
                                <p>family:Roboto-Slab, size:3.25rem, weight:600</p>
                            </div>
                            <div>
                                <h2>h2 and style2</h2>
                                <p>family:Roboto-Slab, size:2.75rem, weight:600</p>
                            </div>
                            <div>
                                <h3>h3 and style3</h3>
                                <p>family:Roboto-Slab, size:2.00rem, weight:600</p>
                            </div>
                            <div>
                                <h4>h4 and style4</h4>
                                <p>family:Roboto-Slab, size:1.25rem, weight:600</p>
                            </div>
                            <div>
                                <h5>h5 and style5</h5>
                                <p>family:Roboto-Slab, size:1.00rem, weight:600</p>
                            </div>
                            <div>
                                <span>default, </span>
                                <em>italicized, </em>
                                <strong>bold, </strong>
                                <em><strong>bold and italicized</strong></em>
                                <p>family:Roboto-Slab, size:18px, weight:400, 400, 600, 600</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Color Palette</h2>
                </section>
                <section className="buttons-and-links">
                    <h2>Buttons and Links</h2>
                    <Button shape="pill" color="fill" label="pill fill" />
                    <Button shape="pill" color="nofill" label="pill nofill" />
                    <Button shape="round" color="fill" label="round fill" />
                    <Button shape="round" color="nofill" label="round nofill" />
                </section>
                <section className="cards-and-slots">
                    <h2>Cards and Slots</h2>
                </section>
            </main>
        )
    }
}

export default Styleguide;