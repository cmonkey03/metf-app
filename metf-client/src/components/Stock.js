import React from 'react';

const Stock = (props) => {

    return(
      <tr>
        <td>{props.stockInfo.name.replace(/"/g, '')}</td>
        <td>{props.stockInfo.symbol}</td>
        <td>${props.stockInfo.price}</td>
        <td><button className="tiny ui button" onClick={() => props.handleClick(props.stockInfo)}> {props.button === "add" ? "Add Stock" : "Remove Stock"} </button></td>
      </tr>
    )


  }

export default Stock
