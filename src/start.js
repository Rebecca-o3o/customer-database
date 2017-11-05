import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { Overview } from './overview';
import { CustomerDetails } from './customer-details';


const router = (
    <Router history={hashHistory}>
        <Route path="/" component={Overview}>
            <Route path="/overview" component={Overview} />
            <IndexRoute component={Overview} />
            <Route path='/:customerid' component={CustomerDetails} />
        </Route>
    </Router>
);

ReactDOM.render(router, document.querySelector('main'));
