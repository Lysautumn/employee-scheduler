import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import Header from './Header/Header';
import ShiftTable from './ShiftTable';

const styles = {
    button: {
        marginTop: '5px',
    }
}

class EmployeeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: [],
            employees: [],
            selectedEmployee: ''
        }
    }

    // When component mounts, populate employee dropdown
    componentDidMount() {
        this.getEmployeeNames();
    }

    // Query database for employee names for dropdown
    getEmployeeNames = () => {
        axios({
            method: 'GET',
            url: '/employee/employee-names'
        }).then( response => {
            this.setState({
                employees: response.data,
            });
        }).catch( error => {
            console.log('Error from GET, employee names', error);
        })
    }

    // Capture selected employee from dropdown
    handleChangeFor = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }

    // When Get Shifts button is clicked, get selected employee's shifts
    getEmployeeShifts = event => {
        event.preventDefault();
        let employeeToGet = this.state.selectedEmployee
        axios({
            method: 'GET',
            url: '/employee/' + employeeToGet,
        }).then( response => {
            this.setState({
                shifts: response.data,
            })
        }).catch( error => {
            console.log('Error from GET, employee shifts', error);
        })
    }

    render() {
        return (
            <div>
                <Header />
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
                    <Button style={styles.button} variant="contained" onClick={this.getEmployeeShifts}>Get Shifts</Button>
                </form>
                <ShiftTable shifts={this.state.shifts} />
            </div>
        )
    }
}


export default EmployeeView;