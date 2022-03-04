import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";

function AssetPage() {
    const [assets, setAssets] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("http://localhost:3001/api/markets/")
            .then((response) => {
                return response.json();
            })
            .then((assets) => {
                return setAssets(assets.data);
            });
    }, []);

    return (
        <div id="content-wrapper">
            <div className="card-deck ml-5 mr-5 mb-5 mt-5">
                {assets.length > 0 &&
                    assets.map((asset) => {
                        return (
                            <ProductCard
                                key={asset.id}
                                logo={asset.logo}
                                name={asset.name}
                                type={asset.type}
                            />
                        );
                    })}
            </div>
            <div className="card-deck ml-5 mr-5 mb-5 mt-5">
                {assets.length > 0 &&
                    assets.map((asset) => {
                        return (
                            <ProductCard
                                key={asset.id}
                                logo={asset.logo}
                                name={asset.name}
                                type={asset.type}
                            />
                        );
                    })}
            </div>
            <div className="card-deck ml-5 mr-5 mb-5 mt-5">
                {assets.length > 0 &&
                    assets.map((asset) => {
                        return (
                            <ProductCard
                                key={asset.id}
                                logo={asset.logo}
                                name={asset.name}
                                type={asset.type}
                            />
                        );
                    })}
            </div>
            <div className="card-deck ml-5 mr-5 mb-5 mt-5">
                {assets.length > 0 &&
                    assets.map((asset) => {
                        return (
                            <ProductCard
                                key={asset.id}
                                logo={asset.logo}
                                name={asset.name}
                                type={asset.type}
                            />
                        );
                    })}
            </div>
		</div>
    );
}

export default AssetPage;
