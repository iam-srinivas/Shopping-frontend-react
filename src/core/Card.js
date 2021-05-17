import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { addItemToCart, removeItemFromCart } from './helper/carthelper'
import ImageHelper from './helper/ImageHelper'

const Card = ({ product, AddToCart = true, removeFromCart = false, setreload = f => f, reload = undefined }) => {

    const [redirect, setredirect] = useState(false)
    const [count, setcount] = useState(product.count)

    const addToCart = () => {
        addItemToCart(product, () => setredirect(true))
    }

    const getRedirect = () => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{product.name}</div>
            <div className="card-body">
                {
                    getRedirect()
                }
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {product.description}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">${product.price}</p>
                <div className="row">
                    <div className="col-12">
                        {
                            AddToCart && <button
                                onClick={addToCart}
                                className="btn btn-block btn-outline-success mt-2 mb-2"
                            >
                                Add to Cart
                  </button>
                        }

                    </div>
                    <div className="col-12">
                        {
                            removeFromCart && <button
                                onClick={() => {
                                    removeItemFromCart(product._id)
                                    setreload(!reload)
                                }}
                                className="btn btn-block btn-outline-danger mt-2 mb-2"
                            >
                                Remove from cart
                  </button>
                        }

                    </div>
                </div>
            </div>
        </div >
    );

}

export default Card
