import React from 'react';


export default class AddCustomer extends React.Component{
    constructor (props) {
        super(props);
    }
    render() {

        return (
            <div onClick={this.props.showAddCustomer}>

                <form>
                    <div class="form-row">
                        <div>
                            <label>First</label>
                            <input type="text" placeholder="John"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label>Last</label>
                            <input type="password" placeholder="Doe"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <input type="text" placeholder="m/w"/>
                    </div>

                    <button type="submit" class="btn btn-primary">Send</button>
                </form>

                {this.props.children}
            </div>
        );
    }
}
