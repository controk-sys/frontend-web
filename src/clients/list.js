import React from 'react'
import CardList from '../components/cardList' // eslint-disable-line no-unused-vars

class ClientList extends React.Component {
  //noinspection JSMethodCanBeStatic
  render () {
    return <CardList endpoint="clients/"
      title={(item) => item.name}
      body={(item) => `CPF: ${item.cpf}\nEmail: ${item.email}`}
    />
  }
}

export default ClientList
