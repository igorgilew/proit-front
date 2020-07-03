import React from "react";
import {OrgApi} from "../../../server-api/OrgApi";
import OrgAddPage from "../orgAdd/OrgAddPage";

class OrgAddComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orgList: [{idd: undefined, name: undefined, createDate: undefined, countWorkers: undefined}],
            orgName: "",
            errorMessage: null,
            headOrgIdd: "-1",
            successMessage: null,
        }
    }

    componentDidMount() {
        this.getOrgs();
    }

    getOrgs = () => {

        OrgApi.getAllOrgs()
            .then(response => {
                if (response.status === 200) {
                    this.setState({orgList: response.data["list"]});
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

    onOrgNameChange = (e) =>{
        this.setState({orgName: e.target.value})
    };

    onHeadOrgSelectChange = (e) =>{
        this.setState({headOrgIdd: e.target.value})
    };


    onSaveClick = ()=>{
        let data = {}
        if(this.state.headOrgIdd === "-1"){
            data = {name: this.state.orgName}
        }else{
            data =
                {
                    name: this.state.orgName,
                    head:{
                        idd:this.state.headOrgIdd
                    }
                }
        }

        OrgApi.create(data)
            .then(response=>{
                if (response.status === 200){
                    this.setState({orgName: ""});
                    this.setState({errorMessage: null});
                    this.setState({successMessage: "Компания успешно добавлена"});
                    setTimeout(()=>{
                        this.setState({successMessage:null});
                        clearTimeout();
                    }, 2000)
                    this.setState({headOrgIdd: "-1"});
                    this.getOrgs();
                }else{
                    this.setState({errorMessage: response.data.message});
                    this.setState({successMessage: null});

                }
            })
            .catch(error =>{
                if (error.response) {
                    this.setState({errorMessage: error.response.data.message});
                } else {
                    this.setState({errorMessage: "Нет соединения с сервером"});
                }
            });
    };

    render() {
        return (
            <div>
                <OrgAddPage
                    orgList={this.state.orgList}
                    orgName={this.state.orgName}
                    headOrgIdd={this.state.headOrgIdd}
                    errorMessage={this.state.errorMessage}
                    successMessage={this.state.successMessage}

                    onOrgNameChange = {this.onOrgNameChange}
                    onHeadOrgSelectChange = {this.onHeadOrgSelectChange}
                    onSaveClick = {this.onSaveClick}

                    header = "Создание организации:"
                />
            </div>
        )
    }
}

export default OrgAddComp;