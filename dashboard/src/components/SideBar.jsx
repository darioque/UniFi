import React from "react";
import logo from "../assets/images/logo.svg";
import {Link} from "react-router-dom"

function SideBar() {
    return (
        <ul
            className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                style={{ marginTop: "20px", marginBottom: "20px" }}
                href="/"
            >
                <div className="sidebar-brand-icon">
                    <img className="w-100" src={logo} alt="Digital House" />
                </div>
            </a>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <Link to="/" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard - UniFi</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Actions</div>

            <li className="nav-item">
                <Link to="/types" className="nav-link collapsed">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Asset Types</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/last-asset" className="nav-link">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Last Asset in DB</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/last-user" className="nav-link">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Last User in DB</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/products/" className="nav-link" href="/">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Products</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/products/table" className="nav-link" href="/">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Assets Table</span>
                </Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    );
}

export default SideBar;
