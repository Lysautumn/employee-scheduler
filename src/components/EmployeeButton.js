import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab'
import { Face } from '@material-ui/icons';

const style = {
    button: {
        margin: '20px',
    },
    link: {
        textDecoration: 'none',
    }
}

const EmployeeButton = () => (
    <div>
        <Link style={style.link} to="/employee-view">
            <Fab variant="extended" aria-label="Employee" style={style.button}>
                <Face />
                Employee
            </Fab>
        </Link>
    </div>
)

export default EmployeeButton;