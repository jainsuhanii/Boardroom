import React from 'react'

const stepUsername = ({onNext}) => {
  return ( 
    <> 
    <div>Username</div>
    <button onClick={onNext}>Next</button>
    </>
    )
  };

export default stepUsername;