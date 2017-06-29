import React from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars
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
        <div className="mdl-layout__drawer">
          <nav className="mdl-navigation">
            {linkList.map(
              (item, i) => <Link key={i} className="mdl-navigation__link" to={item.endpoint}>{item.label}</Link>
            )}
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            {this.props.children}
          </div>
        </main>
      </div>
    )
  }

  componentDidMount () {
    let iterateDrawerElements = (callback) => {
      let elements = [document.querySelector('.mdl-layout__obfuscator'), document.querySelector('.mdl-layout__drawer')]
      elements.forEach(callback)
    }

    let closeDrawer = () => {
      //noinspection JSUnresolvedFunction
      this.layoutNode.MaterialLayout.toggleDrawer()
    }

    //noinspection JSUnresolvedFunction
    requestIdleCallback(() => {
      iterateDrawerElements((item) => {
        let manager = new Hammer.Manager(item, {
          recognizers: [[Hammer.Swipe, {direction: Hammer.DIRECTION_LEFT}]]
        })
        manager.on('swipeleft', closeDrawer)
      })
    })

    document.querySelectorAll('.mdl-navigation__link').forEach((item) => {
      item.addEventListener('click', closeDrawer)
    })
  }
}

export default NavigationDrawer
