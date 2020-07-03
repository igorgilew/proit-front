import React from "react";

import TreeView from "../../tree/WorkerTree";
import {WorkerApi} from "../../../server-api/WorkerApi";

class WorkerTreeComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            errorMessage: null,
        }
    }

    componentDidMount() {
        this.getWorkerTree();
    }

    getWorkerTree = () => {
        WorkerApi.getWorkerTree()
            .then(response => {
                if (response.status === 200) {
                    this.setState({data: response.data});
                    this.setState({errorMessage: null});
                } else {
                    this.setState({errorMessage: response.data.message});
                }
            })
            .catch(error => {
                if (error.response) {
                    this.setState({errorMessage: error.response.data.message});
                } else {
                    this.setState({errorMessage: "Нет соединения с сервером"});
                }
            })
    };

    render() {
        return (
            <>
                <TreeView
                    data={this.state.data}
                    errorMessage={this.state.errorMessage}
                    header = "Дерево сотрудников:"
                />
            </>
        );
    }
}

export default WorkerTreeComp;