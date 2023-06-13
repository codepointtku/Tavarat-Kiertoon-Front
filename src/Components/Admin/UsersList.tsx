import * as React from 'react';

import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';

import {
    // Box,
    Stack,
    Button,
    Link as MuiLink,
} from '@mui/material';

import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridEventListener,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    GridRenderCellParams,
} from '@mui/x-data-grid';

import TypographyTitle from '../TypographyTitle';

import type { usersListLoader } from '../../Router/loaders';

// interface Column {
//     id: number;
//     col1: string;
//     col2: string;
//     col3: string;
//     col4: number;
//     col5: xxx
// }

// interface User {
//     id: number;
//     email: string;
//     username: string;
//     phone_number: string;
// }

function UsersList() {
    const { count, next, previous, results } = useLoaderData() as Awaited<ReturnType<typeof usersListLoader>>;

    const pageSize = 10; // page_size @ BE: 10
    const pageCount = Math.ceil(count! / pageSize);

    const [rowCountState, setRowCountState] = React.useState(pageCount);
    React.useEffect(() => {
        setRowCountState((prevRowCountState) => (pageCount !== undefined ? pageCount : prevRowCountState));
    }, [pageCount, setRowCountState]);

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Sähköposti', flex: 2 },
        { field: 'username', headerName: 'Nimi', flex: 1 },
        { field: 'phone_number', headerName: 'Puhelinnumero', flex: 1 },
        {
            field: 'id',
            headerName: 'Lisätiedot',
            renderCell: (params) => (
                <Button variant="outlined">
                    <MuiLink component={Link} to={`/admin/kayttajat/${params.value}`}>
                        Avaa
                    </MuiLink>
                </Button>
            ),
        },
    ];

    if (!results) return null;

    const GridX = () => {
        return (
            <div style={{ height: 500 }}>
                <DataGrid
                    paginationMode={'server'}
                    // rowCount={pageCount}
                    rowCount={rowCountState}
                    rows={results}
                    columns={columns}
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
    );
}

export default UsersList;
