import React from 'react' // eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { Route, HashRouter, Link } from 'react-router-dom' // eslint-disable-line no-unused-vars
import ClientList from './clients/list'
import SupplierList from './suppliers/list'
import EmployeeList from './employees/list'
import './index.css'
import '../node_modules/material-design-lite/dist/material.min.css'
import 'material-design-lite'

render(
  <HashRouter>
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
          <Route path="/clients" component={ClientList}/>
          <Route path="/employees" component={EmployeeList}/>
          <Route path="/suppliers" component={SupplierList}/>
        </div>
      </main>
    </div>
  </HashRouter>,
  document.getElementById('root') // eslint-disable-line no-undef
)
