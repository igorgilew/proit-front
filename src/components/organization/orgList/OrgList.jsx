import React from "react";
import Pagination from "react-js-pagination";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const OrgList = (props) =>{
    return(
        <div>
            <h3 className={"ml-3"}>Список организаций</h3>

            <div className={"d-flex justify-content-end mb-2 mr-3"}>
                <form className="form-inline">
                    <div className="form-group mb-2">
                        <div className={"mx-sm-0"}>
                            <label htmlFor="companySearchName">Организация:</label>
                        </div>
                        <div className={"mx-sm-3"}>
                            <input type="text" className="form-control" id="companySearchName"
                                   placeholder="Название" value={props.orgNameSearchText}
                                   onChange={e => props.onOrgNameSearch(e)}
                            />
                        </div>
                        <button type={"button"} className="btn btn-info"
                                onClick={() => props.onClickSearch()}>Поиск
                        </button>
                    </div>
                </form>
            </div>


            <Dialog
                open={props.showModal}
                onClose={props.onModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Нельзя удалить организацию, в которой есть сотрудники.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onModalOkClick} color="primary" autoFocus>
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>

            <table className={"table table-striped table-bordered"}>
                <thead>
                <tr className={"text-center"}>
                    <th>№ организации</th>
                    <th>Название организации</th>
                    <th>Дата создания</th>
                    <th>Число сотрудников</th>
                    <th>Изменить</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.orgList.map(organization =>
                        <tr className={"text-center"} key={organization.idd}>
                            <td className={"align-middle"}>{organization.idd}</td>
                            <td className={"align-middle"}>{organization.name}</td>
                            <td className={"align-middle"}>{organization.createDate}</td>
                            <td className={"align-middle"}>{organization.countWorkers}</td>
                            <td className={"align-middle"}>
                                <NavLink to={`/org/update/${organization.idd}`}>
                                    <button className={"btn btn-secondary"}>Изменить</button>
                                </NavLink>
                            </td>
                            <td className={"align-middle"}>
                                <button className={"btn btn-secondary"} onClick={() => {
                                    props.onClickDelete(organization.idd)
                                }}>Удалить
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>

            {props.errorMessage &&
            <div className={"alert alert-danger d-inline-flex p-2"}>{props.errorMessage}</div>}

            <div className={"d-flex justify-content-center"}>
                <form className="form-inline">
                    <div className="form-group mb-2">
                        <NavLink to={"/org/create"}>
                            <button type={"button"} className="btn btn-outline-primary">Создать</button>
                        </NavLink>
                    </div>
                </form>
            </div>

            <div className={"d-flex justify-content-center mt-5"}>
                <Pagination
                    onChange={props.onPageChange}
                    totalItemsCount={props.totalItemsCount}
                    activePage={props.currentPage}
                    pageRangeDisplayed={3}
                    itemsCountPerPage={props.pageCountItem}
                    itemClass="page-item"
                    linkClass="page-link"

                />
            </div>

        </div>
    )
}

export default OrgList;