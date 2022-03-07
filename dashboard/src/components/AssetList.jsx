import React, { useState, useEffect, useRef } from "react";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import AssetPage from "../components/AssetPage";

function AssetList() {
    return (
        <div id="content-wrapper">
            <TopBar />
            <AssetPage />
            <Footer />
        </div>
    );
}

export default AssetList;
