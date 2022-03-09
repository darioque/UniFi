import React, { Component } from "react";

class TypesInDb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
        };
    }

    async getTypes() {
        const response = await fetch("http://localhost:3001/api/markets/");
        const types = await response.json();
		this.setState({ 
            types: types.countByCategory,
        });

    }

	componentDidMount() {
		this.getTypes()
	}


    changeBg(element) {
        element.classList.toggle('bg-secondary')
    }

    render() {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5
                            onMouseOver={() => {
                                this.changeBg(document.querySelector("#types"));
                            }}
                            onMouseLeave={() => {
                                this.changeBg(document.querySelector("#types"));
                            }}
                            className="m-0 font-weight-bold text-gray-800"
                        >
                            Types in Data Base
                        </h5>
                    </div>
                    <div className="card-body" id="types">
                        <div className="row">
                            {Object.keys(this.state.types).map((type, i) => {
                                return (
                                    <div key={type + i} className="col-lg-6 mb-4">
                                        <div className="card bg-dark text-white shadow">
                                            <div className="card-body">
                                                {type.replace(type[0], type[0].toUpperCase())}
                                                <p>Amount in DB: {this.state.types[type]}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TypesInDb;
