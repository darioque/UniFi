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
        this.setState({ assets: assets.assets });
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
                        <th scope="col">Type ID</th>
                        <th scope="col">Type Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.assets.map((asset) => {
                        return (
                            <Asset
                                key={asset.id}
                                id={asset.id}
                                name={asset.name}
                                type={asset.type.name}
                                typeId={asset.type.id}
                            ></Asset>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default AssetsTable