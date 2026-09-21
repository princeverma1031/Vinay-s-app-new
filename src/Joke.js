import React, { Component } from 'react';
import './Joke.css';
import laughingTears from './emojis/laughing-tears.svg';
import laughing from './emojis/laughing.svg';
import smiley from './emojis/smiley.svg';
import slightSmile from './emojis/slight-smile.svg';
import neutral from './emojis/neutral.svg';
import confused from './emojis/confused.svg';
import angry from './emojis/angry.svg';

export default class Joke extends Component {
    getColor() {
        if (this.props.votes >= 15) {
          return "#4CAF50";
        } else if (this.props.votes >= 12) {
          return "#8BC34A";
        } else if (this.props.votes >= 9) {
          return "#CDDC39";
        } else if (this.props.votes >= 6) {
          return "#FFEB3B";
        } else if (this.props.votes >= 3) {
          return "#FFC107";
        } else if (this.props.votes >= 0) {
          return "#FF9800";
        } else {
          return "#f44336";
        }
      }
      getEmoji() {
        if (this.props.votes >= 15) {
          return { src: laughingTears, alt: "Laughing with tears" };
        } else if (this.props.votes >= 12) {
          return { src: laughing, alt: "Laughing" };
        } else if (this.props.votes >= 9) {
          return { src: smiley, alt: "Big smile" };
        } else if (this.props.votes >= 6) {
          return { src: slightSmile, alt: "Slight smile" };
        } else if (this.props.votes >= 3) {
          return { src: neutral, alt: "Neutral face" };
        } else if (this.props.votes >= 0) {
          return { src: confused, alt: "Confused face" };
        } else {
          return { src: angry, alt: "Angry face" };
        }
      }
    render() {
        const emoji = this.getEmoji();
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={this.props.upVote}></i>
                    <span className="Joke-votes" style={{borderColor: this.getColor()}}>{this.props.votes}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downVote}></i>
                </div>
                <div className="Joke-text">{this.props.text}</div>
                <div className="Joke-smiley"><img src={emoji.src} alt={emoji.alt} /></div>
            </div>
        )
    }
}
