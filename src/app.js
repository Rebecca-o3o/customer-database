import React from 'react';
import axios from 'axios';

export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {

        axios.get('/api/overview').then((serverResponse)=> {

            if(serverResponse.data.customers) {
                this.setState({
                    customers: serverResponse.data.customers
                });
            } else {
                console.log('Mount error', serverResponse);
            }
        }).catch((e) =>{
            this.setState({
                error: 'Ups! Please try again!'
            });
            console.error(e);
        })
        ;
    }

    render() {

        if(!this.state.customers) {
            return <div>Loading...</div>;
        }

        const renderCustomers = () => {

            return this.state.customers.map(customer => {
                return (
                    <div>
                        {customer.customerid},
                        {customer.first},
                        {customer.last},
                        {customer.gender},
                        {customer.birthday},
                        {customer.customerlifetimevalue},
                        {customer.lastcontact}
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
