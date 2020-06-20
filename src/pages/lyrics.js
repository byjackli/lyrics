import React from 'react';
import { Panel } from '../components/Nodes';
import { Button } from '../components/Clicks';
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } from '../config/spotify';
import { GENIUS_CLIENT_ID, GENIUS_REDIRECT_URI } from '../config/genius';

class Lyrics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,

            title: "loading ..",
            artist: "loading ..",
            lyrics: "loading ..",

            devices: [],
        }
    }

    componentDidMount() {
        this.getDevices();
        this.getSize();
        window.addEventListener("resize", this.getSize.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("resize");
    }

    getSize() {
        this.setState({ width: window.innerWidth })
    }
    getDevices() {
        fetch("https://api.spotify.com/v1/me/player/devices", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.devices) {
                    this.setState({ devices: result.devices });
                }
            })
    }
    renderDevices() {
        let arr = [];
        this.state.devices.forEach(device => {
            arr.push(
                <div className={`device device-${device.is_active}`}>
                    <p className="style5">{device.name} {device.is_private_session ? <i className="fas fa-user-secret"></i> : <i className="fas fa-user"></i>}</p>
                    <p>{device.type}</p>
                    <p>Volume: {device.volume_percent}</p>
                </div>
            )
        })
        return arr;
    }
    renderHeader() {
        return (<>
            <svg className="player-divider">
                <path d={`M0,0 L${this.state.width},0 C${this.state.width},0 100,100 0,300`} />
            </svg>
            <svg className="header">
                <path id="curve" d={`M0,300 C0,300 100,100 ${this.state.width},0`} />
                <text x="50">
                    <textPath className="style1" xlinkHref="#curve">
                        ACCOUNT AND SETTINGS
                    </textPath>
                </text >
            </svg>

        </>)
    }

    updateTitle(data, event) { this.setState({ title: data }); }
    updateArtist(data, event) { this.setState({ artist: data }); }
    updateLyrics(data, event) { this.setState({ lyrics: data }); }

    render() {
        return (
            <main className="lyrics">
                <section className="lyrics-section vrtTC">
                    <div className="lyrics-controls">
                        <div className="device-list hrzTL">
                            {this.renderDevices()}
                        </div>
                    </div>
                    <div className="lyrics-data">
                        <h1>{this.state.title}</h1>
                        <h2 className="style4">{this.state.artist}</h2>
                        <p className="content">
                            {this.state.lyrics}
                        </p>
                    </div>
                    <Panel updatetitle={this.updateTitle.bind(this)} updateartist={this.updateArtist.bind(this)} updatelyrics={this.updateLyrics.bind(this)} />
                </section>
                <section className="settings">
                    {this.renderHeader()}
                    <div className="vrtTL">
                        <div>
                            <h3>Account</h3>
                            <Button shape="pill" color="fill" label="change username"
                            />
                            <Button shape="pill" color="fill" label="change profile image"
                            />
                            <Button shape="pill" color="fill" label="delete account"
                            />
                        </div>
                        <div>
                            <h3>Controls</h3>
                            <Button shape="pill" color="fill" label="media player"
                            />
                            <Button shape="pill" color="fill" label="queue panel"
                            />
                            <Button shape="pill" color="fill" label="default device"
                            />
                        </div>
                        <div>
                            <h3>Spotify Settings</h3>
                            <Button shape="pill" color="fill" label="re-authenticate"
                                href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}${SPOTIFY_SCOPES ? `&scope=${encodeURIComponent(SPOTIFY_SCOPES)}` : ''}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`}
                            />

                            <Button shape="pill" color="fill" label="re-build queue"
                            />
                            <Button shape="pill" color="fill" label="disconnect"
                            />
                        </div>

                        {/* <Button shape="pill" color="fill" label="Genius"
                            href={`https://api.genius.com/oauth/authorize?response_type=code&client_id=${GENIUS_CLIENT_ID}&redirect_uri=${encodeURIComponent(GENIUS_REDIRECT_URI)}`}
                        /> */}
                    </div>
                </section>
            </main>
        )
    }
}

export default Lyrics;