import React from 'react'
import CardList from '../components/cardList' // eslint-disable-line no-unused-vars

class EmployeeList extends React.Component {
  //noinspection JSMethodCanBeStatic
  render () {
    return <CardList endpoint="employees/"
      title={(item) => item.name}
      body={(item) => `CPF: ${item.cpf}\nEmail: ${item.email}`}
    />
  }
}

export default EmployeeList
