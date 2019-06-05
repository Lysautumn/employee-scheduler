import React from 'react';
import { Link } from 'react-router-dom';
import Home from '@material-ui/icons/Home'
import './Header.css';

const styles = {
    icon: {
        fontSize: '50px',
        color: 'white',
        marginLeft: '10px',
    }
}
const Header = () => (
    <div className="header">
        
        <Link to='/home'><Home style={styles.icon} /></Link>
        <h1>Employee Scheduler</h1>
    </div>
)

export default Header;