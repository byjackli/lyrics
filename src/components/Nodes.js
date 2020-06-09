import React, { Component } from 'react';
// import { CLIENT_ID, CLIENT_SECRET } from "../config/spotify.js";

// Queue element, use when neccessary
export class Queue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songWidth: 0,
            artistWidth: 0,
        }
    }

    componentDidMount() {
        if (!this.props.add) {
            this.setState({
                songWidth: document.getElementById(`song${this.props.id}`).clientWidth,
                artistWidth: document.getElementById(`artist${this.props.id}`).clientWidth,
            })
        }
    }

    toggleAdd() {
    }

    render() {

        if (this.props.add) {
            return (
                <div className="queue-add vrtCC" onClick={this.toggleAdd.bind(this)}>
                    <div className="vrtCC">
                        <p>+ Add to Queue</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="queue-card-container">
                <div className="queue-settings vrtCC">
                    <i className="vrtCC fas fa-play"></i>
                    <i className="vrtCC fas fa-times"></i>
                </div>
                <div className="queue-card hrzTL" {...this.props.rest}>
                    <div>
                        <img src={this.props.image} alt={this.props.alt} />
                    </div>
                    <div className="vrtCL">
                        {198 < this.state.songWidth ?
                            <div className="scroller an-scroll">
                                <div className="scroller-fg"></div>
                                <p className="style4">{this.props.song} {this.props.song}</p>
                            </div> :
                            <div className="scroller">
                                <p className="style4" id={`song${this.props.id}`}>{this.props.song}</p>
                            </div>
                        }
                        {console.log()}
                        {198 < this.state.artistWidth ?
                            <div className="scroller an-scroll">
                                <div className="scroller-fg"></div>
                                <p>{this.props.artist} {this.props.artist}</p>
                            </div> :
                            <div className="scroller">
                                <p id={`artist${this.props.id}`}>{this.props.artist}</p>
                            </div>
                        }
                    </div>
                </div >
            </div>
        )
    }
}

export class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oAuth: "BQAmMWXDlZTZkgNlG9vt1hG7uiw-uVSFVuAYuno4D-9fSrTBsOcKD3crhyrgWfreNI8zeDp6Gcy-I4w_Om5--2QHRyccwoFMLgpJk4WbKKLxkXJsL3O2Yu6LwWyOKEoX0vRUC6MdBy5l_5yuLw0PnlWqELtXXdfLhBAEYg7dx6jC6plijpADg9LLx56DrBoUlnS_c2oYMEFbjaVW31rTnHiG4mFodV9Y9AIiTqGRBE7ZOm43u6MuV8oPtiWmn49mztgbqATxhtGmZfc",
            autocomplete: true,
            searchbar: null,
            results: [],
        }
    }

    followUp(data, event) {

        fetch("https://api.spotify.com/v1/me/player/play", {
            body: JSON.stringify({
                position_ms: 0,
                uris: data
            }),
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${this.state.oAuth}`,
                "Content-Type": "application/json"
            },
            method: "PUT"
        })
    }

    searchHandler(event) {
        console.info(event.target.id);
        console.info(event.type);
        let limit = 5, searchbar = event.target.id;

        if (event.target.value === "") { this.setState({ results: null }) }

        // final search result "entered", show 10 results
        if (event.key === 'Enter') { limit = 10 };

        // live search results "autocomplete", show 5 results
        if (event.key === 'Enter' || this.state.autocomplete) {
            console.log('key pushed');
            fetch(`https://api.spotify.com/v1/search?q=${event.target.value}&type=track&limit=${limit}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${this.state.oAuth}`,
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(result => {
                    console.log("raw results");
                    console.info(result);
                    if (result.tracks) {
                        this.setState({
                            results: result.tracks.items,
                            searchbar: searchbar
                        });
                    };
                });
        }

        console.info(document.getElementById(event.target.id).value)
        console.log(`Everything in input: ${event.target.value}`)
    }

    renderSearchResults() {
        if (this.state.results) {
            let i = 0;
            return (
                <ol className="search-res" id={`${this.state.searchbar}-results`}>
                    {
                        this.state.results.map(track => (
                            // render each track -- each track should also have a 
                            //     - fetch function to Genius' API for the lyrics 
                            //     - fetch function to Spotify to play song, add to queue, or log in with spotify
                            <li key={i += 1} onClick={this.followUp.bind(this, [track.uri])}>
                                <p>
                                    <span className="style4" >
                                        {track.name}
                                    </span>
                                    <span> - {track.artists ?
                                        track.artists.map(artist => (
                                            `${artist.name}, `
                                        )) : null
                                    }</span>
                                </p>
                            </li>
                        ))
                    }

                </ol>
            )
        }
        return null;
    }

    render() {

        return (
            <div className="search-container">
                <input type="search" id={`search-${this.props.page}`} {...this.props} onKeyDown={this.searchHandler.bind(this)} onPaste={this.searchHandler.bind(this)} />
                {this.renderSearchResults()}
            </div>
        )
        // return (
        //     <>{this.state.autocomplete ?
        //         <input type="search" {...this.props} onChange={this.searchHandler.bind(this)} /> :
        //         <input type="search" {...this.props} onKeyDown={this.searchHandler.bind(this)} />
        //     }</>
        // )
    }
}