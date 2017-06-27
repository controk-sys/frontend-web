import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import MDLComponent from './mdl'

class Loader extends MDLComponent {
  render () {
    let style = {display: this.props.isActive ? 'inline-block' : 'none'}
    return <div className='mdl-spinner mdl-js-spinner is-active' style={style}/>
  }
}

Loader.propTypes = {
  isActive: PropTypes.bool.isRequired
}

export default Loader
