import React from "react";
import Pagination from "react-js-pagination";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const WorkerList = (props) =>{
    return(
        <div>
            <div className={"d-flex justify-content-end mt-4 mb-2 mx-2"}>
                <form className="form-inline">
                    <div className={"d-flex justify-content-end mb-2"}>
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <div className={"mx-sm-0"}>
                                    <label htmlFor="orgSearchName">Организация:</label>
                                </div>
                                <div className={"mx-sm-3"}>
                                    <input type="text" className="form-control" id="orgSearchName"
                                           placeholder="Организация" value={props.orgNameSearchText}
                                           onChange={e => props.onOrgNameSearch(e)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={"d-flex justify-content-end mb-2"}>
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <div className={"mx-sm-0"}>
                                    <label htmlFor="workerSearchName2">Имя сотрудника:</label>
                                </div>
                                <div className={"mx-sm-3"}>
                                    <input type="text" className="form-control" id="workerSearchName2"
                                           placeholder="Имя" value={props.firstNameSearchText}
                                           onChange={e => props.onFirstNameSearch(e)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="form-group mb-2">
                        <div className={"mx-sm-0"}>
                            <label htmlFor="workerSearchName3">Фамилия сотрудника:</label>
                        </div>
                        <div className={"mx-sm-3"}>
                            <input type="text" className="form-control" id="workerSearchName3"
                                   placeholder="Фамилия" value={props.secondNameSearchText}
                                   onChange={e => props.onSecondNameSearch(e)}
                            />
                        </div>
                        <button type={"button"} className="btn btn-info"
                                onClick={() => props.onClickSearch()}>Поиск
                        </button>
                    </div>
                </form>
            </div>
            <h3>Список сотрудников:</h3>
            <Dialog
                open={props.showModal}
                onClose={props.onModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/*<DialogTitle id="alert-dialog-title">{"Попытаться удалить организацию?"}</DialogTitle>*/}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Нельзя удалить сотрудника, у которого есть подчиненные.
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
                    <th>№ Сотрудника</th>
                    <th>Сотрудник</th>
                    <th>Название организации</th>
                    <th>Руководитель</th>
                    <th>Изменить</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.workers.map(worker =>
                        <tr className={"text-center"} key={worker.idd}>
                            <td className={"align-middle"}>{worker.idd}</td>
                            <td className={"align-middle"}>{worker.firstName + " " + worker.secondName}</td>
                            <td className={"align-middle"}>{worker.orgIdd.name}</td>
                            <td className={"align-middle"}>{worker.bossIdd != null? worker.bossIdd.firstName + " " + worker.bossIdd.secondName: ""}</td>
                            <td className={"align-middle"}>
                                <NavLink to={`/worker/update/${worker.idd}`}>
                                    <button className={"btn btn-secondary"}>Изменить</button>
                                </NavLink>
                            </td>
                            <td className={"align-middle"}>
                                <button className={"btn btn-secondary"} onClick={() => {
                                    props.onClickDelete(worker.idd)
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
                        <NavLink to={"/worker/create"}>
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

export default WorkerList;