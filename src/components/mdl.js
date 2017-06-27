import React from 'react'
import {findDOMNode} from 'react-dom'

import 'material-design-lite'
import '../../node_modules/material-design-lite/dist/material.min.css'

class MDLComponent extends React.Component {
  componentDidMount () {
    //noinspection JSCheckFunctionSignatures
    componentHandler.upgradeElement(findDOMNode(this))
  }
}

export default MDLComponent
