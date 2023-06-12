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

import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    // GridToolbar,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';

import TypographyTitle from '../TypographyTitle';

function UsersList() {
    const { count, next, previous, results } = useLoaderData() as Awaited<ReturnType<typeof usersListLoader>>;

    // console.log('pagination next:', next);
    // console.log('pagination previous:', previous);
    // console.log('users list (results):', results);

    const pageSize = 10; // page_size @ BE: 10
    const pageCount = Math.ceil(count! / pageSize);

    const allUsers = results?.map((user: any) => {
        return {
            id: user.id,
            col1: user.email,
            col2: user.username,
            col3: user.phone_number,
            col4: user.id,
            col5: 'nappula',
        };
    });

    const rows: GridRowsProp = allUsers!;
    console.log('rows:', rows);

    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Sähköposti', flex: 2 },
        { field: 'col2', headerName: 'Nimi', flex: 1 },
        { field: 'col3', headerName: 'Puhelinnumero', flex: 1 },
        { field: 'col4', headerName: 'Tunniste', flex: 1 },
        { field: 'col5', headerName: 'Lisätiedot', flex: 1 },
    ];

    const [rowCountState, setRowCountState] = React.useState(pageCount);
    React.useEffect(() => {
        setRowCountState((prevRowCountState) => (pageCount !== undefined ? pageCount : prevRowCountState));
    }, [pageCount, setRowCountState]);

    const GridX = () => {
        return (
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    paginationMode={'server'}
                    // rowCount={pageCount}
                    rowCount={rowCountState}
                    rows={rows}
                    getRowId={(rows) => rows.id}
                    columns={columns}
                    // slots={{ toolbar: GridToolbar }}
                    slots={{
                        toolbar: () => {
                            return (
                                <GridToolbarContainer sx={{ justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                    <GridToolbarQuickFilter />
                                    <GridToolbarColumnsButton />
                                    <GridToolbarFilterButton />
                                    <GridToolbarDensitySelector />
                                    <GridToolbarExport />
                                </GridToolbarContainer>
                            );
                        },
                    }}
                    // checkboxSelection
                    // showColumnVerticalBorder
                    // showCellVerticalBorder
                />
            </div>
        );
    };

    return (
        // <Box id="users-list-component-container">
        <Stack id="components-stack" alignItems="center" width="100%">
            <TypographyTitle text="Kaikki käyttäjät" />
            <div
                id="datagrid-parent"
                style={{ display: 'flex', height: '100%', width: '100%', margin: '1rem 0 1rem 0' }}
            >
                <div style={{ flexGrow: 1 }}>
                    <GridX />
                </div>
            </div>
        </Stack>
        // </Box>

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
