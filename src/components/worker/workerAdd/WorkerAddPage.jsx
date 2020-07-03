import React from "react";

const WorkerAddPage = (props) => {

    let orgOptions = props.orgList.map(org=>(
        <option key={org.idd} value={org.idd}>{org.name}</option>
    ));
    let bossOptions = props.bosses.map(boss=>(
        <option key={boss.idd} value={boss.idd}>{boss.firstName + " " + boss.secondName}</option>
    ));

    return (
        <div>
            <h3>{props.header}</h3>
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Имя сотрудника:</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Имя сотрудника" value={props.workerFirstName} onChange={e=>props.onWorkerFirstNameChange(e)}/>
                        <label htmlFor="exampleFormControlInput2">Фамилия сотрудника:</label>
                        <input type="text" className="form-control" id="exampleFormControlInput2"
                               placeholder="Фамилия сотрудника" value={props.workerSecondName} onChange={e=>props.onWorkerSecondNameChange(e)}/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Компания сотрудника:</label>
                        <select className="form-control" value={props.orgIdd}
                                id="exampleFormControlSelect1" onChange={e=>props.onOrgSelectChange(e)}>
                            <option key={-1} value={""}>{""}</option>
                            {orgOptions}
                        </select>
                        <label htmlFor="exampleFormControlSelect2">Руководитель сотрудника:</label>
                        <select className="form-control" value={props.bossIdd}
                                id="exampleFormControlSelect2" onChange={e=>props.onBossSelectChange(e)}>
                            <option key={-1} value={""}>{""}</option>
                            {bossOptions}
                        </select>
                    </div>
                </form>
            </div>
            <div className={"d-flex justify-content-center"}>
                <form className="form-inline">
                    <div className="form-group mb-4 mt-4">
                        <button type={"button"} className="btn btn-outline-primary" onClick={props.onSaveClick}>Сохранить</button>
                    </div>
                </form>
            </div>
            <div className={"d-flex justify-content-center"}>
                {(props.successMessage && !props.errorMessage) &&
                <div className={"alert alert-success d-inline-flex p-2"}>{props.successMessage}</div>}
                {props.errorMessage &&
                <div className={"alert alert-danger d-inline-flex p-2"}>{props.errorMessage}</div>}
            </div>
        </div>
    )
};

export default WorkerAddPage;