import * as React from 'react';

import { useLoaderData } from 'react-router';
import type { usersListLoader } from '../../Router/loaders';

import {
    Box,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    Stack,
    // Pagination,
    // PaginationItem,
} from '@mui/material';

// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];

function GridX() {
    return (
        <div style={{ height: 300, width: '100%', border: '1px solid blue' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}

function UsersList() {
    const { count, next, previous, results } = useLoaderData() as Awaited<ReturnType<typeof usersListLoader>>;
    // const data = useLoaderData() as Awaited<ReturnType<typeof usersListLoader>>;
    // console.log(data);

    // console.log('count (kui mont userii kokonaisuuressaa):', count);
    // console.log('pagination next:', next);
    // console.log('pagination previous:', previous);
    // console.log('users list (results):', results);

    const page_size = 10; // page_size @ BE: 10
    const pageCount = Math.ceil(count / page_size);

    const [currentPage, setCurrentPage] = React.useState(1);

    console.log('avoin sivu:', currentPage);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Box
            id="user-list-component-container"
            sx={{
                padding: '1rem',
                border: '1px solid red',
            }}
        >
            <Stack alignItems="center">
                <TableContainer id="users-list" component={Paper} sx={{ marginBottom: '1rem' }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sähköposti</TableCell>
                                <TableCell align="right">Nimi</TableCell>
                                <TableCell align="right">Puhelinnumero</TableCell>
                                <TableCell align="right">Tunniste</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((user: any) => (
                                <TableRow key={user.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {user.email}
                                    </TableCell>
                                    <TableCell align="right">{user.first_name}</TableCell>
                                    <TableCell align="right">{user.phone_number}</TableCell>
                                    <TableCell align="right">{user.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <Pagination size="large" color="primary" count={count} showFirstButton showLastButton  /> */}
                {/* <Pagination
                    size="large"
                    color="primary"
                    count={pageCount}
                    page={currentPage}
                    onChange={handleChange}
                    renderItem={(item) => (
                        <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                    )}
                /> */}

                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <GridX />
                    </div>
                </div>
            </Stack>
        </Box>
    );
}

export default UsersList;
