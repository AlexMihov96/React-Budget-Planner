import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BudgetAction } from "../../core/store/actions/budgetActions/budgetAction"
import { currentYear } from "../../core/services/budget.service"
import { Link } from 'react-router-dom'

export class YearlyBalance extends Component {
    yearlyBalance = []
    date = new Date()
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    componentWillReceiveProps(newProps) {
        if (newProps.data) {
            this.yearlyBalance = Object.keys(newProps.data).map(function (key) {
                return newProps.data[key]
            })
        }
    }

    componentWillMount() {
        this.props.getYearlyBalance()
    }

    render() {
        return (
            <div>
                <div className="col-sm-12">
                    <div className="text-center">
                        <label className="text-format-large">Yearly Balance</label>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="row">
                        {this.yearlyBalance.map((el, i) => (
                            <div key={i} className="col-sm-3 margin-top-10">
                                <div className="card text-format bg-light">
                                    <div className="card-body text-center">
                                        <blockquote className="card-blockquote">
                                            <h2>{this.months[i]}</h2>
                                            <h4>{currentYear}</h4>
                                            <label>Budget:</label>
                                            <input className="form-control" value={el.budget} disabled/>
                                            <label>Balance:</label>
                                            <input className="form-control" value={el.balance} disabled/>
                                            <div className="margin-top-10">
                                                <Link to={`/plan/${currentYear}/${i+1}`}
                                                      className="btn btn-primary text-white">
                                                    Details
                                                </Link>
                                            </div>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return ({
        data: state.budget.yearlyBalance
    })
}

function mapDispatch(dispatch) {
    return {
        getYearlyBalance: () => dispatch(new BudgetAction().getYearlyBalanceAction())
    }
}

export default connect(mapState, mapDispatch)(YearlyBalance)
