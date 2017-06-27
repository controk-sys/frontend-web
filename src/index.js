import React from 'react' // eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom' // eslint-disable-line no-unused-vars

import NavigationDrawer from './components/navigationDrawer' // eslint-disable-line no-unused-vars

import ClientList from './clients/list'
import SupplierList from './suppliers/list'
import EmployeeList from './employees/list'

import './index.css'

render(
  <HashRouter>
    <NavigationDrawer>
      <Route path="/clients" component={ClientList}/>
      <Route path="/employees" component={EmployeeList}/>
      <Route path="/suppliers" component={SupplierList}/>
    </NavigationDrawer>
  </HashRouter>,
  document.getElementById('root')
)
