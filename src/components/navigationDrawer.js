import React from 'react' // eslint-disable-line no-unused-vars
import {findDOMNode} from 'react-dom'
import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import Hammer from 'hammerjs'

import MDLComponent from './mdl'

class NavigationDrawer extends MDLComponent {
  render () {
    let linkList = [
      {endpoint: '/employees', label: 'Employees'},
      {endpoint: '/suppliers', label: 'Suppliers'},
      {endpoint: '/clients', label: 'Clients'},
      {endpoint: '/shipments', label: 'Shipments'},
      {endpoint: '/products', label: 'Products'},
      {endpoint: '/stock', label: 'Stock'},
    ]
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref={(node) => {this.layoutNode = node}}>
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Controk</span>
          </div>
        </header>
        <div className="mdl-layout__drawer" ref={(node) => {this.drawerNode = node}}>
          <nav className="mdl-navigation">
            {linkList.map(
              (item, i) => <Link key={i} className="mdl-navigation__link" to={item.endpoint}>{item.label}</Link>
            )}
          </nav>
        </div>
        <main className="mdl-layout__content" ref={(node) => {this.contentNode = node}}>
          <div className="page-content">
            {this.props.children}
          </div>
        </main>
      </div>
    )
  }

  componentDidMount () {
    let toggleDrawer = () => {
      //noinspection JSUnresolvedFunction
      this.layoutNode.MaterialLayout.toggleDrawer()
    }

    let hammerDefinitions = [
      {node: this.drawerNode, direction: Hammer.DIRECTION_LEFT, event: 'swipeleft'},
      {node: this.contentNode, direction: Hammer.DIRECTION_RIGHT, event: 'swiperight'}
    ]
    hammerDefinitions.forEach((definition) => {
      let drawerManager = new Hammer.Manager(definition.node, {
        recognizers: [[Hammer.Swipe, {direction: definition.direction}]]
      })
      drawerManager.on(definition.event, toggleDrawer)
    })

    //noinspection JSCheckFunctionSignatures
    findDOMNode(this).querySelectorAll('.mdl-navigation__link').forEach((item) => {
      item.addEventListener('click', toggleDrawer)
    })
  }
}

NavigationDrawer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
}

export default NavigationDrawer
