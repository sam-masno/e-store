//FUNCTIONS FOR CART REDUCER
//create a simple deepclone to prevent mutation
const clone = obj => {
    let clone = { ...obj };
    clone.items = [ ...obj.items ];
    return clone
};



// get total of cart after any update and add tax
export const getTotalWithTax = (cart ) => {
    const cartWithTotalAndTax = clone(cart);
    const taxRate = 1.1;
    let total = cart.items.reduce((sum, item) => sum += (item.price * item.count), 0) * taxRate;
    cartWithTotalAndTax.total = Number.parseFloat(total).toFixed(2);
    return cartWithTotalAndTax;

}

// get count after any update and filter out any items with empty count
export const getCount = ( cart ) => {
    const cartWithCount = clone(cart);
    cartWithCount.count = cart.items.reduce(( sum, item ) => sum += item.count, 0);
    return cartWithCount;
}

//set cart to local storage
export const setToStorage = (cart) => {
    localStorage.setItem('e-cart', JSON.stringify(cart));
    return cart;
}

// add a single item to the cart
export const addItem = (item, cart) => {
    // console.log('from add item', newItem, state)
    let addToCart = clone(cart)
    const exists = addToCart.items.filter( product => product._id === item._id )[0]; //check if product is already in addToCart
    if(exists) {
        //increment item if already exists
        addToCart.items = addToCart.items.map(product => product._id === item._id ? {...product, count: product.count + 1} : product); 
        return addToCart
    } 
    else {
        //add product to addToCart.items if not present
        addToCart.items = addToCart.items.concat({ ...item, count: 1});
        return  addToCart
    } 
}

//remove a single item from the cart
export const removeItem = ( item, cart ) => {
    const cartWithoutItem = clone(cart)
    // removeFromCart.items = removeFromCart.items
    cartWithoutItem.items = cart.items
        .map(product => product._id === item ? { ...product, count: product.count -1 } : product )
        .filter(product => product.count > 0 )
    return cartWithoutItem;
} 

export const removeItems = (item, cart) => {
    const cartWithItemsRemoved = clone(cart);
    cartWithItemsRemoved = cart.items.filter(product => product._id !== item );
    return cartWithItemsRemoved;
}


//make base compose
const compose = (first, last) => (...arg) => last(first(...arg));
export const modifyCart = (...fns) => fns.reduce(compose);//add args on call

// ADD FLOW: addItem(item, cart) -> getCount(cart) -> getTotalWithTax(cart) -> setToStorage(cart) -> return cart
//pass args "newItem" "cart"


// REMOVE FLOW: removeItem(item, cart) -> getCount(cart) -> getTotalWithTax(cart) -> setToStorage(cart) -> return cart