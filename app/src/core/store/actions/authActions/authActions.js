import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, LOGOUT_SUCCESS } from '../action-types'
import { login, register } from '../../../services/auth.service'

function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    }
}

function loginSuccess(payload) {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export function redirect() {
    return {
        type: REDIRECTED
    }
}

function registerAction(name, email, password) {
    return (dispatch) => {
        return register(name, email, password)
            .then(json => {
                if (json.success) {
                    dispatch(registerSuccess())
                }
            })
    }
}

function loginAction(email, password) {
    return (dispatch) => {
        return login(email, password)
            .then(json => {
                localStorage.setItem('authToken', json.token)
                localStorage.setItem('user', json.user.name)
                dispatch(loginSuccess({user: json.user.name}))
            })
    }
}

function logoutAction() {
    return (dispatch) => {
        localStorage.clear()
        dispatch(logoutSuccess())
    }
}

export { registerAction, loginAction, logoutAction }