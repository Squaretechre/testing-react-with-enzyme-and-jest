import React, { Component } from 'react'

const urlForUser = id =>
  `https://jsonplaceholder.typicode.com/users/${id}`

const fetchUser = id => fetch(urlForUser(id)).then(data => data.json())

class User extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    fetchUser(this.props.id).then(user => this.setState({
      user
    }))
  }

  render() {
    return this.state.user === null ? (
      <p>Loading!</p>
    ) : (
      <div>
        <h4>{this.state.user.name}</h4>
        <p>URL: {this.state.user.website}</p>
      </div>
    )
  }
}

export default User