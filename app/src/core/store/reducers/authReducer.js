import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, LOGOUT_SUCCESS } from '../actions/action-types'

const initState = {
    success: false,
    user: ""
}

export function registerReducer(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {success: true})
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {user: action.payload.user})
        case REDIRECTED:
            return Object.assign({}, state, {success: false})
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {user: ""})
        default:
            return state
    }
}

export function loginReducer(state = initState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {success: true, user: action.payload.user})
        case REDIRECTED:
            return Object.assign({}, state, {success: false})
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {user: ""})
        default:
            return state
    }
}