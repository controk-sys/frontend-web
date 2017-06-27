import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Loader from '../components/loader' // eslint-disable-line no-unused-vars
import Card from '../components/card' // eslint-disable-line no-unused-vars
import './cardList.css'

class CardList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {objects: [], isLoading: true}
  }

  render () {
    return (
      <div className="card-list">
        <Loader isActive={this.state.isLoading}/>
        {this.state.objects.map(
          (item, i) => <Card key={i} title={this.props.title(item)} body={this.props.body(item)}/>
        )}
      </div>
    )
  }

  componentDidMount () {
    axios.get(process.env.API_URL + this.props.endpoint)
      .then((response) => {
        this.setState({objects: response.data, isLoading: false})
      })
  }
}

CardList.propTypes = {
  endpoint: PropTypes.string.isRequired
}

export default CardList
