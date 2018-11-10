import React, { Component } from 'react';
import LeaderboardRow from '../components/LeaderboardRow'
import DisplayETF from '../components/DisplayETF'

class Leaderboard extends Component{
  constructor(props){
    super(props)

    this.state = {
      clickedETF: null
    }

    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(etf){
    this.setState({
      clickedETF: etf
    })
  }

  render(){
    return (

      this.state.clickedETF === null

      ?

      <table className="ui celled striped padded table">
            <tbody>
              <tr>
                <th>
                  <h3 className="ui center aligned header">
                    Place
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Name
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Score
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    View ETF
                  </h3>
                </th>
              </tr>

              {this.props.topETFs.map((etf, idx) => {
                return < LeaderboardRow key={idx} etf={etf} place={idx+1} handleClick={this.handleClick} handleSelectedLeaderBoardUser={this.props.handleSelectedLeaderBoardUser} />
              })}

            </tbody>
          </table>

          :

          <React.Fragment>
            <DisplayETF etf={this.state.clickedETF} allStocks={this.props.allStocks} />
            <div className="Leaderboard-button">
              <button className="ui button" onClick={() => this.setState({ clickedETF: null })}>Return to Leaderboard</button>
            </div>
          </React.Fragment>
    )
  }
}

export default Leaderboard
