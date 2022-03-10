import React, { Component } from "react";

class LastUserInDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    async getUser() {
        const response = await fetch("http://localhost:3001/api/users/");
        const users = await response.json();
        const lastUserData = await fetch(
            users.users[users.count - 1].detail
        );
        const lastUser = await lastUserData.json();
        const user = lastUser.user;
        this.setState({ user, type:user.first_name });
    }

    

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">
                            Last User in Data Base
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img
                                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                style={{ width: "10rem" }}
                                src={`http://localhost:3001${this.state.user.avatar}`}
                                alt={`${this.state.user.first_name + " " + this.state.user.last_name}'s logo`}
                            />
                            <h2>{this.state.user.user_name??this.state.user.email?? this.state.user.address}</h2>
                        </div>
                        <a
                            className="btn btn-danger"
                            target="_blank"
                            rel="noreferrer"
                            href={`http://localhost:3001/users/${this.state.user.id}/profile`}                           
                            style={{color: 'white', backgroundColor: '#4e73df', borderColor: '#4e73df'}}
                        >
                            View user details
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LastUserInDB;
