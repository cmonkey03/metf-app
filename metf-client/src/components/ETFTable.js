import React from 'react';

const ETFTable = (props) => {

  return(
    props.idx === 0 ?
                <React.Fragment>
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
                        Initial Price
                      </h3>
                    </th>
                    <th>
                      <h3 className="ui center aligned header">
                        Current Price
                      </h3>
                    </th>
                    <th>
                      <h3 className="ui center aligned header">
                        % Change
                      </h3>
                    </th>
                  </tr>
                  <tr>
                    <td>{props.pick.name.replace(/"/g, '')}</td>
                    <td>{props.pick.symbol}</td>
                    <td>${props.pick.initial_price}</td>
                    <td>${props.pick.current_price}</td>
                    <td>{(Math.round(((props.pick.current_price - props.pick.initial_price)/props.pick.initial_price) * 10000) / 100) > 0 && "+"}{Math.round(((props.pick.current_price - props.pick.initial_price)/props.pick.initial_price) * 10000) / 100}%</td>
                  </tr>
                </React.Fragment>
              :
              <tr>
                <td>{props.pick.name.replace(/"/g, '')}</td>
                <td>{props.pick.symbol}</td>
                <td>${props.pick.initial_price}</td>
                <td>${props.pick.current_price}</td>
                <td>{(Math.round(((props.pick.current_price - props.pick.initial_price)/props.pick.initial_price) * 10000) / 100) > 0 && "+"}{Math.round(((props.pick.current_price - props.pick.initial_price)/props.pick.initial_price) * 10000) / 100}%</td>
              </tr>
  )
}

export default ETFTable
