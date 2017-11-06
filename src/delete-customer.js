import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

export default class DeleteCustomer extends React.Component{
    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        var customerid = this.props.id;

        axios.post('/api/customer/delete', {customerid}).then((serverResponse) => {
            location.replace("/");
        }).catch((err)=>{
            this.setState({
                error: 'Ups! Something went wrong! Please try again!'
            });
            console.log(err);
        });
    }


    render() {

        return (

            <div>
                <button
                    onClick={this.delete}
                >DELETE</button>
            </div>
        );
    }
}
