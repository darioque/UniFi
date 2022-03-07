import React, {Component} from "react";

class LastAssetInDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asset: {},
        };
    }

    async getAsset() {
        const response = await fetch("http://localhost:3001/api/markets/");
        const assets = await response.json();
        const lastAssetData = await fetch(
            assets.assets[assets.count - 1].detail
        );
        const lastAsset = await lastAssetData.json()
        const asset = lastAsset.asset
        this.setState({ asset });
    }

    componentDidMount() {
        this.getAsset();
    }
    render() {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">
                            Last asset in Data Base
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img
                                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                style={{ width: "10rem" }}
                                src={`http://localhost:3001/${this.state.asset.logo}`}
                                alt={`${this.state.asset.name}'s logo`}
                            />
                            <h2>{this.state.asset.name}</h2>
                        </div>
                        <p>
                        {this.state.asset.description}
                        </p>
                        <a
                            className="btn btn-danger"
                            target="_blank"
                            rel="noreferrer"
                            href={this.state.asset.detail}
                        >
                            View asset details
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LastAssetInDB;
