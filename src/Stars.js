import React, { Component } from 'react';

const Stars = (props) => {
  const ratingFloor = Math.floor(props.rating);
  const starArr = []
  for(let i = 0; i < ratingFloor; i++){
    starArr.push(<i key={i} className="material-icons">star</i>);
  }
  return(
    <span className={props.starClass}>
      {starArr}
    </span>
  )
}

export default Stars
