import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Leaderboard from './Leaderboard';
import Login from '../components/Login';
import Signup from '../components/Signup';
import SignupSuccess from '../components/SignupSuccess';
import NavBar from '../components/NavBar';
import CreateETF from './CreateETF';
import ViewEtfs from './ViewEtfs';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      allStocks: [],
      selectedStocks: [],
      topETFs: [],
      currETF: null,
      currUser: null,
      nameInput: "",
      selectedUserToDisplayETFs: null
    }

    this.selectStock = this.selectStock.bind(this)
    this.removeStock = this.removeStock.bind(this)
    this.createETF = this.createETF.bind(this)

  }

  componentDidMount() {
    const topETFsPromise = fetch(`http://localhost:3000/etfs`).then(r => r.json())
    const stocksPromise = fetch(`http://localhost:3000/stocks`).then(r => r.json())

    Promise.all([topETFsPromise, stocksPromise])
     .then(data => {
       const sortedTopETFs = data[0].sort(function(a, b) {
         return b.score - a.score
       })

       this.setState({topETFs: sortedTopETFs})
       return data[1]
    })
    .then(data => this.addCurrPrice(data))
  }

  addCurrPrice(stocksData){
    return stocksData.map(stock => {
      return fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/book`)
        .then(res => res.json())
        .then(info => {
          this.setState(prevState => ({
            allStocks: [...prevState.allStocks, {...stock, price: info.quote.extendedPrice}]
          }))
        })
    })
  }

  handleNameInput = (event) => {
    this.setState({nameInput: event.target.value})
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(users => users.find(user => user.name === this.state.nameInput))
    .then(
        userObj => this.setState({
          currUser: userObj,
          nameInput: ""
    }))
  }

  handleSignupSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/users`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.nameInput
      })
    })
    .then(res => this.props.history.push('/SignupSuccess'), this.setState({
      nameInput: ""
    }))
  }

  handleLogout = (event) => {
    this.setState({currUser: null})
  }

  handleSelectedLeaderBoardUser = (event) => {
    const selectedUser = event.target.text
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
      const foundUser = users.find((user) => user.name === selectedUser)

      this.setState({selectedUserToDisplayETFs: foundUser})
    })
  }

  selectStock(stock){
    this.setState(prevState => ({
      selectedStocks: [...prevState.selectedStocks, stock]
    }))
  }

  removeStock(stock){
    this.setState(prevState => ({
      selectedStocks: prevState.selectedStocks.filter(elem => elem !== stock)
    }))
  }

  getUnselectedStocks(){
    return this.state.allStocks.filter(stock => !this.state.selectedStocks.includes(stock))
  }

  createETF(){
    fetch('http://localhost:3000/etfs', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: this.state.currUser.id, score: 0})
    })
    .then(res => res.json())
    .then(etf => this.setState({
        currETF: etf
      }))
    .then(() => this.createStockPicks())
    .then(() => this.setState({
      selectedStocks: []
    }))
  }

  createStockPicks(){
    this.state.selectedStocks.forEach(currStock => this.stockPickFetch(currStock))
  }

  stockPickFetch(stock){
    fetch('http://localhost:3000/stock_picks', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({etf_id: this.state.currETF.id, stock_id: stock.id, initial_price: stock.price})
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://www.investmentweek.co.uk/w-images/788d48c0-a63c-4cce-8553-2bab367f1731/1/etfcards-580x358.jpg' className="App-logo" alt="logo" />
          <h1 className="ui white inverted header">Welcome to MeTF</h1>
        </header>
        <NavBar {...this.state} handleLogout={this.handleLogout} />
        <div className="App-body">
          <Route
            exact
            path="/Leaderboard"
            render={ (renderProps) => {
              return (
                  <React.Fragment>
                    <h1>Leaderboard</h1>
                    <Leaderboard  {...this.state}
                                  handleSelectedLeaderBoardUser={this.handleSelectedLeaderBoardUser}
                                  />
                  </React.Fragment>
                )
              }}
            />
          <Route
            exact
            path="/create-ETF"
            render={ (renderProps) => {
              return (
                <CreateETF  selectedStocks={this.state.selectedStocks}
                            removeStock={this.removeStock}
                            createETF={this.createETF}
                            unselectedStocks={this.getUnselectedStocks()}
                            selectStock={this.selectStock}
                            />
                        )
              }}
            />
          <Route
              exact path="/view-ETF"
              render={ (renderProps) => {
                return (
                  this.state.currUser === null ? "Please Log In" :
                  <ViewEtfs  userToDisplay={this.state.currUser}
                             allStocks={this.state.allStocks}
                             currUser={this.state.currUser}
                            />
                         )
              }}
            />
            <Route
                exact path="/user-ETFs"
                render={ (renderProps) => {
                  return (
                      this.state.selectedUserToDisplayETFs === null ? "Loading" :
                        <ViewEtfs userToDisplay={this.state.selectedUserToDisplayETFs}
                                  allStocks={this.state.allStocks}
                                  currUser={this.state.currUser}
                                  />
                           )
                }}
              />
          <Route
            exact
            path="/Login"
            render={ (renderProps) => {
              return (
                <React.Fragment>
                  <h3>Please login</h3>
                  <Login  handleNameInput={this.handleNameInput}
                          handleLoginSubmit={this.handleLoginSubmit}
                          nameInput={this.state.nameInput}
                          />
                </React.Fragment>
                    )
              }}
            />
          <Route
            exact
            path="/Signup"
            render={ (renderProps) => {
              return (
                <React.Fragment>
                  <h3>Signup to create your own ETFs and score on the leaderboard.</h3>
                  <Signup handleNameInput={this.handleNameInput}
                          handleSignupSubmit={this.handleSignupSubmit}
                          nameInput={this.state.nameInput}
                          />
                </React.Fragment>
                    )
              }}
            />
            <Route
              exact
              path="/SignupSuccess"
              render={ (renderProps) => {
                return (
                  <SignupSuccess  handleNameInput={this.handleNameInput}
                                  handleSignupSubmit={this.handleSignupSubmit}
                                  nameInput={this.state.nameInput}
                                  />
                              )
                }}
              />
              <Route
                exact
                path="/Logout"
                render={ (renderProps) => {
                  return (
                    <Login  handleNameInput={this.handleNameInput}
                            handleLoginSubmit={this.handleLoginSubmit}
                            nameInput={this.state.nameInput}
                            />
                        )
                  }}
                />
            </div>
      </div>
    );
  }
}

export default withRouter(App);
