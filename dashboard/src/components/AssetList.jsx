import React, { useState, useEffect, useRef } from "react";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import AssetPage from "../components/AssetPage";

function ContentWrapper() {
    return (
        <div id="content-wrapper">
            <TopBar />
            <AssetPage />
            <nav aria-label="product pages" style={{ "margin-right": '60px'}}>
                <ul class="pagination justify-content-end">
                    <li class="page-item">
                        <a class="page-link" href="#">
                            Previous
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            3
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            <Footer />
        </div>
    );
}

export default ContentWrapper;
