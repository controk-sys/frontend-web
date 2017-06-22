import React from 'react'
import ReactDOM from 'react-dom'
import ClientList from './list'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ClientList />, div)
})
