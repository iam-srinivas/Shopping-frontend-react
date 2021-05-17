export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({ ...item, count: 1 })
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}
export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        let temp = cart.filter(data => data._id !== productId)
        localStorage.setItem("cart", JSON.stringify(temp))

    }
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        } else {
            return []
        }

    }
}


export const cartEmpty = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart")
        next()
    }
}