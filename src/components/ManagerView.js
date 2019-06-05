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

    // When component mounts, get all shifts from database for table
    componentDidMount() {
        this.getAllShifts();
    }

    // Query database for all scheduled shifts
    getAllShifts = () => {
        axios({
            method: 'GET',
            url: '/manager'
        }).then( response => {
            this.setState({
                shifts: response.data
            })
        }).catch( error => {
            console.log('Error in GET, all shifts', error);
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