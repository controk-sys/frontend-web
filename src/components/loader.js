import React from 'react' // eslint-disable-line no-unused-vars
import MDLComponent from './mdl'

class Loader extends MDLComponent {
  render () {
    let style = {display: this.props.isActive ? 'inline-block' : 'none'}
    return <div className='mdl-spinner mdl-js-spinner is-active' style={style}/>
  }
}

export default Loader
