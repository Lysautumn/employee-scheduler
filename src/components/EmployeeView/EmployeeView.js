import React, { Component } from 'react';
import axios from 'axios';
import './EmployeeView.css';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import ShiftTable from '../ShiftTable';

class EmployeeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: [],
            employees: [],
            selectedEmployee: ''
        }
    }

    componentDidMount() {
        this.getEmployeeNames();
    }

    getEmployeeNames = () => {
        axios({
            method: 'GET',
            url: '/employee/employee-names'
        }).then( response => {
            console.log(response);
            this.setState({
                employees: response.data,
            })
        }).catch( error => {
            console.log(error)
        })
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }

    getEmployeeShifts = () => {
        axios({
            method: 'GET',
            url: '/manager'
        }).then( response => {
            console.log(response);
            this.setState({
                shifts: response.data,
            })
        }).catch( error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h1>This is the employee view</h1>
                <form>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="employees">Employees</InputLabel>
                        <Select value={this.state.selectedEmployee} onChange={this.handleChangeFor('selectedEmployee')} inputProps={{
                            name: 'Employee',
                            id: 'employee'
                        }}>
                            {this.state.employees.map( employee => {
                                return(<MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </form>
                <ShiftTable shifts={this.state.shifts} />
            </div>
        )
    }
}


export default EmployeeView;