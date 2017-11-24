import { registerReducer, loginReducer } from './authReducer'
import { budgetReducer } from './budget.reducer'

export default {
    register: registerReducer,
    login: loginReducer,
    budget: budgetReducer
}