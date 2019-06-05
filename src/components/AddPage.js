import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@material-ui/core';
import Header from './Header/Header';
import ShiftTable from './ShiftTable';

const styles = {
    button: {
        margin: '5px',
    }
}

class AddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: [],
            employees: [],
            selectedEmployee: '',
            showForm: false,
            newStartDate:'',
            newStartTime:'',
            newEndDate:'',
            newEndTime:'',
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

    // Convert dates in state to timestamp for database
    convertDates = (date, time) => {
        let newDate = date + ' ' + time;
        newDate = new Date(newDate);
        newDate.setHours(newDate.getHours() - 5);
        newDate = newDate.toISOString();
        return newDate;
    }

    // Validate no shift overlap, then post new shift to database
    postNewShift = event => {
        event.preventDefault();
        let startTime = this.convertDates(this.state.newStartDate, this.state.newStartTime);
        let endTime = this.convertDates(this.state.newEndDate, this.state.newEndTime);
        let newShiftObject = {
            emp_id: this.state.selectedEmployee,
            start_time: startTime,
            end_time: endTime,
        }
        axios({
            method: 'GET',
            url: '/manager'
        }).then( response => {
            for(let shift of response.data) {
                if(newShiftObject.start_time >= shift.start_time && newShiftObject.start_time <= shift.end_time){
                    alert('Shift start time overlaps another shift, please edit.');
                    return;
                } else if (newShiftObject.end_time >= shift.start_time && newShiftObject.end_time <= shift.end_time) {
                    alert('Shift end time overlaps another shift, please edit.');
                    return;
                }
            }
            axios({
                method: 'POST',
                url: '/manager/new-shift',
                data: newShiftObject
            }).then(response => {
                this.setState({
                    showForm: false,
                    newStartDate:'',
                    newStartTime:'',
                    newEndDate:'',
                    newEndTime:'',
                })
            }).catch(error => {
                console.log('Error in POST:', error);
            })
        }).catch(error => {
            console.log('Error in GET, all shifts', error);
        })

    }

    // Toggle add shift form
    toggleForm = event => {
        event.preventDefault();
        this.setState({
            showForm: !this.state.showForm,
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
                    {this.state.selectedEmployee !== '' ? <Button style={styles.button} variant="contained" onClick={this.toggleForm}>Add Shift</Button> : null}
                </form>
                {this.state.showForm === true ? 
                    <form>
                        <TextField 
                            id="startDate"
                            label="Start Date"
                            placeholder="10/26/2018"
                            value={this.state.newStartDate}
                            onChange={this.handleChangeFor('newStartDate')}
                        />
                        <TextField 
                            id="startTime"
                            label="Start Time (24hr)"
                            placeholder="11:30"
                            value={this.state.newStartTime}
                            onChange={this.handleChangeFor('newStartTime')}

                        />
                        <TextField 
                            id="endDate"
                            label="End Date"
                            placeholder="10/26/2018"
                            value={this.state.newEndDate}
                            onChange={this.handleChangeFor('newEndDate')}

                        />
                        <TextField 
                            id="endTime"
                            label="End Time (24hr)"
                            placeholder="18:00"
                            value={this.state.newEndTime}
                            onChange={this.handleChangeFor('newEndTime')}

                        />
                        <Button style={styles.button} onClick={this.postNewShift} variant="contained">Submit</Button>
                    </form>
                : null}
                <ShiftTable shifts={this.state.shifts} />
            </div>
        )
    }
}


export default AddPage;