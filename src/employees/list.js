import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import CardList from '../components/cardList' // eslint-disable-line no-unused-vars

class EmployeeList extends Component {
  //noinspection JSMethodCanBeStatic
  render () {
    return <CardList endpoint="employees/"
      title={(item) => item.name}
      body={(item) => `CPF: ${item.cpf}\nEmail: ${item.email}`}
    />
  }
}

export default EmployeeList
