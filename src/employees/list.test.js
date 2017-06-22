import React from 'react'
import ReactDOM from 'react-dom'
import EmployeeList from './list'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EmployeeList />, div)
})
