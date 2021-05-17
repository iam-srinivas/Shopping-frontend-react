import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from "../auth/helper"

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" }
    } else {
        return { color: "#ffffff" }
    }
}

const Menu = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
                </li>




                {
                    isAuthenticated() ?
                        <React.Fragment>

                            <li className="nav-item">
                                <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
                            </li>
                            {
                                isAuthenticated().user.role === 1 ? <li className="nav-item">
                                    <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">A.Dashboard</Link>
                                </li> : null
                            }

                            <li className="nav-item">
                                <span onClick={() => {
                                    signout(() => {
                                        history.push("/")
                                    })
                                }} style={currentTab(history, "/signout")} className="nav-link" >Signout</span>
                            </li>
                        </React.Fragment>
                        :
                        <React.Fragment>

                            <li className="nav-item">
                                <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
                            </li>
                        </React.Fragment>
                }


            </ul>
        </div>
    )
}

export default withRouter(Menu);
