import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ShiftTable from '../ShiftTable';
import Header from '../Header/Header';

const style = {
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px',
    },
    link: {
        textDecoration: 'none',
    }
}

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
                <Header />
                <div style={style.buttonContainer}>
                    <Link style={style.link} to="/add"><Button variant="contained">Add New Shift</Button></Link>
                </div>
                <ShiftTable shifts={this.state.shifts} />
            </div>
        )
    }
}


export default ManagerView;