import React from "react";

function ProductCard(props) {
    return (
      <div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" src={props.logo} alt="product card"/>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href={props.type} className="btn btn-primary">Go somewhere</a>
  </div>
</div>
    );
}

export default ProductCard;
