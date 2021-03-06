import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

import DeleteCustomer from './delete-customer';
import AddCustomer from './add-customer';

export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showAddCustomerWindow: false
        };
        this.calculateAge = this.calculateAge.bind(this);
        this.calculateLastContact = this.calculateLastContact.bind(this);
        this.showAddCustomer = this.showAddCustomer.bind(this);
        this.hideAddCustomer = this.hideAddCustomer.bind(this);
        this.getNewCustomerValues = this.getNewCustomerValues.bind(this);
        this.submitNewCustomer = this.submitNewCustomer.bind(this);
    }

    componentDidMount() {

        //if I had used local Storage
        // const cachedCustomers = localStorage.getItem('storedCustomers');
        //
        // if (cachedCustomers) {
        //     this.setState({
        //         customers: JSON.parse(cachedCustomers),
        //     });
        //     return;
        // }
        // else {

        axios.get('/api/overview').then((serverResponse)=> {

            if(serverResponse.data.customers) {
                this.setState({
                    customers: serverResponse.data.customers
                });
                // localStorage.setItem('storedCustomers', JSON.stringify(serverResponse.data.customers));

            } else {
                console.log('Mount error', serverResponse);
            }
        }).catch((e) =>{
            this.setState({
                error: 'Ups! Please try again!'
            });
            console.error(e);
        });
        // }
    }

    calculateAge(dateOfBirth){

        let today = new Date();
        let birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
        {
            age--;
        }
        return age;

    }

    calculateLastContact(lastContactDate){

        let current = Date.now();

        let msPerMinute = 60 * 1000;
        let msPerHour = msPerMinute * 60;
        let msPerDay = msPerHour * 24;
        let msPerMonth = msPerDay * 30;
        let msPerYear = msPerDay * 365;

        let elapsed = current - (Date.parse(lastContactDate));

        if (elapsed < msPerMinute) {
            return Math.round(elapsed/1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour ) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';
        }

        else {
            return Math.round(elapsed/msPerYear ) + ' years ago';
        }
    }

    showAddCustomer(){
        this.setState({
            showAddCustomerWindow: true
        });
    }

    hideAddCustomer(){
        this.setState({
            showAddCustomerWindow: false
        });
    }

    getNewCustomerValues(e) {
        this.setState({
            textareaFirst : e.target.value,
            textareaLast : e.target.value
        });
    }

    submitNewCustomer(){
        let {textareaBio} = this.state;

        axios.post("/customer/add", {
            bio: textareaBio
        }).catch((err)=>{
            this.setState({
                error: 'Ups! Something went wrong!'
            });
            console.log(err);
        });

        this.setState({
            showAddCustomerWindow: false
        });
    }

    render() {

        if(!this.state.customers) {
            return <div>Loading...</div>;
        }
        const children = React.cloneElement(this.props.children, {

            error: this.state.error,
            showAddCustomer: this.showAddCustomer,
            hideAddCustomer: this.hideAddCustomer,
            getNewCustomerValues: this.getNewCustomerValues,
            submitNewCustomer: this.submitNewCustomer,
        });

        const renderCustomers = () => {

            return this.state.customers.map(customer => {
                return (
                    <div className="row">
                        <a href={`/api/customer/${customer.customerid}`} class="col-sm-1">({customer.customerid}) </a>
                        <a href={`/api/customer/${customer.customerid}`} class="col-sm-2">{customer.first} {customer.last}, </a>
                        <span class="col-sm-1">{customer.gender}, </span>

                        <span class="col-sm-1">{this.calculateAge(customer.birthday)}, </span>

                        <span class="col-sm-1">{customer.customerlifetimevalue}, </span>

                        <span class="col-sm-1">{this.calculateLastContact(customer.lastcontact)}</span>

                        <a href={`/api/customer/${customer.customerid}`} className="btn btn-primary btn-sm">EDIT</a>
                        <DeleteCustomer id={customer.customerid}/>
                    </div>
                );
            });
        };

        return (

            <div className="container-fluid">

                <h1>Welcome to this customer overview!</h1>

                {this.state.showAddCustomerWindow && <AddCustomer
                    handleChange = {(e) => this.handleChange(e)}
                    submitNewCustomer={this.submitNewCustomer}
                    showAddCustomer={this.showAddCustomer}
                    hideAddCustomer={this.hideAddCustomer}/>}

                {/* {children} */}

                <div className="row">
                    <div class="col-sm-1">ID</div>
                    <div class="col-sm-2">Name</div>
                    <div class="col-sm-1">Gender</div>
                    <div class="col-sm-2">Age</div>
                    <div class="col-sm-2">Lifetime Value</div>
                    <div class="col-sm-2">Last contact</div>
                    <div class="col-sm-2">Actions</div>
                </div>

                {renderCustomers()}
            </div>
        );
    }
}
