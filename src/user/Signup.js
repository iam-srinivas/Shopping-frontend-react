import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'
import Base from "../core/Base"



const Signup = () => {
    const [values, setvalues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })
    const {
        name,
        email,
        password,
        error,
        success
    } = values


    const handleChange = name => event => {

        setvalues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault()
        setvalues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, error: data.error, success: false })
                } else {
                    setvalues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch()
    }

    const successMessage = () => (
        <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
            New Account was Created successfully . Please <Link to="/signin">Login Here</Link>
        </div>
    )
    const errorMessage = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {JSON.stringify(error)}
        </div>
    )


    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-gorup">
                            <label className="text-light" >Name</label>
                            <input className="form-control" value={name} onChange={handleChange("name")} type="text" />
                        </div>
                        <div className="form-gorup">
                            <label className="text-light">Email</label>
                            <input className="form-control" value={email} onChange={handleChange("email")} type="text" />
                        </div>
                        <div className="form-gorup">
                            <label className="text-light" >Password</label>
                            <input className="form-control" value={password} onChange={handleChange("password")} type="text" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (

        <Base title="Signup page" description="A page for user to signup">
            <h1>Signup Page</h1>
            {
                successMessage()
            }
            {
                errorMessage()
            }
            {
                signUpForm()
            }
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>

    )
}


export default Signup
