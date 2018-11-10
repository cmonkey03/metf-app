import React from 'react';

const SubmitButton = (props) => {

  return(
    <button onClick={props.handleClick} className="small ui button">
      Submit ETF
    </button>
  )
}

export default SubmitButton
