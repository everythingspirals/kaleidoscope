import React from 'react';
import {connect} from 'react-redux';

import {Guide} from 'lib/guide/index.js';
import Nav from 'common/nav/nav.jsx';
import {Grid,GridNode} from 'lib/grid';
import ShowPreview from 'common/show-preview/show-preview.jsx';
import style from './details.css';


const Details = React.createClass({
  getInitialState(){
    return {
      show : {},
      navItems: [
        {
          "name" : "Back",
          "href" : "javascript:window.history.back()"
        },
        {
          "name" : "Play",
          "href" : "javascript:(alert('playing'))"
        }
      ]
    }
  },

  componentDidMount() {
    this.getShow();
  },

  getShow() {
    let guide = new Guide();
    guide.init().then(()=>{
      this.setState({
        show: guide.getShow(this.props.params.id)
      });
    })
  },

  render() {
    let show = this.state.show,
        cast = show.Actors ? show.Actors.split(",") : null;

      return (
        <div className="details">

          <div className="details-column details-column-left">
            <div className="details-preview">
              <ShowPreview id={show.id} src={show.Preview}/>
            </div>
          </div>

          <div className="details-column details-column-right">

            <div className="details-titlebar">
              <div className="details-channel">
                <img src={show.ChannelLogo}/>
              </div>
              <div className="details-title">
                  {show.Title}
              </div>
            </div>

            <div className="details-info">
                <div>
                  <legend>Plot</legend>
                  {show.Plot}
                </div>
                <br/>

                <div>
                  <legend>Cast</legend>
                  {cast}
                </div>
                <br/>

                <div>
                  <b>Runtime:</b> {show.Runtime}
                </div>
                <br/>

                <div>
                  <b>Rated:</b> {show.Rated}
                </div>
                <br/>

                <div>
                  <b>IMDB Rating:</b> {show.imdbRating}
                </div>
              </div>
          </div>
          <Nav gridId="details-nav" navItems={this.state.navItems}/>
      </div>
      )
    }
});

const stateToProps = (state)=>{
  return {
    guide : state.guide.guide
  }
}

export default connect(stateToProps)(Details);
