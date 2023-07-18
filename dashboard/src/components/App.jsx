import "../assets/css/app.css";
import SideBar from "./SideBar";
import ContentWrapper from "./ContentWrapper";
import { Route, Switch } from "react-router-dom";
import TypesInDb from "./TypesInDb";
import AssetsTable from "./AssetsTable";
import LastAssetInDB from "./LastAssetInDB";
import LastUserInDB from "./LastUserInDB";
import AssetList from "./AssetList";
import Error404 from "./Error404";

function App() {
    return (
        <div className="wrapper" id="wrapper">
            <SideBar />
            <Switch>
                <Route path="/" exact component={ContentWrapper} />
                <Route path="/types" component={TypesInDb} />
                <Route path="/products/" exact component={AssetList} />
                <Route path="/products/table" component={AssetsTable} />
                <Route path="/last-asset" component={LastAssetInDB} />
                <Route path="/last-user" component={LastUserInDB} />
                <Route component={Error404} />
            </Switch>
        </div>
    );
}

export default App;
