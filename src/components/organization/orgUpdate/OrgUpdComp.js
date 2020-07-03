import React from "react";
import {OrgApi} from "../../../server-api/OrgApi";
import OrgAddPage from "../orgAdd/OrgAddPage";
import {withRouter} from "react-router-dom";

class OrgUpdComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orgList: [],
            orgName: "",
            errorMessage: null,
            headOrgIdd: "-1",
            successMessage: null,
        }
    }

    componentDidMount() {
        this.setUpOrgData();
    }

    setUpOrgData = () =>{
        let orgIdd = this.props.match.params.idd;
        OrgApi.getOrgByIdd(orgIdd)
            .then(response=>{
                if (response.status === 200){
                    this.setState({orgName: response.data.name});
                    this.setState({headOrgIdd: response.data.head.idd});
                    this.setState({errorMessage: null});
                } else {
                    this.setState({errorMessage: response.data.message});
                    this.setState({successMessage: null});
                }
            })
            .catch(error => {
                    this.setState({successMessage: null});
                    if (error.response) {
                        this.setState({errorMessage: error.response.data.message});
                    } else {
                        this.setState({errorMessage: "Нет соединения с сервером"});
                    }
                }
            );
        this.getOrgs(orgIdd);
    }

    getOrgs = (orgIdd) => {

        OrgApi.getAllOrgs()
            .then(response => {
                if (response.status === 200) {
                    this.setState({orgList: response.data["list"].filter(x=>x.idd !== orgIdd)});
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

        OrgApi.update(this.props.match.params.idd, data)
            .then(response=>{
                if (response.status === 200){
                    this.setState({errorMessage: null});
                    this.setState({successMessage: "Компания успешно обновлена"});
                    setTimeout(()=>{
                        this.setState({successMessage:null});
                        clearTimeout();
                    }, 2000)
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

                    header = "Обновление организации:"
                />
            </div>
        )
    }
}

export default withRouter(OrgUpdComp);