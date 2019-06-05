import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab'
import { CalendarToday } from '@material-ui/icons';

const style = {
    button: {
        margin: "20px",
    },
    link: {
        textDecoration: 'none',
    }
}

const ManagerButton = () => (
    <div>
        <Link style={style.link} to="/manager-view">
            <Fab variant="extended" aria-label="Manager" style={style.button}>
                <CalendarToday />
                Manager
            </Fab>
        </Link>
    </div>
)

export default ManagerButton;