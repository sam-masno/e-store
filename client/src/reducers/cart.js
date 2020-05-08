import { SET_ITEMS, ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS, REMOVE_ALL_ITEM } from 'actions/types';
import { getTotalWithTax, getCount, addItem, removeItems, removeItem, setToStorage, modifyCart } from 'reducers/cartFunctions';

const initialState = {
    items: [],
    count: 0,
    total: 0
}

export default (state = initialState, action) => {
    
    switch(action.type) {

        //INCREMENT/ADD PRODUCT TO CART
        case ADD_ITEM: 
            return modifyCart(addItem, getCount, getTotalWithTax, setToStorage)(action.payload, state);

        //DECREMENT PRODUCT IN CART
        case REMOVE_ITEM:
            return modifyCart(removeItem, getCount, getTotalWithTax, setToStorage)(action.payload, state);

        //REMOVE ALL INSTANCES OF A PRODUCT IN CART
        case REMOVE_ALL_ITEM:
            return modifyCart(removeItems, getCount, getTotalWithTax, setToStorage)(action.payload, state);
        
        //CHECK IF 'e-cart' IN LOCAL STORAGE AND SET TO REDUX
        case SET_ITEMS:
            return action.payload;
        //REMOVE ALL ITEMS IN CART
        case CLEAR_ITEMS:
            localStorage.removeItem('e-cart');
            return initialState;

        default: 
            return state;
    }
}

