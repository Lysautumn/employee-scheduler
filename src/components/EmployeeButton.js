import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab'
import { Face } from '@material-ui/icons';

const style = {
    button: {
        margin: "20px"
    }
}

const EmployeeButton = () => (
    <div>
        <Link to="/employee-view">
            <Fab variant="extended" aria-label="Employee" style={style.button}>
                <Face />
                Employee
            </Fab>
        </Link>
    </div>
)

export default EmployeeButton;