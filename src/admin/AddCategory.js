import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createCategory } from './helper/admminapicall'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'

const AddCategory = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    const { user, token } = isAuthenticated()

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = (e) => {
        setError("")
        setName(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        createCategory(user._id, token, { name })
            .then(
                data => {
                    if (data.error) {
                        setError(true)
                    } else {
                        setError(false)
                        setSuccess(true)
                        setName("")
                    }
                }
            )
            .catch()

    }

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category Created Successfully</h4>
        }
    };
    const errorMessage = () => {
        if (error) {
            return <h4 className="text-success">Failed to create Catogory</h4>
        }
    };

    const categoryForm = () => (
        <form >
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input onChange={handleChange} value={name} type="text" autoFocus required placeholder="Ex. Summer" className="form-control my-3" />
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>
    )


    return (
        <Base title="Create Category" description="add new Category" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {
                        successMessage()
                    }
                    {
                        errorMessage()
                    }
                    {
                        categoryForm()
                    }
                    {
                        goBack()
                    }
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
