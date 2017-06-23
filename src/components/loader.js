import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class Loader extends Component {
  render () {
    let [className, display] = this.props.isActive ? [' is-active', 'null'] : ['', 'none']
    return <div className={'mdl-spinner mdl-js-spinner' + className} style={{display: display}} />
  }
}

export default Loader
