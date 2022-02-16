import React from "react";
import PropTypes from 'prop-types'

function MetricsCard(props) {
    return (
        <div className="col-md-4 mb-4">
            <div className={`border-left-${props.color} shadow h-100 py-2`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-${props.color} text-uppercase mb-1`}>
                                {props.title}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {props.number}
                            </div>
                        </div>
                        <div className="col-auto">
                            <i className={`fas ${props.icon} fa-2x text-gray-300`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

MetricsCard.propTypes = {
	title: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	icon: PropTypes.oneOf([
		'fa-film', 'fa-award', 'fa-user'
	]).isRequired,
};

MetricsCard.defaultProps = {
    title: "Unknown Data",
    number: "Undefined number",
    color: "primary",
    icon: "fa-film",
};
export default MetricsCard