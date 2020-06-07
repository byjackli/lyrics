import React, { Component } from 'react';


// Card element, use when neccessary
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
                    <i class="vrtCC fas fa-play"></i>
                    <i class="vrtCC fas fa-times"></i>
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
