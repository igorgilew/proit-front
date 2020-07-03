import React from "react";
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <ul className={`nav justify-content-center`}>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" to={"/org"}>Список организаций</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" to={"/org/tree"}>Дерево организаций</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" to={"/worker"}>Список сотрудников</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" to={"/worker/tree"}>Дерево сотрудников</NavLink>
                </li>
            </ul>
        </div>
    )
};

export default Nav;