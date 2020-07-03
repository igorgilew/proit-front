import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrgList from "./components/organization/orgList/OrgListComp"
import  OrgAdd from "./components/organization/orgAdd/OrgAddComp"
import WorkerList from "./components/worker/workerList/WorkerListComp"
import WorkerAdd from "./components/worker/workerAdd/WorkerAddComp"
import OrgUpd from "./components/organization/orgUpdate/OrgUpdComp"
import WorkerUpd from "./components/worker/workerUpd/WorkerUpdComp"
import Nav from "./components/nav/Nav"
import OrgTree from "./components/organization/orgTree/OrgTreeComp"
import WorkerTree from "./components/worker/workerTree/WorkerTreeComp"


class App extends React.Component{

    render(){
        return(
            <div>
                <Router>
                    <Nav/>
                    <Switch>
                        <Route path={"/org/create"} render={()=><OrgAdd/>}/>
                        <Route path={"/org/update/:idd?"} render={()=><OrgUpd/>}/>
                        <Route path={"/org/tree"} render={() => <OrgTree/>}/>
                        <Route path={"/org"} render={() => <OrgList/>}/>
                        <Route path={"/worker/create"} render={() => <WorkerAdd/>}/>
                        <Route path={"/worker/update/:idd?"} render={()=><WorkerUpd/>}/>
                        <Route path={"/worker/tree"} render={() => <WorkerTree/>}/>
                        <Route path={"/worker"} render={() => <WorkerList/>}/>
                        {/*<Route path={"/"} render={() => <Nav/>}/>*/}
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default App;