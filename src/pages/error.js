import React, { Component } from 'react';

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errormsg: "Page not Found! ",
            errorhelp: "Maybe there was a typo?"
        }
    }
    componentDidMount() {
        window.addEventListener("offline", this.renderOffline.bind(this));
    };
    componentWillUnmount() {
        window.removeEventListener("offline", this.renderOffline.bind(this));
    };


    renderOffline() { this.setState({
        errormsg: "Cannot Connect! ",
        errorhelp: "Are you connected to the internet?"
    }) }
    render() {
        console.log("address", window.location.pathname);
        return (
            <main className="error">
                <section className="vrtCC">
                    <div className="vrtTL">
                        <h1 className="style-mega">Error</h1>
                        <p className="style3">{this.state.errormsg}<span style={{ fontSize: "inherit" }}>{this.state.errorhelp}</span></p>
                    </div>
                </section>
            </main>
        );
    };
}

export default Error;