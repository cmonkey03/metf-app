import React from 'react'
import SubmitButton from '../components/SubmitButton';
import StockTable from '../components/StockTable';

const CreateETF = (props) => {

  return(
    <React.Fragment>
      <p className="App-intro">
        Please create your own ETF with 7 of the following stocks:
      </p>
      < StockTable stockList={props.selectedStocks} handleClick={props.removeStock} button={"remove"} />
      <p>{props.selectedStocks.length} of 7</p>
      {props.selectedStocks.length === 7 && < SubmitButton handleClick={props.createETF} />}
      < StockTable stockList={props.unselectedStocks} handleClick={props.selectStock} button={"add"} />
    </React.Fragment>
  )
}

export default CreateETF
