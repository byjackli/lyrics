import React, { Component } from 'react';
import { CompactNavbar, Menubar, Footer } from '../components/Navigation';
import { Queue, Search } from '../components/Nodes';
import { Button, Intext } from '../components/Clicks';
import logo from '../images/logo192.png'


class Styleguide extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        sessionStorage.setItem("authSpotify", "BQB5LXCgGWk13A6tBnBUs_-0kID7FL6bdObIGYOIhyHbqdmpvhYK43v0b8SsnG04dtR3NGMy_QvT0RnDTLdTkSMrPgSNXNJV8xLeQcuSzwV99VaqFHrwIM-qTuB4xILLIi9xnkCodWzOdImzGDxvt4uhczfrIEsmS6jYmUoQt1qDRcinuoNKN4iIJR9AT2_4bmTJuOO0lSMEJeymGLaPbDg11c52q-vwel21axmA7uNSQvjV8yicvoPQtRw89hCv-VEJX31tgzikxl8");
        sessionStorage.setItem("authGenius", "rqwX5_DkX-k75Z_0PCaoxvRLqlSaOTXSVbOCVMvT2Xp4TAR2gUR1WaBjumD5K1oF");
    }
    render() {
        return (
            <main className="styleguide">
                <button aria-label="back button" className="back-button style4 vrtCC" onClick={()=>{window.location.href = "/"}}><img src={logo} alt="rhino logo, click to go back" /> BACK </button>
                <h1>Styleguide</h1>
                <section className="navigation">
                    <h2>Navigation</h2>
                    <p>This application serves best without a navigation menu because the important song and lyric features are built into the page.
                    All settings are easily accessible by scrolling down. However, there is a compact infobar and side-menu that encourages the
                    user to explore other projects, and a logout button to log out of the application.
                    </p>
                    <p>The compact infobar is present in most project pages. The side-menu and footer is consistent between all other projects.</p>
                    <CompactNavbar />
                    <Menubar />
                    <Footer />
                </section>
                <section className="typography">
                    <h2>Typography</h2>
                    <p>A way to differentiate the main content, the lyrics, from everything else.</p>
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
                    <p>The color combined with the logo is a subtle nod to <Intext href="https://www.worldwildlife.org/species/black-rhino" label="World Wild Life's" /> ranking of the Black Rhino species endangerment.
                    Black Rhino's are considered Critically Endangered with a miniscule population of 5,455. Despite the trade ban of rhino horn, there is a consistent rise of demand.</p>
                    <div>
                        <div className="colorbox" style={{ backgroundColor: "var(--BrandL)" }}></div>
                        <p>var(--BrandL)</p>
                        <p>Brand identity color suitable for background, header text, and error messages.</p>
                    </div>
                    <div>
                        <div className="colorbox" style={{ backgroundColor: "var(--BrandS)" }}></div>
                        <p>var(--BrandS)</p>
                        <p>Suitable for in-text link decoration and inactive input fields.</p>
                    </div>
                    <div>
                        <div className="colorbox" style={{ backgroundColor: "var(--DarkL)" }}></div>
                        <p>var(--DarkL)</p>
                        <p>Suitable for any text and backgrounds. This is the default 'dark-mode'.</p>
                    </div>
                    <div>
                        <div className="colorbox" style={{ backgroundColor: "var(--DarkM)" }}></div>
                        <p>var(--DarkM)</p>
                        <p>Suitable for overalys, tagged texts, drop shadows, help messages, and error messages.</p>
                    </div>
                    <div>
                        <div className="colorbox" style={{ backgroundColor: "var(--DarkS)" }}></div>
                        <p>var(--DarkS)</p>
                        <p>Suitable for card and block drop shadows.</p>
                    </div>
                    <div>
                        <div className="colorbox" style={{ backgroundColor: "var(--LightL)" }}></div>
                        <p>var(--LightL)</p>
                        <p>Suitable for any text and backgrounds. This is the default 'light-mode' color.</p>
                    </div>
                    <div>
                        <div className="colorbox" style={{ backgroundColor: "var(--LightM)" }}></div>
                        <p>var(--LightM)</p>
                        <p>Suitable for card and block backgrounds.</p>
                    </div>
                    <div>
                        <div className="colorbox" style={{ backgroundColor: "var(--LightS)" }}></div>
                        <p>var(--LightS)</p>
                        <p>Suitable for overlays.</p>
                    </div>
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
                <section className="queue-components">
                    <h2>Queue Components</h2>
                    <p>The queue panel is where the bulk of user interaction occurs. This means the components need to work on a desktop and mobile environment.
                    All animation speeds are brief in order to convey a snappy and fast, yet fluid design.
                    </p>
                    <p>Queue cards are designed so that if the text falls off the edge, the code will convey the concept of more/missing content.
                    Upon hovering the card, the text will engage a fluid animation that allows you to see all the text.
                    </p>
                    <div>
                        <Queue id="001" song="IIIIIIIIIIII" artist={["WWWWWWWWWWWWWWWWWWW"]} image="https://i.scdn.co/image/ab67616d00001e0220e08c8cc23f404d723b5647" alt="Next Album Cover" />
                        <Queue id="002" song="ROCKSTAR (feat. Roddy Ricch)" artist={["DaBaby", "Roddy Ricch"]} image="https://i.scdn.co/image/ab67616d00001e0220e08c8cc23f404d723b5647" alt="Next Album Cover" />
                        <Queue add={true} />
                    </div>
                    <div>
                        <Search page="homepage" size="large" placeholder="Search a song" />
                    </div>
                    <div>
                        <ol class="search-res" id="search-homepage-results"><li><p><span class="style4">Life is a Highway</span><span> - Rascal Flatts, </span></p></li><li><p><span class="style4">Life Is A Highway</span><span> - Tom Cochrane, </span></p></li><li><p><span class="style4">Life is a Highway - From "Cars"</span><span> - Rascal Flatts, </span></p></li><li><p><span class="style4">Life Is A Highway - Remastered Version</span><span> - Rascal Flatts, </span></p></li><li><p><span class="style4">Life is a Highway - From "Cars"/Soundtrack Version</span><span> - Rascal Flatts, </span></p></li></ol>
                    </div>
                    <div className="panel-states hrzTL">
                        <div class="panel hrzTL panel-true">
                            <div class="panel-state dragoff vrtCC">
                                <div>» HIDE »</div>
                            </div>
                            <div class="panel-controls vrtTL">
                                <div class="panel-search hrzCR">
                                    <div class="style4 dragoff">SEARCH</div>
                                    <i class="vrtCC fas fa-search"></i>
                                </div>
                                <div class="panel-queue vrtTL dragoff">
                                    <h2>Your Queue</h2>
                                    <div class="vrtTC queue-list">
                                        <div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e02806c160566580d6335d1f16c" alt="changes Cover Art" /></div><div class="vrtCL" id="card7AFASza1mXqntmGtbxXprO"><div class="scroller"><p class="style4" id="song7AFASza1mXqntmGtbxXprO">changes</p></div><div class="scroller"><p id="artist7AFASza1mXqntmGtbxXprO">XXXTENTACION</p></div></div></div></div><div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e02da6f73a25f4c79d0e6b4a8bd" alt="Natural Cover Art" /></div><div class="vrtCL" id="card2FY7b99s15jUprqC0M5NCT"><div class="scroller"><p class="style4" id="song2FY7b99s15jUprqC0M5NCT">Natural</p></div><div class="scroller"><p id="artist2FY7b99s15jUprqC0M5NCT">Imagine Dragons</p></div></div></div></div><div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e0260624c0781fd787c9aa4699c" alt="Better Cover Art" /></div><div class="vrtCL" id="card6zeeWid2sgw4lap2jV61PZ"><div class="scroller"><p class="style4" id="song6zeeWid2sgw4lap2jV61PZ">Better</p></div><div class="scroller"><p id="artist6zeeWid2sgw4lap2jV61PZ">Khalid</p></div></div></div></div><div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e026818aa231aa543cf87e1374a" alt="What If I Go? (feat. Bonzai) Cover Art" /></div><div class="vrtCL" id="card2tHfNQnj50VoMZga2rpfdA"><div class="scroller an-scroll"><div class="scroller-fg"></div><p class="style4">What If I Go? (feat. Bonzai) What If I Go? (feat. Bonzai)</p></div><div class="scroller"><p id="artist2tHfNQnj50VoMZga2rpfdA">Mura Masa, Bonzai</p></div></div></div></div><div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e02b5f0a8d46cef9647548c64dc" alt="WHATS POPPIN (feat. DaBaby, Tory Lanez &amp; Lil Wayne) - Remix Cover Art" /></div><div class="vrtCL" id="card2MbdDtCv5LUVjYy9RuGTgC"><div class="scroller an-scroll"><div class="scroller-fg"></div><p class="style4">WHATS POPPIN (feat. DaBaby, Tory Lanez &amp; Lil Wayne) - Remix WHATS POPPIN (feat. DaBaby, Tory Lanez &amp; Lil Wayne) - Remix</p></div><div class="scroller an-scroll"><div class="scroller-fg"></div><p>Jack Harlow, Tory Lanez, DaBaby, Lil Wayne Jack Harlow, Tory Lanez, DaBaby, Lil Wayne</p></div></div></div></div></div>
                                </div>
                            </div>
                        </div>
                        <div class="panel hrzTL panel-true">
                            <div class="panel-state dragoff vrtCC">
                                <div>» HIDE »</div>
                            </div>
                            <div class="panel-controls vrtTL">
                                <div class="panel-search hrzCR"><div class="search-container"><input class="search-small" type="search" id="search-queue" page="queue" placeholder="Search a song" /><ol class="search-res" id="search-queue-results"><li><p><span class="style4">Touch</span><span> - Sleeping At Last, </span></p></li><li><p><span class="style4">Already Gone</span><span> - Sleeping At Last, </span></p></li><li><p><span class="style4">Two</span><span> - Sleeping At Last, </span></p></li><li><p><span class="style4">Turning Page</span><span> - Sleeping At Last, </span></p></li><li><p><span class="style4">Saturn</span><span> - Sleeping At Last, </span></p></li></ol></div>
                                    <i class="vrtCC fas fa-times"></i>
                                </div>
                                <div class="panel-queue vrtTL dragoff">
                                    <h2>Your Queue</h2>
                                    <div class="vrtTC queue-list">
                                        <div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e02806c160566580d6335d1f16c" alt="changes Cover Art" /></div><div class="vrtCL" id="card7AFASza1mXqntmGtbxXprO"><div class="scroller"><p class="style4" id="song7AFASza1mXqntmGtbxXprO">changes</p></div><div class="scroller"><p id="artist7AFASza1mXqntmGtbxXprO">XXXTENTACION</p></div></div></div></div><div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e02da6f73a25f4c79d0e6b4a8bd" alt="Natural Cover Art" /></div><div class="vrtCL" id="card2FY7b99s15jUprqC0M5NCT"><div class="scroller"><p class="style4" id="song2FY7b99s15jUprqC0M5NCT">Natural</p></div><div class="scroller"><p id="artist2FY7b99s15jUprqC0M5NCT">Imagine Dragons</p></div></div></div></div><div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e0260624c0781fd787c9aa4699c" alt="Better Cover Art" /></div><div class="vrtCL" id="card6zeeWid2sgw4lap2jV61PZ"><div class="scroller"><p class="style4" id="song6zeeWid2sgw4lap2jV61PZ">Better</p></div><div class="scroller"><p id="artist6zeeWid2sgw4lap2jV61PZ">Khalid</p></div></div></div></div><div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e026818aa231aa543cf87e1374a" alt="What If I Go? (feat. Bonzai) Cover Art" /></div><div class="vrtCL" id="card2tHfNQnj50VoMZga2rpfdA"><div class="scroller an-scroll"><div class="scroller-fg"></div><p class="style4">What If I Go? (feat. Bonzai) What If I Go? (feat. Bonzai)</p></div><div class="scroller"><p id="artist2tHfNQnj50VoMZga2rpfdA">Mura Masa, Bonzai</p></div></div></div></div><div class="queue-card-container"><div class="queue-settings vrtCC"><i class="vrtCC fas fa-play"></i><i class="vrtCC fas fa-times"></i></div><div class="queue-card hrzTL"><div><img src="https://i.scdn.co/image/ab67616d00001e02b5f0a8d46cef9647548c64dc" alt="WHATS POPPIN (feat. DaBaby, Tory Lanez &amp; Lil Wayne) - Remix Cover Art" /></div><div class="vrtCL" id="card2MbdDtCv5LUVjYy9RuGTgC"><div class="scroller an-scroll"><div class="scroller-fg"></div><p class="style4">WHATS POPPIN (feat. DaBaby, Tory Lanez &amp; Lil Wayne) - Remix WHATS POPPIN (feat. DaBaby, Tory Lanez &amp; Lil Wayne) - Remix</p></div><div class="scroller an-scroll"><div class="scroller-fg"></div><p>Jack Harlow, Tory Lanez, DaBaby, Lil Wayne Jack Harlow, Tory Lanez, DaBaby, Lil Wayne</p></div></div></div></div></div>
                                </div>
                            </div>
                        </div>
                        <div class="panel hrzTL panel-false" style={{ position: "absolute", margin: "0 -50px !important" }}>
                            <div class="panel-state dragoff vrtCC">
                                <div>« SHOW «</div>
                            </div>
                            <div class="panel-controls vrtTL">
                                <div class="panel-search hrzCR">
                                    <div class="style4 dragoff">SEARCH</div>
                                    <i class="vrtCC fas fa-search"></i>
                                </div>
                                <div class="panel-queue vrtTL dragoff">
                                    <h2>Your Queue</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
        )
    }
}

export default Styleguide;