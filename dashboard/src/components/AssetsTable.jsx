import React, {Component} from 'react'
import Asset from './Asset';

class AssetsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
        };
    }

    async getAssets() {
        const response = await fetch("http://localhost:3001/api/markets/");
        const assets = await response.json();
        this.setState({ assets: assets.data });
    }

    componentDidMount() {
        this.getAssets();
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Ticker</th>
                        <th scope="col">Price</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.assets.map((asset) => {
                        return (
                            <Asset
                                key={asset.id}
                                id={asset.id}
                                name={asset.name}
                                ticker={asset.ticker}
                                price={asset.price}
                                mcap={asset.mcap}
                                supply={asset.supply}
                            ></Asset>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default AssetsTable