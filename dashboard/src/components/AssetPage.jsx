import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ProductCard from "../components/ProductCard";

function AssetPage() {
    const [assets, setAssets] = useState([]);

    const [page, setPage] = useState(0);

    const [count, setCount] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:3001/api/markets/?limit=20&&page=0`)
            .then((response) => {
                return response.json();
            })
            .then((assets) => {
                setAssets(assets.assets);
                setCount(assets.count - 20);
                return;
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3001/api/markets/?limit=20&&page=${page}`)
            .then((response) => {
                return response.json();
            })
            .then((assets) => {
                setAssets(assets.assets);
                return;
            });
        if (page === 0) {
            previousButton.current.classList.add("disabled");
        } else {
            previousButton.current.classList.remove("disabled");
        }
        if (count <= 0) {
            nextButton.current.classList.add("disabled");
        } else {
            nextButton.current.classList.remove("disabled");
        }
    }, [page, count]);

    function nextPage() {
        setPage(page + 1);
        setCount(count - 20);
    }

    function previousPage() {
        setPage(page - 1);
        setCount(count + 20);
    }

    const previousButton = useRef();

    const nextButton = useRef();
    // return (

    //     <div id="content-wrapper">
    //         <div className="card-deck ml-5 mr-5 mb-5 mt-5">
    //             {assets.length > 0 &&
    //                 assets.map((asset) => {
    //                     return (
    //                         <ProductCard
    //                             key={asset.id}
    //                             logo={asset.logo}
    //                             name={asset.name}
    //                             type={asset.type}
    //                         />
    //                     );
    //                 })}
    //         </div>
    //         <div className="card-deck ml-5 mr-5 mb-5 mt-5">
    //             {assets.length > 0 &&
    //                 assets.map((asset) => {
    //                     return (
    //                         <ProductCard
    //                             key={asset.id}
    //                             logo={asset.logo}
    //                             name={asset.name}
    //                             type={asset.type}
    //                         />
    //                     );
    //                 })}
    //         </div>
    //         <div className="card-deck ml-5 mr-5 mb-5 mt-5">
    //             {assets.length > 0 &&
    //                 assets.map((asset) => {
    //                     return (
    //                         <ProductCard
    //                             key={asset.id}
    //                             logo={asset.logo}
    //                             name={asset.name}
    //                             type={asset.type}
    //                         />
    //                     );
    //                 })}
    //         </div>
    //         <div className="card-deck ml-5 mr-5 mb-5 mt-5">
    //             {assets.length > 0 &&
    //                 assets.map((asset) => {
    //                     return (
    //                         <ProductCard
    //                             key={asset.id}
    //                             logo={asset.logo}
    //                             name={asset.name}
    //                             type={asset.type}
    //                         />
    //                     );
    //                 })}
    //         </div>
    //         <nav aria-label="product pages" style={{ marginRight: "60px" }}>
    //             <ul className="pagination justify-content-end">
    //                 <li className="page-item disabled" ref={previousButton}>
    //                     <a
    //                         className="page-link"
    //                         href="#"
    //                         onClick={previousPage}
    //                     >
    //                         Previous
    //                     </a>
    //                 </li>
    //                 <li className="page-item" ref={nextButton}>
    //                     <a className="page-link" href="#" onClick={nextPage}>
    //                         Next
    //                     </a>
    //                 </li>
    //             </ul>
    //         </nav>
    //     </div>
    // );
    const getColumnsForRow = () => {
        let items = assets.map((asset) => {
            return (
                <Col key={asset.id} style={{width: "25%"}}>
                             <ProductCard
                                 key={asset.id}
                                 id={asset.id}
                                 logo={asset.logo}
                                 name={asset.name}
                                 type={asset.type.name}
                                 detail={asset.detail}
                                 description={asset.description}
                             />
                </Col>
            );
        });
        return items;
    };
    return (
        <Container>
            <Row xs={1} md={4}>
                {getColumnsForRow()}
            </Row>
            <nav aria-label="product pages" style={{ marginRight: "60px" }}>
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled" ref={previousButton}>
                        <a
                            className="page-link"
                            href="#"
                            onClick={previousPage}
                        >
                            Previous
                        </a>
                    </li>
                    <li className="page-item" ref={nextButton}>
                        <a className="page-link" href="#" onClick={nextPage}>
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </Container>
    );
}

export default AssetPage;
