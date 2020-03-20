import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Page from "./Page";
import HomeTableRest from "./HomeTableRest"
import AddUserPage from "./AddUserPage"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={HomeTableRest} />
                    <Route path="/page" exact  component={Page} />
                    <Route path="/adduser" exact  component={AddUserPage} />
                </Switch>
            </Router>
        )
    }
}