import React from "react";
import WorkerList from "./WorkerList";
import {WorkerApi} from "../../../server-api/WorkerApi";
import {OrgApi} from "../../../server-api/OrgApi";

class WorkerListComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workers: [
                    {
                        idd: undefined,
                        firstName: undefined,
                        secondName: undefined,
                        orgIdd:{
                            idd: undefined,
                            name: undefined
                        },
                        bossIdd:{
                            idd:undefined,
                            firstName: undefined,
                            secondName: undefined
                        }
                    }
                ],
            currentPage: 1,
            pageCountItem: 3,
            totalItemsCount: 0,
            errorMessage: null,
            showModal: false,
            orgNameSearchText: "",
            firstNameSearchText: "",
            secondNameSearchText: ""
        }
    }


    componentDidMount() {
        this.getWorkersByParams(this.state.orgNameSearchText,
            this.state.firstNameSearchText,
            this.state.secondNameSearchText,
            this.state.currentPage, this.state.pageCountItem);
    }

    onPageChange = (newCurrentPage) =>{
        this.setState({currentPage: newCurrentPage}, () => {
            this.getWorkersByParams(this.state.orgNameSearchText,
                this.state.firstNameSearchText,
                this.state.secondNameSearchText,
                this.state.currentPage, this.state.pageCountItem);
        });
    };

    getWorkersByParams = (orgName, firstName, secondName, page, pageCountItem) => {

        WorkerApi.getListByParams((page-1)*pageCountItem, pageCountItem, orgName, firstName, secondName, "")
            .then(response => {
                if (response.status === 200) {
                    this.setState({workers: response.data["list"]});
                    this.setState({totalItemsCount: response.data["totalCount"]});
                    this.setState({errorMessage: null});
                } else {
                    this.setState({errorMessage: response.data.message});
                }
            })
            .catch(error => {
                    if (error.response) {
                        this.setState({errorMessage: error.response.data.message});
                    } else {
                        this.setState({errorMessage: "Сервер не отвечает"});
                    }
                }
            );
    };

    onClickDelete = (workerIdd)=>{
        let countWorkers = this.state.workers.filter(
            (worker)=>{
                return worker.bossIdd != null && worker.bossIdd.idd === workerIdd
            }).length;
        if (countWorkers===0) {
            this.deleteOrg(workerIdd);
        }else{
            this.setState({showModal: true});
        }
    };

    deleteOrg = (workerIdd) =>{
        WorkerApi.delete(workerIdd)
            .then(response => {
                if (response.status === 200) {
                    this.getWorkersByParams(this.state.orgNameSearchText,
                        this.state.firstNameSearchText,
                        this.state.secondNameSearchText, this.state.currentPage, this.state.pageCountItem)
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

    onModalClose = () =>{
        this.setState({showModal: false});
    };

    onModalOkClick = () =>{
        this.setState({showModal: false});
    };

    onOrgNameSearch = (e)=>{
        this.setState({orgNameSearchText: e.target.value})
    }
    onFirstNameSearch = (e)=>{
        this.setState({firstNameSearchText: e.target.value})
    }
    onSecondNameSearch = (e)=>{
        this.setState({secondNameSearchText: e.target.value})
    }

    onClickSearch = ()=>{
        this.setState({currentPage: 1}, () => {
            this.getWorkersByParams(this.state.orgNameSearchText,
                                    this.state.firstNameSearchText,
                                    this.state.secondNameSearchText,
                this.state.currentPage, this.state.pageCountItem);
        });
    }

    render() {
        return (
            <>
                <WorkerList
                    workers={this.state.workers}
                    currentPage={this.state.currentPage}
                    pageCountItem={this.state.pageCountItem}
                    totalItemsCount={this.state.totalItemsCount}
                    errorMessage={this.state.errorMessage}
                    showModal={this.state.showModal}

                    onPageChange={this.onPageChange}
                    onClickDelete={this.onClickDelete}
                    onModalClose={this.onModalClose}
                    onModalOkClick={this.onModalOkClick}

                    orgNameSearchText={this.state.orgNameSearchText}
                    firstNameSearchText={this.state.firstNameSearchText}
                    secondNameSearchText={this.state.secondNameSearchText}

                    onOrgNameSearch={this.onOrgNameSearch}
                    onFirstNameSearch={this.onFirstNameSearch}
                    onSecondNameSearch={this.onSecondNameSearch}

                    onClickSearch={this.onClickSearch}


                />
            </>
        )
    }


}

export default WorkerListComp;