import { USER, SIGNOUT } from 'actions/types';

const defaultState = {
    name:'',
    email:'',
    about: '',
    role: 0
}
export default (state = defaultState, action) => {
    switch(action.type) {
        case USER:
            return action.payload || defaultState
        case SIGNOUT:
            return defaultState
        default: 
            return state
    }
}