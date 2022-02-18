import React from "react";
import MetricsContent from "./MetricsContent";
import TypesInDb from "./TypesInDb";
import LastMovieInDb from "./LastMovieInDb";
import AssetsTable from "./AssetsTable";

function ContentRowTop() {
    return (
				<div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>

					<MetricsContent/>

					<div className="row">

						<LastMovieInDb/>

						<TypesInDb/>

					</div>

					<AssetsTable/>
				</div>
    );
}

export default ContentRowTop;
