import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import {findDOMNode} from 'react-dom'

class Loader extends Component {
  render () {
    let style = {display: this.props.isActive ? 'inline-block' : 'none'}
    return <div className='mdl-spinner mdl-js-spinner is-active' style={style}/>
  }

  componentDidMount () {
    //noinspection JSCheckFunctionSignatures
    componentHandler.upgradeElement(findDOMNode(this))
  }
}

export default Loader
