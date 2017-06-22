import React from 'react'
import ReactDOM from 'react-dom'
import SupplierList from './list'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SupplierList />, div)
})
