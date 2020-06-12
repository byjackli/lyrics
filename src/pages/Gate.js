import React, { Component } from 'react';
// import { Searchbar } from './Search';
// import { PillFill, Intext } from './Clicks';

class Gate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
    }

    render(){
        return(
            <main className="gate">
                <section>
                    {/* <Searchbar /> */}
                    <h1>LYRICS</h1>
                    {/* <PillFill label="SIGN UP" OnClick={this.toggleSignup.bind(this)} /> */}
                    {/* <Intext label="LOG IN" OnClick={this.toggleLogin.bind(this)} />*/}
                </section>
                <section>

                </section>
            </main>
        )
    }
}

export default Gate;