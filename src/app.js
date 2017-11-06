import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {

        const cachedCustomers = localStorage.getItem('storedCustomers');

        if (cachedCustomers) {
            this.setState({
                customers: JSON.parse(cachedCustomers),
            });
            return;
        }
        else {

            axios.get('/api/overview').then((serverResponse)=> {

                if(serverResponse.data.customers) {
                    this.setState({
                        customers: serverResponse.data.customers
                    });
                    localStorage.setItem('storedCustomers', JSON.stringify(serverResponse.data.customers));

                } else {
                    console.log('Mount error', serverResponse);
                }
            }).catch((e) =>{
                this.setState({
                    error: 'Ups! Please try again!'
                });
                console.error(e);
            });
        }
    }

    render() {

        if(!this.state.customers) {
            return <div>Loading...</div>;
        }

        const renderCustomers = () => {

            return this.state.customers.map(customer => {
                return (
                    <div>
                        <Link to={`/customer/${customer.customerid}`}>
                            <p>{customer.customerid},{customer.first},{customer.last},{customer.gender}, {customer.birthday},{customer.customerlifetimevalue},{customer.lastcontact}</p>
                        </Link>
                    </div>
                );
            });
        };



        return (

            <div>

                <h1>Welcome to this customer overview!</h1>

                <div>
                    {renderCustomers()}
                </div>

            </div>
        );
    }
}
