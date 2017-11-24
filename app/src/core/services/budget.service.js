import { host } from "./auth.service"

export const currentYear = new Date().getFullYear()

async function getYearlyBalance() {
    const token = localStorage.getItem('authToken')

    const response = await fetch(host + 'plan/' + currentYear, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `bearer ${token}`
        }
    })

    return await response.json()
}

async function getMonthlyBalance(params) {
    const token = localStorage.getItem('authToken')
    const url = `plan/${params.year}/${params.month}`

    const response = await fetch(host + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `bearer ${token}`
        }
    })

    return await response.json()
}

async function addExpense(params) {
    const token = localStorage.getItem('authToken')
    let currentYear = new Date().getYear()
    let currentDate = new Date().getMonth()

    const url = `plan/${currentYear}/${currentDate}/expense`

    const response = await fetch(host + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `bearer ${token}`
        },
        body: JSON.stringify({
            date: Number(params.date),
            amount: Number(params.amount),
            name: params.name,
            category: params.category
        })
    })

    return await response.json()
}

async function saveMonthlyIncomeBudget(payload) {
    const token = localStorage.getItem('authToken')
    let year = payload.year
    let month = payload.month

    const url = `plan/${year}/${month}`

    const response = await fetch(host + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `bearer ${token}`
        },
        body: JSON.stringify({
            budget: Number(payload.budget),
            income: Number(payload.income),
        })
    })

    return await response.json()
}

export { getYearlyBalance, getMonthlyBalance, addExpense, saveMonthlyIncomeBudget}