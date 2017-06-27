import React from 'react'
import {findDOMNode} from 'react-dom'

class Loader extends React.Component {
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
