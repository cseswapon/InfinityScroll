import React from "react";
import './Card.css';
const Card = ({ props }) => {
//   console.log(props);
  return (
    <div className="grid">
      {props.map((movie, i) => (
        <div key={i}>
          <span>{movie?.id}</span>
          <h1>{movie?.title.substr(0, 30)}</h1>
          <p>{movie?.body.substr(0, 150)}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
