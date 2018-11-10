import React from 'react';
import { NavLink } from 'react-router-dom';

class LeaderboardRow extends React.Component {

  state = {
    name: ''
  }

  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.props.etf.user_id}`)
    .then(res => res.json())
    .then(user => this.setState({ name: user.name }))
  }

  render() {
    return (
      <tr>
        <td>{this.props.place}</td>
        <td><NavLink  to="/user-ETFs"
                      onClick={this.props.handleSelectedLeaderBoardUser}
                      >
                      {this.state.name}
                    </NavLink></td>
        <td>{this.props.etf.score}</td>
        <td><button className="tiny ui button" onClick={() => this.props.handleClick(this.props.etf)}>View ETF</button></td>
      </tr>
    )
  }
}

export default LeaderboardRow;
