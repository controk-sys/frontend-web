import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import axios from 'axios' // eslint-disable-line no-unused-vars
import Card from '../components/card' // eslint-disable-line no-unused-vars
import Loader from '../components/loader' // eslint-disable-line no-unused-vars
import './list.css'

class SupplierList extends Component {
  constructor (props) {
    super(props)
    this.state = {suppliers: [], isLoading: true}
  }

  render () {
    return (
      <div className="suppliers-list">
        <Loader isActive={this.state.isLoading}/>
        {this.state.suppliers.map(
          (item, i) => <Card key={i} title={item.trading_name} body={`CNPJ: ${item.cnpj}\nEmail: ${item.email}`}/>
        )}
      </div>
    )
  }

  componentDidMount () {
    axios.get(process.env.API_URL + 'suppliers/')
      .then((response) => {
        this.setState({suppliers: response.data, isLoading: false})
      })
  }
}

export default SupplierList
