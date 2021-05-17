import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/carthelper'
import { createOrder } from './helper/orderhelper'
import { getToken, processPayment } from './helper/paymenthelper'
import DropIn from "braintree-web-drop-in-react"


const Payment = ({ products, setreload = f => f, reload = undefined }) => {

    const [info, setinfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        instance: {},
        error: ""
    })

    const getTokenFormServer = (userId, token) => {
        getToken(userId, token)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setinfo({ ...info, error: data.error })
                } else {
                    const clientToken = data.clientToken

                    setinfo({ ...info, clientToken })
                }
            })
            .catch(err => console.log(err))
    }

    const { user, token } = isAuthenticated()

    useEffect(() => {
        getTokenFormServer(user._id, token)
    }, [])



    const onPurchase = () => {
        setinfo({
            ...info, loading: true
        })
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(user._id, token, paymentData)
                    .then(res => {
                        setinfo({ ...info, success: res.success, loading: false, error: "" })
                        const orderData = {
                            products: products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount
                        }
                        createOrder(user._id, token, orderData)
                        cartEmpty(() => {
                            console.log("hello")
                        })
                        setreload(!reload)
                    })
                    .catch(err => {
                        setinfo({ ...info, error: err, loading: false, success: false })
                    })
            })


    }

    const getAmount = () => {
        let amount = 0
        products.map(prod => {
            amount = amount + prod.price
        })
        return amount
    }

    const showDropIn = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ? <div>
                        <h3>Payable {getAmount()}</h3>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => setinfo({ ...info, instance })}
                        />
                        <button className="btn  btn-success btn-lg" onClick={onPurchase}>Buy</button>
                    </div> : <h3>Add Something to cart</h3>
                }
            </div>
        )
    }

    return (
        <div>
            <h3>Test bt</h3>
            {
                showDropIn()
            }
        </div>
    )
}

export default Payment
