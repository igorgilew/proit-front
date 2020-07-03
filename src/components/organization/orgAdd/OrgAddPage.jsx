import React from "react";

const OrgAddPage = (props) => {
    let options = props.orgList.map(organization=>(
        <option key={organization.idd} value={organization.idd}>{organization.name}</option>
    ));

    return (
        <div>
            <h3>{props.header}</h3>
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Название компании:</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Название компании" value={props.orgName} onChange={e=>props.onOrgNameChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Головная компания:</label>
                        <select className="form-control" value={props.headOrgIdd}
                                id="exampleFormControlSelect1" onChange={e=>props.onHeadOrgSelectChange(e)}>
                            <option key={-1} value={-1}>{""}</option>
                            {options}
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

export default OrgAddPage;