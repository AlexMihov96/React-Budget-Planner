import { GET_YEARLY_BALANCE_SUCCESS, GET_MONTLY_BALANCE_SUCCESS, ADD_EXPENSE_SUCCESS, SAVE_MONTLY_INCOME_BUDGET } from '../actions/action-types'

const initialState = {
    yearlyBalance: [],
    monthlyBalance: {},
    expenses: [],
    plan: {}
}

export function budgetReducer(state = initialState, action) {
    switch (action.type) {
        case GET_YEARLY_BALANCE_SUCCESS:
            return Object.assign({}, state, state.yearlyBalance = action.payload)
        case GET_MONTLY_BALANCE_SUCCESS:
            return Object.assign({}, state, state.monthlyBalance = action.payload)
        case ADD_EXPENSE_SUCCESS:
            return Object.assign({}, state, state.expenses.push(action.payload.expense))
        case SAVE_MONTLY_INCOME_BUDGET:
            return Object.assign({}, state, state.plan = action.payload.plan)
        default:
            return state
    }
}