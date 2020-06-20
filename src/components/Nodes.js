import React, { Component } from 'react';
// import { CLIENT_ID, CLIENT_SECRET } from "../config/spotify.js";

// Queue element, use when neccessary
export class Queue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songWidth: 0,
            artistWidth: 0
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

    play(data, event) {

        fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT",
            body: JSON.stringify({
                position_ms: 0,
                offset: { position: data[0][0] },
                context_uri: `spotify:playlist:${localStorage.getItem("queueID")}`
            }),
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
                "Content-Type": "application/json"
            }
        })
        let
            song = data[1].split("(")[0],
            artist = data[2].split(",")[0];

        this.props.titleupdater(data[1]);
        this.props.artistupdater(data[2]);

        fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(result => {
                console.log("raw results");
                console.info(result.lyrics);
                this.props.lyricupdater(result.lyrics)
                // if (result.tracks) {
                //     this.setState({
                //     });
                // };
            });
    }

    remove(data, event) {
        console.info(data);
        fetch(`https://api.spotify.com/v1/playlists/${localStorage.getItem("queueID")}/tracks`, {
            method: "DELETE",
            body: JSON.stringify({
                tracks: [{
                    uri: data[0],
                    positions: data[1]
                }]
            }),
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                this.props.updatequeue();
            })
    }

    render() {

        if (this.props.add) {
            return (
                <div className="queue-card-container" >
                    <div className="queue-add vrtCC" onClick={this.props.onClick}>
                        <div className="vrtCC">
                            <p>+ Add to Queue</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="queue-card-container">
                <div className="queue-settings vrtCC">
                    <i className="vrtCC fas fa-play" onClick={this.play.bind(this, [[this.props.position], this.props.song, this.props.artist])}></i>
                    <i className="vrtCC fas fa-times" onClick={this.remove.bind(this, [this.props.uri, [this.props.position]])}></i>
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
            authSpotify: sessionStorage.getItem("authSpotify"),
            autocomplete: true,
            searchbar: null,
            results: [],
        }
    }

    add(data, event) {
        fetch(`https://api.spotify.com/v1/playlists/${localStorage.getItem("queueID")}/tracks?uris=${encodeURIComponent(data)}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
                "Content-Type": "application/json"
            }
        }).then(() => {
            this.props.togglesearch();
        })
    }

    searchHandler(event, data) {
        console.info(event.target.id);
        console.info(event.type);
        let limit = 5, searchbar = event.target.id;

        if (data === "clear") { this.setState({ results: null }) }

        // final search result "entered", show 10 results
        if (event.key === 'Enter') { limit = 10 };

        // live search results "autocomplete", show 5 results
        if (event.key === 'Enter' || this.state.autocomplete) {
            console.log('key pushed');
            fetch(`https://api.spotify.com/v1/search?q=${event.target.value}&type=track&limit=${limit}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
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
                            <li key={i += 1} onClick={this.add.bind(this, [track.uri])}>
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
                <input className={`search-${this.props.size}`} type="search" id={`search-${this.props.page}`} onKeyDown={this.searchHandler.bind(this)} onPaste={this.searchHandler.bind(this)} {...this.props} />
                {this.renderSearchResults()}
            </div>
        )
    }
}

export class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            panel: false,
            searchbar: false,
            queue: [],
        }
    }

    componentDidMount() {
        // fetch queue from spotify
    }

    toggleSearch() {
        this.getQueue();
        this.setState({ searchbar: !this.state.searchbar });
    }
    togglePanel() {
        this.getQueue();
        this.setState({ panel: !this.state.panel });
    }

    getQueue() {
        fetch(`https://api.spotify.com/v1/playlists/${localStorage.getItem("queueID")}/tracks`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log("raw results");
                console.info(result);
                if (result && result.items) {
                    this.setState({
                        queue: result.items
                    });
                    console.log("getQueue was called")
                };
            });
    }

    getArtist(data) {
        let str = "";
        for (let i = 0; i < data.length; ++i) {
            if (i === data.length - 1) { str += data[i].name }
            else { str += `${data[i].name}, `; }
        }
        return str;
    }

    renderQueue() {
        if (this.state.queue) {

            let arr = [], i = 0;
            this.state.queue.forEach(track => {
                arr.push(
                    <Queue
                        key={track.track.id}
                        id={track.track.id}
                        song={track.track.name}
                        artist={this.getArtist(track.track.artists)}
                        image={track.track.album.images[1].url}
                        alt={`${track.track.name} Cover Art`}
                        uri={track.track.uri}
                        position={i++}
                        updatequeue={this.getQueue.bind(this)}
                        titleupdater={this.props.updatetitle}
                        artistupdater={this.props.updateartist}
                        lyricupdater={this.props.updatelyrics}
                    />
                )
            })
            console.log("render queue was called, render is successful")

            return (
                <div className="vrtTC queue-list">
                    {arr}
                </div>
            )
        }
        console.log("render queue was called, but failed to render")
    }

    render() {
        return (
            <div className={`panel hrzTL panel-${this.state.panel}`}>
                <div className="panel-state dragoff vrtCC" onClick={this.togglePanel.bind(this)}>
                    {this.state.panel ?
                        <div>» HIDE »</div> :
                        <div>« SHOW «</div>
                    }
                </div>
                <div className="panel-controls vrtTL">
                    <div className="panel-search hrzCR">
                        {this.state.searchbar ?
                            <>
                                <Search page="queue" size="small" placeholder="Search a song" togglesearch={this.toggleSearch.bind(this)} />
                                <i className="vrtCC fas fa-times" onClick={this.toggleSearch.bind(this)}></i>
                            </> :
                            <>
                                <div className="style4 dragoff">SEARCH</div>
                                <i className="vrtCC fas fa-search" onClick={this.toggleSearch.bind(this)}></i>
                            </>
                        }
                    </div>
                    <div className="panel-queue vrtTL dragoff">
                        <h2>Your Queue</h2>
                        {this.renderQueue()}
                    </div>
                </div>
            </div>
        )
    }
}