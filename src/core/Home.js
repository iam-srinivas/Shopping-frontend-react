import React, { useEffect, useState } from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'

export default function Home() {

    const [products, setproducts] = useState([])
    const [error, seterror] = useState(false)


    useEffect(() => {
        allProducts()
    }, [])

    const allProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    seterror(data.error)
                } else {
                    setproducts(data)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Base title="Home Page" description="Home Page">
                <div className="row ">
                    {
                        products.map((product, index) =>
                            <div key={index} className="col-4 mb-4">
                                <Card product={product} />
                            </div>)
                    }
                </div>
            </Base>
        </div>
    )
}
