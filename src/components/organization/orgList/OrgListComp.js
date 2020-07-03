import React from "react";
import OrgList from "./OrgList";
import {OrgApi} from "../../../server-api/OrgApi";

class OrgListComp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            orgList: [{idd: undefined, name: undefined, createDate: undefined, countWorkers: undefined}],
            currentPage: 1,
            pageCountItem: 3,

            totalItemsCount: 0,
            errorMessage: null,
            showModal: false,
            orgNameSearchText: ""
        }
    }

    componentDidMount() {
        this.getOrgsByParams(this.state.orgNameSearchText, this.state.currentPage, this.state.pageCountItem);
    }

    onPageChange = (newCurrentPage) => {
        this.setState({currentPage: newCurrentPage}, () => {
            this.getOrgsByParams(this.state.orgNameSearchText, this.state.currentPage, this.state.pageCountItem);
        });
    };

    onClickDelete = (orgIdd) => {
        let countWorkers = this.state.orgList.filter(
            (el)=>{return el.idd===orgIdd})[0].countWorkers;
        if (countWorkers===0) {
            this.deleteOrg(orgIdd);
        }else{
            this.setState({showModal: true});
        }
    };

    deleteOrg = (orgIdd) =>{
        OrgApi.delete(orgIdd)
            .then(response => {
                if (response.status === 200) {
                    this.getOrgsByParams(this.state.orgNameSearchText, this.state.currentPage, this.state.pageCountItem)
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



    //отправка запроса данных на сервер
    getOrgsByParams = (orderBy, page, pageCountItem) => {

        OrgApi.getListByParams((page-1)*pageCountItem, pageCountItem, orderBy, "")
            .then(response => {
                if (response.status === 200) {
                    this.setState({orgList: response.data["list"]});
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

    onOrgNameSearch = (e)=>{
        this.setState({orgNameSearchText: e.target.value})
    };

    onClickSearch = () => {
        this.setState({currentPage: 1}, () => {
            this.getOrgsByParams(this.state.orgNameSearchText, this.state.currentPage, this.state.pageCountItem);
        });
    };

    render() {
        return (
            <>
                <OrgList
                    orgList={this.state.orgList}
                    currentPage={this.state.currentPage}
                    pageCountItem={this.state.pageCountItem}
                    orgNameSearchText={this.state.orgNameSearchText}
                    totalItemsCount={this.state.totalItemsCount}
                    errorMessage={this.state.errorMessage}
                    showModal={this.state.showModal}

                    onPageChange={this.onPageChange}
                    onOrgNameSearch={this.onOrgNameSearch}
                    onClickSearch={this.onClickSearch}
                    onClickDelete={this.onClickDelete}
                    onModalClose={this.onModalClose}
                    onModalOkClick={this.onModalOkClick}
                />
            </>
        )
    }
}

export default OrgListComp;