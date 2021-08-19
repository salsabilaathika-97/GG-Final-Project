import { Component } from "react";

export default class Song extends Component {
  render() {
    return (
      <div className="list-playlist">
        <div className="container-grid-list">
          <div className="grid-list-img">
            <img
              style={{width: 150, height: 150, display: "inline-block"}}
              src={this.props.imageUrl}
              alt={`Album for track ${this.props.title}`}
            />
          </div>
          <div className="grid-list-desc">
            <div style={{fontSize: 16, fontWeight: "bolder"}} >Title</div>
            <div style={{fontSize: 18}}>{this.props.title}</div>
            <div style={{fontSize: 16, fontWeight: "bolder"}}>Album Name</div>
            <div style={{fontSize: 18}}>{this.props.albumName}</div>
            <div style={{fontSize: 16, fontWeight: "bolder"}}>Artist Name</div>
            <div style={{fontSize: 18}}>{this.props.artistName}</div>
          </div>
        </div>
      </div>
    );
  }
}
