import React from 'react';
import './LandingPage.css';
import ManagerButton from '../ManagerButton';
import EmployeeButton from '../EmployeeButton';
import Paper from '@material-ui/core/Paper';
import Header from '../Header/Header';

const LandingPage = () => (
    <div>
        <Header />
        <Paper className="paper">
            <h2>Select a role:</h2>
            <div className="button-container">
                <ManagerButton />
                <EmployeeButton />
            </div>

        </Paper>
    </div>
)

export default LandingPage;