import React, { Component } from 'react';
import ETFTable from './ETFTable';

export default class DisplayETF extends Component{
  constructor(props){
    super(props)
    this.state = {
      pickList: [],
      score: 0
    }

    this.getAllPicks = this.getAllPicks.bind(this)
    this.getStockInfo = this.getStockInfo.bind(this)
    this.calculateScore = this.calculateScore.bind(this)
    this.updateDatabase = this.updateDatabase.bind(this)
  }


  componentDidMount(){
    this.getAllPicks()
  }

  getAllPicks(){
    let etfID = this.props.etf.id

    fetch(`http://localhost:3000/stock_picks`).then(res => res.json()).then(
      picks => picks.filter(pick => pick.etf_id === etfID)
    ).then(etfPicks => {
      this.getStockInfo(etfPicks)
    })
  }

  getStockInfo(etfPicks){
    etfPicks.forEach(pick => {
        let currStock = this.props.allStocks.find(stock => stock.id === pick.stock_id)
        let toAdd = {...pick, name: currStock.name, symbol: currStock.symbol, current_price: currStock.price}
        this.setState(prevState => ({
          pickList: [...prevState.pickList, toAdd]
        }))
      })
    this.calculateScore()
  }

  calculateScore(){
    let total = 0
    this.state.pickList.forEach(function(pick){
      total += ((pick.current_price - pick.initial_price)/pick.initial_price)
    })
    let totalScore = total / 7
    this.setState({
      score: totalScore
    })
    this.updateDatabase()
  }

  updateDatabase(){
    fetch(`http://localhost:3000/etfs/${this.props.etf.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        score: (this.state.score * 10000000)
      })
    })
  }

  getDate(){
    let date = this.props.etf.created_at
    let dateArr = date.split("-")
    let newDateArr = [dateArr[0], dateArr[1], ...dateArr[2].split("T")]
    return `${newDateArr[1]}-${newDateArr[2]}-${newDateArr[0]}`
  }
        // fetch(`http://localhost:3000/stocks/${pick.stock_id}`).then(res => res.json()).then(stock => {
        // let info = {...pick, name: stock.name, symbol: stock.symbol}
        // console.log(this.props.allStocks)
        // debugger
        // this.setState(prevState => ({
        //   pickList: [...prevState.pickList, info]
        // }))
      // this.setState(prevState => ({
      //   pickList: prevState.pickList.map((currPick, currIdx) => {
      //     console.log(stock)
      //     console.log(currPick)
      //     if(currIdx === idx){
      //       debugger
      //       currPick = {...currPick, name: stock.name, symbol: stock.symbol}
      //     }
      //   })
      // }))
  //   // })
  //   )
  // }

  render(){
    return(
      <React.Fragment>
        <table className="ui celled striped padded table">
            <tbody>
          {this.state.pickList.map(function(pick, idx){
            return <ETFTable key={idx} idx={idx} pick={pick} />
            })
          }

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{(Math.round(this.state.score * 10000) / 100) > 0 && "+"}{Math.round(this.state.score * 10000) / 100}%</td>
            </tr>
          </tbody>
        </table>
        <label className="ui grey label">MeTF created on {this.getDate()}</label>
      </React.Fragment>

    )
  }


}
