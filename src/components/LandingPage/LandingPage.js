import React from 'react';
import './LandingPage.css';
import ManagerButton from '../ManagerButton';
import EmployeeButton from '../EmployeeButton';
import Paper from '@material-ui/core/Paper'

const LandingPage = () => (
    <div>
        <h1>This is the landing page</h1>
        <Paper className="paper">
            <ManagerButton />
            <EmployeeButton />
        </Paper>
    </div>
)

export default LandingPage;