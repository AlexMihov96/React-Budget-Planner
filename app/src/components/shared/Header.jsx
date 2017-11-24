import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        let isLogged = localStorage.getItem('user') === null
        const {loggedIn, onLogout} = this.props

        return (
            <div className="container-fluid">
                <ul className="nav navbar-inverse bg-primary">
                    <li className="nav-item">
                        <NavLink exact to="/" className="navbar-brand nav-link" activeClassName="active">
                            Home
                        </NavLink>
                    </li>

                    {isLogged && <li className="nav-item">
                        <NavLink className="nav-link" to="/login" activeClassName="active">
                            Login
                        </NavLink>
                    </li>}

                    {isLogged && <li className="nav-item">
                        <NavLink className="nav-link" to="/register" activeClassName="active">
                            Register
                        </NavLink>
                    </li>}

                    {!isLogged && <li className="nav-item">
                        <NavLink className="nav-link" to="/yearly-balance" activeClassName="active">
                            Yearly Balance
                        </NavLink>
                    </li>}

                    {!isLogged && <li className="nav-item">
                        <a href="javascript:void(0)" className="nav-link" onClick={onLogout}>
                            Logout
                        </a>
                    </li>}
                </ul>
            </div>
        )
    }
}