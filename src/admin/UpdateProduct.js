import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getCategories, getProduct, updateProduct } from './helper/admminapicall'

const UpdateProduct = (props) => {


    const { user, token } = isAuthenticated()

    const [values, setvalues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: false,
        createdProduct: null,
        getaRedirect: false,
        formData: {}
    })

    const { name, description, price, stock, categories, category, loading, error, createdProduct, getaRedirect, formData } = values

    const preLoad = (productId) => {


        getProduct(productId).then(data => {
            if (data.error) {
                setvalues({ ...values, error: data.error })

            } else {
                setvalues({ ...values, name: data.name, description: data.description, price: data.price, category: data.category._id, stock: data.stock, formData: new FormData() })

            }
        })
            .catch()


        getCategories()
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, error: data.error })

                } else {
                    setvalues({ ...values, categories: data, formData: new FormData() })

                }
            })
            .catch()

    }

    useEffect(() => {
        preLoad(props.match.params.productId)

    }, [])

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setvalues({ ...values, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setvalues({ ...values, error: false, loading: true, createdProduct: null })
        updateProduct(props.match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {

                    setvalues({ ...values, error: data.error, loading: false })
                } else {
                    setvalues({
                        ...values, name: "", description: "", price: "", photo: "", stock: "", loading: false, formData: new FormData(), createdProduct: data.name,
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const successMessage = () => (
        <div className="alert alert-sucess mt-3" style={{ display: createdProduct ? "block" : "none" }}>
            <h4>{createdProduct} Updated successfully</h4>
        </div>
    )
    const errorMessage = () => (
        <div className="alert alert-sucess mt-3" style={{ display: error ? "block" : "none" }}>
            <h4>{error}</h4>
        </div>
    )

    const createProductForm = () => (
        <form >
            <span>Post photo</span>
            <div className="form-group mb-3">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group mb-3">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group mb-3">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group mb-3">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group mb-3">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                    value={category}
                >
                    <option>Select</option>
                    {
                        categories.map((dt, i) => <option key={i} value={dt._id}>{dt.name}</option>)
                    }

                </select>
            </div>
            <div className="form-group mb-3">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Create Product
          </button>
        </form>
    );

    return (
        <Base title="Update Product" description="Update Product" className="container bg-info p-4">
            {
                goBack()
            }
            <div className="row bg-dark text-white">
                <div className="col-md-8 offset-md-2">
                    {
                        successMessage()
                    }
                    {
                        errorMessage()
                    }
                    {
                        createProductForm()
                    }
                </div>
            </div>
        </Base>
    )
}

export default UpdateProduct
