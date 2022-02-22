import "../assets/css/app.css";
import SideBar from "./SideBar";
import ContentWrapper from "./ContentWrapper";
import { Route, Switch } from "react-router-dom";
import TypesInDb from "./TypesInDb";
import AssetsTable from "./AssetsTable";
import LastMovieInDb from "./LastMovieInDb";
import Error404 from "./Error404";

function App() {
    return (
        <div className="wrapper" id="wrapper">
            <SideBar />
            <Switch>
            <Route path="/" exact component={ContentWrapper} />
            <Route path="/types" component={TypesInDb} />
            <Route path="/tables" component={AssetsTable} />
            <Route path="/charts" component={LastMovieInDb} />
            <Route component={Error404} />
            </Switch>
        </div>
    );
}

export default App;
