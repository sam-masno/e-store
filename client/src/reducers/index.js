import { combineReducers } from 'redux';
import auth from 'reducers/auth';
import user from 'reducers/user';
import cart from 'reducers/cart';

export default combineReducers({
    cart,
    auth,
    user
});