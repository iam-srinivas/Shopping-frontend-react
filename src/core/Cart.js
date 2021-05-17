import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/carthelper'
import Payment from './Payment'

const Cart = () => {

    const [products, setproducts] = useState([])
    const [reload, setreload] = useState(false)

    useEffect(() => {
        setproducts(loadCart())
    }, [reload])



    return (

        <Base title="Cart Page" description="Cart Page">
            <div className="row ">
                <div className="col-6">
                    {
                        products.length > 0 ? products.map((product, index) =>
                            <div key={index} >
                                <Card product={product} AddToCart={false} removeFromCart={true} setreload={setreload} reload={reload} />
                            </div>) : <h3>No Product in cart</h3>
                    }
                </div>
                <div className="col-6">
                    <Payment products={products} setreload={setreload} reload={reload} />
                </div>
            </div>
        </Base>

    )
}

export default Cart
