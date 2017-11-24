import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BudgetAction } from "../../core/store/actions/budgetActions/budgetAction"
import { currentYear } from "../../core/services/budget.service"
import { Link } from 'react-router-dom'

class MonthlyBalance extends Component {
    urlYear = this.props.match.params.year
    urlMonth = this.props.match.params.month
    monthlyBalance = {
        budget: 0,
        expenses: [],
        income: 0
    }
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    constructor(props) {
        super(props)

        this.state = {
            budget: 0,
            income: 0
        }

        if (localStorage.getItem('user') === null) {
            this.props.history.push('/login')
        }

        this.onSave = this.onSave.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data) {
            this.monthlyBalance.budget = newProps.data.budget
            this.monthlyBalance.income = newProps.data.income
            this.monthlyBalance.expenses = newProps.data.expenses
            this.monthlyBalance.budget = newProps.plan.budget
            this.monthlyBalance.income = newProps.plan.income
        }
    }

    componentWillMount() {
        if (localStorage.getItem('user') !== null) {
            this.props.getMonthlyBalance({
                year: this.urlYear,
                month: this.urlMonth
            })
        }
    }

    onValueChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSave(e) {
        e.preventDefault()
        let payload = this.state

        this.props.saveMonthlyIncomeBudget({
            year: this.urlYear,
            month: this.urlMonth,
            budget: payload.budget,
            income: payload.income
        })
    }

    render() {
        return (
            <div>
                <main>
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="text-format-large text-center">Welcome to Budget Planner</h1>
                            </div>
                        </div>

                        <div className="row wrapper ">
                            <div className="col-md-12 ">
                                <div className="card bg-light">
                                    <div className="card-body">
                                        <blockquote className="card-blockquote">
                                            <div className="col-sm-12">
                                                <h2 className="text-format-large text-center">{this.months[this.urlMonth - 1]} {currentYear}</h2>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3 space-top">
                                                    <div className="col-sm-12">
                                                        <h4 className="text-center text-format-large">Planner</h4>
                                                    </div>
                                                    <form>
                                                        <div className="form-group">
                                                            <label className="text-format">Income:</label>
                                                            <input className="form-control" name="income"
                                                                   onChange={this.onValueChange}
                                                                   value={this.state.income}
                                                                   type="number"/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="text-format">Budget:</label>
                                                            <input className="form-control" name="budget"
                                                                   value={this.state.budget}
                                                                   onChange={this.onValueChange}
                                                                   type="number"/>
                                                        </div>
                                                        <input type="submit" className="btn btn-primary"
                                                               onClick={this.onSave}
                                                               value="Save"/>
                                                    </form>
                                                </div>

                                                <div className="col-md-8 space-top">
                                                    <div className="row">
                                                        <h4 className="text-center text-format-large col-md-9 fo">
                                                            Expenses</h4>

                                                        <div className="form-group">
                                                            <Link to={`/add-expense`}
                                                                  className="btn btn-primary text-white">
                                                                Add Expenses
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Category</th>
                                                            <th>Cost</th>
                                                            <th>Payment Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            {this.monthlyBalance.expenses.map((el, i) => (
                                                                <td>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        data: state.budget.monthlyBalance,
        user: state.login.user,
        plan: state.budget.plan
    })
}

function mapDispatchToProps(dispatch) {
    return {
        getMonthlyBalance: (params) => dispatch(new BudgetAction().getMonthlyBalanceAction(params)),
        saveMonthlyIncomeBudget: (payload) => dispatch(new BudgetAction().saveMonthlyIncomeBudget(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyBalance)
