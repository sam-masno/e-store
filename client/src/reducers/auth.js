import { AUTH, SIGNOUT } from 'actions/types';

export default (state = null, action) => {
    switch(action.type) {
        case AUTH:
            return action.payload
        case SIGNOUT:
            return false
        default:
            return state
    }
}