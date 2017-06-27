import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import Card from './card'
import CardList from './cardList'
import Loader from './loader'
import NavigationDrawer from './navigationDrawer'
import EmployeeList from '../employees/list'

it('renders active loader without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Loader isActive={true}/>, div)
})

it('renders inactive loader without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Loader isActive={false}/>, div)
})

it('renders navigation drawer without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <HashRouter>
      <NavigationDrawer>
        <Route path="/employees" component={EmployeeList}/>
      </NavigationDrawer>
    </HashRouter>,
    div
  )
})

it('renders card without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Card title="Title" body="Body\nSecond line"/>, div)
})

it('renders card list without crashing', () => {
  // TODO: Mock webservice
  const div = document.createElement('div')
  let getTitle = (item) => item.name
  let getBody = (item) => `${item.cpf} ${item.name}`
  ReactDOM.render(<CardList endpoint="clients" title={getTitle} body={getBody}/>, div)
})
