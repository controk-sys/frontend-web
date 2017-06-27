import React from 'react'
import CardList from '../components/cardList' // eslint-disable-line no-unused-vars

class SupplierList extends React.Component {
  //noinspection JSMethodCanBeStatic
  render () {
    return <CardList endpoint="suppliers/"
      title={(item) => item.trading_name}
      body={(item) => `CNPJ: ${item.cnpj}\nEmail: ${item.email}`}
    />
  }
}

export default SupplierList
