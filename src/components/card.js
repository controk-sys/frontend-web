import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import './card.css'

class Card extends Component {
  //noinspection JSMethodCanBeStatic
  render () {
    return (
      <div className="mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{ this.props.title }</h2>
        </div>
        <div className="mdl-card__supporting-text">{ this.props.body }</div>
        <div className="mdl-card__menu">
          <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i className="material-icons">edit</i>
          </button>
        </div>
      </div>
    )
  }
}

export default Card
