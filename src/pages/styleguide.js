import React, { Component } from 'react';
// import { Navbar, CompactNavbar, Menubar, Footer } from '../components/Navigation';
// import { Searchbar, Suggestbox } from '../components/Search';
import { Queue, Search } from '../components/Nodes';
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
                <section className="clicks">
                    <h2>Buttons and Links</h2>
                    <div>
                        <Button shape="pill" color="fill" label="pill fill" />
                        <Button shape="pill" color="nofill" label="pill nofill" />
                        <Button shape="round" color="fill" label="round fill" />
                        <Button shape="round" color="nofill" label="round nofill" />
                        <Button shape="box" color="fill" label="round fill" />
                        <Button shape="box" color="nofill" label="round nofill" />
                    </div>
                    <div>
                        <Intext href="/styleguide" label="internal" />
                        <Intext href="https://www.instagram.com/byjackli" label="external" />
                        <Intext flat={true} href="/styleguide" label="flat regular" />
                        <Intext flat={true} invert={true} href="https://www.instagram.com/byjackli" label="flat invert" />
                    </div>
                </section>
                <section className="cards-and-slots">
                    <h2>Queue Components</h2>
                    <div>
                        <Queue id="001" song="IIIIIIIIIIII" artist="WWWWWWWWWWWWWWWWWWW" image="https://i.scdn.co/image/ab67616d00001e0220e08c8cc23f404d723b5647" alt="Next Album Cover" />
                        <Queue id="002" song="ROCKSTAR (feat. Roddy Ricch)" artist="DaBaby, Roddy Ricch" image="https://i.scdn.co/image/ab67616d00001e0220e08c8cc23f404d723b5647" alt="Next Album Cover" />
                        <Queue add={true} />
                    </div>
                    <div>
                        <Search page="homepage" placeholder="Search a song"/>
                    </div>
                </section>
            </main>
        )
    }
}

export default Styleguide;