import React from 'react';
import Moment from 'react-moment';
import { Table, TableHead, TableBody, TableCell, TableRow, Paper } from '@material-ui/core';

const ShiftTable = (props) => (
    <div>
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.shifts.map( shift => {
                        return (
                            <TableRow key={shift.id}>
                                <TableCell><Moment format="MM/DD/YYYY hh:mma">{shift.start_time}</Moment></TableCell>
                                <TableCell><Moment format="MM/DD/YYYY hh:mma">{shift.end_time}</Moment></TableCell>
                                <TableCell>{shift.name}</TableCell>
                                <TableCell>{shift.phone}</TableCell>
                                <TableCell>{shift.email}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    </div>
)

export default ShiftTable;