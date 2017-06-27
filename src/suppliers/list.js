import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import CardList from '../components/cardList' // eslint-disable-line no-unused-vars

class SupplierList extends Component {
  //noinspection JSMethodCanBeStatic
  render () {
    return <CardList endpoint="suppliers/"
      title={(item) => item.trading_name}
      body={(item) => `CNPJ: ${item.cnpj}\nEmail: ${item.email}`}
    />
  }
}

export default SupplierList
