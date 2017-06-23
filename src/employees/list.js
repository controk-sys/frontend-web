import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import axios from 'axios' // eslint-disable-line no-unused-vars
import Card from '../components/card' // eslint-disable-line no-unused-vars
import Loader from '../components/loader' // eslint-disable-line no-unused-vars
import './list.css'

class EmployeeList extends Component {
  constructor (props) {
    super(props)
    this.state = {employees: [], isLoading: true}
  }

  render () {
    return (
      <div className="employees-list">
        <Loader isActive={this.state.isLoading}/>
        {this.state.employees.map(
          (item, i) => <Card key={i} title={item.name} body={`CPF: ${item.cpf}\nEmail: ${item.email}`}/>
        )}
      </div>
    )
  }

  componentDidMount () {
    axios.get(process.env.API_URL + 'employees/')
      .then((response) => {
        this.setState({employees: response.data, isLoading: false})
      })
  }
}

export default EmployeeList
