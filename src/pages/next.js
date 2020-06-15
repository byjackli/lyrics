import React from 'react';
// import { Search } from '../components/Nodes';
// import { Intext } from '../components/Clicks';
// import firebase from '../config/firebase';

class Next extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPage: ["profile", "spotify", "genius"],
            curPage: "profile"
        }
    }

    // navigate between pages
    changePage(data, event) {
        let index = this.state.allPage.indexOf(this.state.curPage);

        if (data === 0 && 0 < index - 1) {
            this.setState({ curPage: this.state.allPage[index - 1] });
        }
        else if (data === 1 && index + 1 < this.state.allPage.length) {
            this.setState({ curPage: this.state.allPage[index + 1] });
        }
    }

    // render basic profile page
    renderProfile() {
        return (
            <>
            <input placeholder="Display Name"/>
            </>
        )
    }
    // render spotify page
    renderSpotify() {
        return (
            <>
            </>
        )
    }
    // render genius page
    renderGenius() {
        return (
            <>
            </>
        )
    }

    // page render manager
    renderHandler() {
        if (this.state.page === "profile") { this.renderProfile.bind(this); }
        else if (this.state.page === "spotify") { this.renderSpotify.bind(this); }
        else if (this.state.page === "genius") { this.renderGenius.bind(this); }
    }

    render() {
        return (
            <main className="next">
                <section className={this.state.curPage}>
                    <h1>{this.state.curPage}</h1>
                    {this.renderHandler()}
                </section>
            </main>
        )
    }
}

export default Next;