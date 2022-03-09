import React, { useState, useEffect } from "react";

function ProductCard(props) {
    const [asset, setAsset] = useState({});
    useEffect(() => {
        fetch(`${props.detail}`)
            .then((response) => {
                return response.json();
            })
            .then((asset) => {
                return setAsset(asset.asset);
            });
    }, [props]);
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img
                className="card-img-top"
                src={asset.logo}
                style={{ width: "100px", height: '100px' }}
                alt="product card"
            />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Type: {props.type}</p>
                <p className="card-text">{props.description}</p>
                <a href={`http://localhost:3001/markets/${props.type}/${props.id}`} className="btn btn-primary">
                    Go to details
                </a>
            </div>
        </div>
    );
}

export default ProductCard;
