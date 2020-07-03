import React from "react";
import {WorkerApi} from "../../../server-api/WorkerApi";
import WorkerAddPage from "../workerAdd/WorkerAddPage";
import {OrgApi} from "../../../server-api/OrgApi";
import {withRouter} from "react-router-dom";

class WorkerUpdComp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bosses: [
                //     {
                //     idd: undefined,
                //     firstName: undefined,
                //     secondName: undefined,
                //     orgIdd:{
                //         idd: undefined,
                //         name: undefined
                //     }
                // }
            ],
            orgList: [
                // {
                //     idd:undefined,
                //     name: undefined
                // }
            ],
            workerFirstName: "",
            workerSecondName: "",
            bossIdd: "",
            orgIdd: "",
            errorMessage: null,
            successMessage: null,
            workerIdd: this.props.match.params.idd
        }
    }

    componentDidMount() {
        this.setUpWorker();
    }

    setUpWorker = ()=>{

        WorkerApi.getWorkerByIdd(this.state.workerIdd)
            .then(response =>{
                if (response.status === 200){
                    this.setState({workerFirstName: response.data.firstName});
                    this.setState({workerSecondName: response.data.secondName});
                    this.setState({bossIdd: response.data.bossIdd.idd});
                    this.setState({orgIdd: response.data.orgIdd.idd});
                    this.setState({errorMessage: null});
                    this.getOrgs();
                    this.getWorkersByIdOrg();
                } else {
                    this.setState({errorMessage: response.data.message});
                    this.setState({successMessage: null});
                }
            })



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

    getWorkersByIdOrg(){

        WorkerApi.getWorkersByOrgIdd(this.state.orgIdd)
            .then(response => {
                if (response.status === 200) {
                    this.setState({bosses: response.data["list"].filter(worker=>worker.idd!= this.state.workerIdd)});
                    this.setState({errorMessage: null});
                } else {
                    this.setState({errorMessage: response.data.message});
                }
            })
            .catch(error =>{
                if (error.response) {
                    this.setState({errorMessage: error.response.data.message});
                } else {
                    this.setState({errorMessage: "Сервер не отвечает"});
                }
            })
    }

    onWorkerFirstNameChange = (e)=>{
        this.setState({workerFirstName: e.target.value});
    };

    onWorkerSecondNameChange = (e)=>{
        this.setState({workerSecondName: e.target.value});
    };

    onOrgSelectChange = (e)=>{
        this.setState({orgIdd: e.target.value, bossIdd: ""}, ()=>{
            if(this.state.orgIdd !== "")
                this.getWorkersByIdOrg();
            else{
                this.setState({bosses: []})
            }
        });

    };

    onBossSelectChange = (e)=>{
        this.setState({bossIdd: e.target.value});
    };

    onSaveClick = ()=>{
        let data;
        // {
        //     "firstName": "John",
        //     "secondName": "Snow",
        //     "orgIdd":{
        //          "idd": 2
        //          },
        //     "bossIdd":{
        //          "idd": 1
        //          }
        // }

        if(this.state.bossIdd === ""){
            data = {
                firstName: this.state.workerFirstName,
                secondName: this.state.workerSecondName,
                orgIdd:{
                    idd: this.state.orgIdd
                }
            }
        }else{
            data = {
                firstName: this.state.workerFirstName,
                secondName: this.state.workerSecondName,
                orgIdd:{
                    idd: this.state.orgIdd
                },
                bossIdd:{
                    idd: this.state.bossIdd
                }
            }
        }

        if(this.state.orgIdd !== ""){
            WorkerApi.update(this.state.workerIdd, data)
                .then(response=>{
                    if (response.status===200){
                        this.setState({errorMessage: null});
                        this.setState({successMessage: "Данные сотрудника обновлены!"});
                        setTimeout(()=>{
                            this.setState({successMessage:null});
                            clearTimeout();
                        }, 2000)
                    }else{
                        this.setState({errorMessage: response.data.message});
                        this.setState({successMessage: null});
                    }
                })
                .catch(error=>{
                    if (error.response) {
                        this.setState({errorMessage: error.response.data.message});
                    } else {
                        this.setState({errorMessage: "Нет соединения с сервером"});
                    }
                })
        }


    };

    render() {
        return (
            <div>
                <WorkerAddPage
                    bosses={this.state.bosses}
                    orgList={this.state.orgList}
                    workerFirstName={this.state.workerFirstName}
                    workerSecondName={this.state.workerSecondName}
                    bossIdd={this.state.bossIdd}
                    orgIdd={this.state.orgIdd}

                    errorMessage={this.state.errorMessage}
                    successMessage={this.state.successMessage}

                    onOrgSelectChange={this.onOrgSelectChange}
                    onBossSelectChange={this.onBossSelectChange}
                    onSaveClick={this.onSaveClick}
                    onWorkerFirstNameChange={this.onWorkerFirstNameChange}
                    onWorkerSecondNameChange={this.onWorkerSecondNameChange}
                    header = "Изменение данных сотрудника:"
                />
            </div>
        );
    }
}

export default withRouter(WorkerUpdComp);