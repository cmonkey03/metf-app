import React from 'react';
import Stock from './Stock'

const StockTable = (props) => {

    return(
      <table className="ui celled striped padded table">
            <tbody>
              <tr>
                <th>
                  <h3 className="ui center aligned header">
                    Name
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Ticker
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Current Price
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    {props.button === "add" ? "Add" : "Remove"}
                  </h3>
                </th>
              </tr>

              {props.stockList.map(function(stockInfo, idx){
                return < Stock key={idx} stockInfo={stockInfo} handleClick={props.handleClick} button={props.button} />
              })}

            </tbody>
          </table>
    )

}

export default StockTable
