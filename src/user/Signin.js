import React, { useState } from 'react'
import Base from "../core/Base"

import { signin, authenticate, isAuthenticated } from "../auth/helper"
import { Link, Redirect } from 'react-router-dom'


const Signin = () => {

    const [values, setvalues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false

    })
    const {
        email,
        password,
        error,
        loading,
        didRedirect
    } = values
    const { user } = isAuthenticated()
    const handleChange = name => event => {

        setvalues({ ...values, error: false, [name]: event.target.value })
    }

    const loadingMessage = () => (
        <div className="alert alert-info" style={{ display: loading ? "" : "none" }}>
            Loading...
        </div>
    )
    const errorMessage = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {JSON.stringify(error)}
        </div>
    )
    const onSubmit = event => {
        event.preventDefault()
        setvalues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(
                data => {
                    if (data.error) {
                        setvalues({ ...values, loading: false, error: data.error })
                    } else {
                        authenticate(data, () => {
                            setvalues({
                                ...values,
                                didRedirect: true
                            })
                        })
                    }
                }
            )
            .catch(console.log("sign in request failed"))
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >

                        <div className="form-gorup">
                            <label className="text-light">Email</label>
                            <input value={email} onChange={handleChange("email")} className="form-control" type="text" />
                        </div>
                        <div className="form-gorup">
                            <label className="text-light">Password</label>
                            <input value={password} onChange={handleChange("password")} className="form-control" type="text" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                        {
                            JSON.stringify(values)
                        }
                    </form>
                </div>
            </div>
        )
    }


    return (

        <Base title="Signin page" description="A page for user to signup">
            <h1>Signin Page</h1>
            {
                signInForm()
            }
            {
                performRedirect()
            }
            {
                errorMessage()
            }
            {
                loadingMessage()
            }
        </Base>

    )
}


export default Signin
