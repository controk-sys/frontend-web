import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import './card.css'

class Card extends Component {
  //noinspection JSMethodCanBeStatic
  render () {
    let body = this.props.body, lines = body.split('\n')
    if (lines.length > 1) {
      body = lines.map((item, i) => <span key={i}>{item}<br/></span>)
    }
    return (
      <div className="mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{ this.props.title }</h2>
        </div>
        <div className="mdl-card__supporting-text">{ body }</div>
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
