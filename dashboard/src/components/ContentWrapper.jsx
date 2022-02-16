import React from "react";
import TopBar from '../components/TopBar'
import Footer from '../components/Footer'
import ContentRowTop from '../components/ContentRowTop'

function ContentWrapper() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <TopBar/>
            <ContentRowTop/>
            <Footer/>
        </div>
    )
}

export default ContentWrapper;
