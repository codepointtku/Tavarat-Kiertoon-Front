import * as React from 'react';

import { useLoaderData } from 'react-router';
// import { Link } from 'react-router-dom';

import type { usersListLoader } from '../../Router/loaders';

import {
    Box,
    Stack,
    // IconButton,
} from '@mui/material';

// import EditIcon from '@mui/icons-material/Edit';

import TypographyTitle from '../TypographyTitle';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

function UsersList() {
    const { count, next, previous, results } = useLoaderData() as Awaited<ReturnType<typeof usersListLoader>>;
    // const data = useLoaderData() as Awaited<ReturnType<typeof usersListLoader>>;
    // console.log(data);

    // console.log('count (kui mont userii kokonaisuuressaa):', count);
    // console.log('pagination next:', next);
    // console.log('pagination previous:', previous);
    // console.log('users list (results):', results);

    const pageSize = 10; // page_size @ BE: 10
    const pageCount = Math.ceil(count! / pageSize);

    const allUsers = results?.map((user: any) => user);

    console.log('allUsers:', allUsers);

    const rows: GridRowsProp = [
        { id: 1, col1: 'Jorma@jee.com', col2: 'Jomppa', col3: '0501231234', col4: '1', col5: 'nappula' },
        { id: 2, col1: 'zeic@jee.com', col2: 'Jake', col3: '0501231234', col4: '1', col5: 'nappula' },
        { id: 3, col1: 'jesse@jee.com', col2: 'Yes ese', col3: '0501231234', col4: '1', col5: 'nappula' },
        { id: 4, col1: 'irma@jee.com', col2: 'Ike', col3: '0501231234', col4: '1', col5: 'nappula' },
        { id: 5, col1: 'pirkko@jee.com', col2: 'Pike', col3: '0501231234', col4: '1', col5: 'nappula' },
    ];

    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Sähköposti', width: 150 },
        { field: 'col2', headerName: 'Nimi', width: 150 },
        { field: 'col3', headerName: 'Puhelinnumero', width: 150 },
        { field: 'col4', headerName: 'Tunniste', width: 150 },
        { field: 'col5', headerName: 'Lisätiedot', width: 150 },
    ];

    const [rowCountState, setRowCountState] = React.useState(pageCount);
    React.useEffect(() => {
        setRowCountState((prevRowCountState) => (pageCount !== undefined ? pageCount : prevRowCountState));
    }, [pageCount, setRowCountState]);

    const GridX = () => {
        return (
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    paginationMode={'server'}
                    // rowCount={pageCount}
                    rowCount={rowCountState}
                    rows={rows}
                    columns={columns}
                    // checkboxSelection
                    density={'comfortable'}
                    showColumnVerticalBorder
                    showCellVerticalBorder
                />
            </div>
        );
    };

    return (
        <Box id="user-list-component-container">
            <Stack alignItems="center">
                <TypographyTitle text="Kaikki käyttäjät" />
                <div style={{ display: 'flex', height: '100%', margin: '1rem 0 1rem 0' }}>
                    <div style={{ flexGrow: 1 }}>
                        <GridX />
                    </div>
                </div>
            </Stack>
        </Box>

        // <TableContainer id="users-list" component={Paper} sx={{ margin: '1rem 0 1rem 0' }}>
        //     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell>Sähköposti</TableCell>
        //                 <TableCell align="right">Nimi</TableCell>
        //                 <TableCell align="right">Puhelinnumero</TableCell>
        //                 <TableCell align="right">Tunniste</TableCell>
        //                 <TableCell align="right">Lisätiedot</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {results?.map((user: any) => (
        //                 <TableRow key={user.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        //                     <TableCell component="th" scope="row">
        //                         {user.email}
        //                     </TableCell>
        //                     <TableCell align="right">{user.first_name}</TableCell>
        //                     <TableCell align="right">{user.phone_number}</TableCell>
        //                     <TableCell align="right">{user.id}</TableCell>
        //                     <TableCell align="right">
        //                         <IconButton component={Link} to={`/admin/kayttajat/${user.id}`}>
        //                             <EditIcon />
        //                         </IconButton>
        //                     </TableCell>
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
        // <Pagination
        //     size="large"
        //     color="primary"
        //     count={pageCount}
        //     page={currentPage}
        //     onChange={handleChange}
        //     showFirstButton
        //     showLastButton
        // />
    );
}

export default UsersList;
