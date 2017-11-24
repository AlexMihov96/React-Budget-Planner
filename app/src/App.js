import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from './components/shared/Header'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/Home'
import { connect } from 'react-redux'
import { logoutAction } from './core/store/actions/authActions/authActions'
import Footer from "./components/shared/Footer"
import NothingFound from "./components/shared/NothingFound"
import YearlyBalance from "./components/budget/YearlyBalance"
import MonthlyBalance from "./components/budget/MonthlyBalance"
import AddExpense from "./components/budget/AddExpense"

class App extends Component {
    user = ""

    constructor(props) {
        super(props)

        this.onLogout = this.onLogout.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.user = newProps.user
    }

    onLogout() {
        this.props.logout()
        this.user = ""
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={this.user} onLogout={this.onLogout}/>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/yearly-balance" component={YearlyBalance}/>
                        <Route path="/plan/:year/:month" component={MonthlyBalance}/>
                        <Route path="/add-expense" component={AddExpense}/>
                        <Route component={NothingFound}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapState(state) {
    return ({
        user: state.login.user
    })
}

function mapDispatch(dispatch) {
    return {
        logout: () => dispatch(logoutAction())
    }
}

export default withRouter(connect(mapState, mapDispatch)(App))