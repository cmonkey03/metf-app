import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DisplayETF from '../components/DisplayETF';

export default class ViewEtfs extends Component{

  constructor(props){
    super(props)
    this.state = {
      etfList: []
    }

    this.getAllEtfs = this.getAllEtfs.bind(this)
  }


  componentDidMount(){
    this.getAllEtfs()
  }

  getAllEtfs(){
    let userID = this.props.userToDisplay.id

    fetch(`http://localhost:3000/etfs`).then(res => res.json()).then(
      etfs => etfs.filter(etf => etf.user_id === userID)
    ).then(userEtfs => {
      this.setState({
        etfList: userEtfs
      })
    })
  }

  getHeader(){
    return this.props.userToDisplay.name + `'s ETFs`
  }

  // changeState(etf, userID){
  //   if(etf.user_id === userID){
  //     this.setState({
  //         etfList: etf
  //     })
  //   }
  // }

  render(){
    return(
        <div>
          <h2>{this.getHeader()}</h2>
          {this.props.currUser !== this.props.userToDisplay && <NavLink to="/Leaderboard" className="ui button">Return to Leaderboard</NavLink> }
          {this.state.etfList.map((etf, idx) => <DisplayETF key={idx} etf={etf} allStocks={this.props.allStocks} />)}
        </div>
    )
  }

}
