import { GET_YEARLY_BALANCE_SUCCESS, SAVE_MONTLY_INCOME_BUDGET, GET_MONTLY_BALANCE_SUCCESS, ADD_EXPENSE_SUCCESS } from "../action-types"
import { getMonthlyBalance, getYearlyBalance, addExpense, saveMonthlyIncomeBudget } from "../../../services/budget.service"

export class BudgetAction {
    getYearlyBalanceSuccessAction(data) {
        return {
            type: GET_YEARLY_BALANCE_SUCCESS,
            payload: data
        }
    }

    getMonthlyBalanceSuccessAction(data) {
        return {
            type: GET_MONTLY_BALANCE_SUCCESS,
            payload: data
        }
    }

    saveMonthlyIncomeBudgetSuccessAction(payload) {
        return {
            type: SAVE_MONTLY_INCOME_BUDGET,
            payload: payload
        }
    }

    addExpenseSuccessAction(data) {
        return {
            type: ADD_EXPENSE_SUCCESS,
            payload: data
        }
    }


    getYearlyBalanceAction() {
        return (dispatch) => {
            return getYearlyBalance()
                .then(json => {
                    if (json) {
                        dispatch(this.getYearlyBalanceSuccessAction(json))
                    }
                })
        }
    }

    getMonthlyBalanceAction(params) {
        return (dispatch) => {
            return getMonthlyBalance(params)
                .then(json => {
                    if (json) {
                        dispatch(this.getMonthlyBalanceSuccessAction(json))
                    }
                })
        }
    }

    addExpenseAction(payload) {
        return (dispatch) => {
            return addExpense(payload)
                .then(json => {
                    if (json) {
                        dispatch(this.addExpenseSuccessAction(json))
                    }
                })
        }
    }

    saveMonthlyIncomeBudget(payload) {
        return (dispatch) => {
            return saveMonthlyIncomeBudget(payload)
                .then(json => {
                    if (json) {
                        dispatch(this.saveMonthlyIncomeBudgetSuccessAction(json))
                    }
                })
        }
    }
}