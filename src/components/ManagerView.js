import React, { Component } from 'react';
import axios from 'axios';

import ShiftTable from './ShiftTable';

class ManagerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: []
        }
    }

    componentDidMount() {
        this.getAllShifts();
    }

    getAllShifts = () => {
        axios({
            method: 'GET',
            url: '/manager'
        }).then( response => {
            console.log(response);
            this.setState({
                shifts: response.data
            })
        }).catch( error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h1>This is the manager view</h1>
                <ShiftTable shifts={this.state.shifts} />
            </div>
        )
    }
}


export default ManagerView;