import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { App } from './app';
import { CustomerDetails } from './customer-details';


const router = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={App} />
            <Route path='/api/customer/:customerid' component={CustomerDetails} />
        </Route>
    </Router>
);

ReactDOM.render(router, document.querySelector('main'));
