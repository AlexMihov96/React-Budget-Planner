import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BudgetAction } from "../../core/store/actions/budgetActions/budgetAction"
import { currentYear } from "../../core/services/budget.service"
import { Link } from 'react-router-dom'

class AddExpense extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paymentDate: '',
            name: '',
            category: '',
            cost: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data) {

            this.yearlyBalance = Object.keys(newProps.data).map(function (key) {
                return newProps.data[key]
            })
        }
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler(e) {
        e.preventDefault()

        this.props.addExpenseToDispatch({
            name: this.state.name,
            category: this.state.category,
            amount: this.state.cost,
            date: this.state.paymentDate,
            year: currentYear,
        })
    }

    render() {
        return (
            <div>
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Add Expenses</h1>
                        <h3>November 2017</h3>
                    </div>
                </div>
                <div className="row wrapper">
                    <div className="col-md-12 bg-light text-format">
                        <form onSubmit={this.onSubmitHandler}>
                            <legend>Add a new expense</legend>
                            <div className="form-group">
                                <label className="">Name:</label>
                                <input className="form-control" name="name" type="text" onChange={this.onChangeHandler}/>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2">Category:</label>
                                <select className="pl-2 form-control" name="category" onChange={this.onChangeHandler}>
                                    <option>Non-essential</option>
                                    <option>Fixed</option>
                                    <option>Variable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2">Cost:</label>
                                <input className="form-control" name="cost" type="number" onChange={this.onChangeHandler}/>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2">Payment Date:</label>
                                <input className="form-control" name="paymentDate" type="text"
                                       onChange={this.onChangeHandler}/>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Add"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        data: state.budget.expenses
    }
}

function mapDispatch(dispatch) {
    return {
        addExpenseToDispatch: (payload) => dispatch(new BudgetAction().addExpenseAction(payload)),
    }
}

export default connect(mapState, mapDispatch)(AddExpense)