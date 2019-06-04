import React from 'react';
import { Link } from 'react-router-dom';
import Fab  from '@material-ui/core/Fab'
import { CalendarToday } from '@material-ui/icons';


const ManagerButton = () => (
    <div>
        <Link to="/manager-view">
            <Fab variant="extended" aria-label="Manager">
                <CalendarToday />
                Manager
            </Fab>
        </Link>
    </div>
)

export default ManagerButton;