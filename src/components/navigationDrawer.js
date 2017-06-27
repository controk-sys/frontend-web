import React from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars

import MDLComponent from './mdl'

class NavigationDrawer extends MDLComponent {
  render () {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Controk</span>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <nav className="mdl-navigation">
            <Link className="mdl-navigation__link" to="/employees">Employees</Link>
            <Link className="mdl-navigation__link" to="/suppliers">Suppliers</Link>
            <Link className="mdl-navigation__link" to="/clients">Clients</Link>
            <Link className="mdl-navigation__link" to="/shipments">Shipments</Link>
            <Link className="mdl-navigation__link" to="/products">Products</Link>
            <Link className="mdl-navigation__link" to="/stock">Stock</Link>
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
    /**
     * Add click listeners to drawer items to close it
     */
    let closeDrawer = () => {
      let obfuscator = document.querySelector('.mdl-layout__obfuscator')
      let drawer = document.querySelector('.mdl-layout__drawer')

      obfuscator.className = obfuscator.className.replace(/\s?is-visible/, '')
      drawer.className = drawer.className.replace(/\s?is-visible/, '')
    }

    document.querySelectorAll('.mdl-navigation__link').forEach((item) => {
      item.addEventListener('click', closeDrawer)
    })
  }
}

export default NavigationDrawer
