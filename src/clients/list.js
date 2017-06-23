import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import axios from 'axios' // eslint-disable-line no-unused-vars
import Card from '../components/card' // eslint-disable-line no-unused-vars
import Loader from '../components/loader' // eslint-disable-line no-unused-vars
import './list.css'

class ClientList extends Component {
  constructor (props) {
    super(props)
    this.state = {clients: [], isLoading: true}
  }

  render () {
    return (
      <div className="clients-list">
        <Loader isActive={this.state.isLoading}/>
        {this.state.clients.map((item, i) => <Card key={i} title={item.name} body={`${item.cpf} ${item.email}`}/>)}
      </div>
    )
  }

  componentDidMount () {
    axios.get(process.env.API_URL + 'clients/')
      .then((response) => {
        this.setState({clients: response.data, isLoading: false})
      })
  }
}

export default ClientList
