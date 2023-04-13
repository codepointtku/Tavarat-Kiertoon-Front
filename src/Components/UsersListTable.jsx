import { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    Collapse,
    Box,
    Typography,
    IconButton,
    Grid,
} from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import TablePaginationActions from './TablePaginationActions';
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';

function UsersListTable({ page, rowsPerPage, setUsedParams, users }) {
    const [isOpen, setIsOpen] = useState({});
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (event, newPage) => {
        setUsedParams('page', newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setUsedParams('rows', parseInt(event.target.value, 10));
        setUsedParams('page', 0);
    };

    useEffect(() => {
        if (page > Math.floor(users.length / rowsPerPage)) {
            setUsedParams('page', Math.floor(users.length / rowsPerPage));
        } else if (page < 0) {
            setUsedParams('page', 0);
        }
    }, [page]);

    const checkPermissions = (groups) => {
        const groupCheck = [];
        groups.forEach((group) => {
            groupCheck.push(group.name);
        });
        if (groupCheck.includes('admin_group')) {
            return 'admin';
        }
        if (groupCheck.includes('storage_group')) {
            return 'varasto';
        }
        if (groupCheck.includes('user_group')) {
            return 'käyttäjä';
        }
        if (groupCheck.includes('bicycle_group')) {
            return 'pyörä';
        }
        return 'ei käyttöoikeutta';
    };

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell> </StyledTableCell>
                        <StyledTableCell>Nimi</StyledTableCell>
                        <StyledTableCell align="right">Puhelinnumero</StyledTableCell>
                        <StyledTableCell align="right">Sähköposti</StyledTableCell>
                        <StyledTableCell align="right">Oikeudet</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : users).map(
                        (row) => (
                            <Fragment key={row.id}>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => {
                                                setIsOpen((prev) => ({ ...prev, [row.id]: !isOpen[row.id] }));
                                            }}
                                        >
                                            {isOpen[row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell align="right">{row.phone_number}</StyledTableCell>
                                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                                    <StyledTableCell align="right">{checkPermissions(row.groups)}</StyledTableCell>
                                </StyledTableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={isOpen[row.id]} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Grid container justifyContent="space-between" direction="row">
                                                    <Typography variant="h6">Käyttäjä {row.id}</Typography>
                                                    <Button
                                                        type="button"
                                                        align="right"
                                                        to={`/admin/users/${row.id}`}
                                                        component={Link}
                                                    >
                                                        Muokkaa käyttäjää
                                                    </Button>
                                                </Grid>

                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell component="th" scope="row">
                                                                Käyttäjä ID
                                                            </TableCell>
                                                            <TableCell align="right">Nimi</TableCell>
                                                            <TableCell align="right">Puhelinnumero</TableCell>
                                                            <TableCell align="right">Sähköposti</TableCell>
                                                            <TableCell align="right">Oikeudet</TableCell>
                                                            <TableCell align="right">Viimeisin kirjautuminen</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell component="th" scope="row">
                                                                {row.id}
                                                            </TableCell>
                                                            <TableCell align="right">{row.name}</TableCell>
                                                            <TableCell align="right">{row.phone_number}</TableCell>
                                                            <TableCell align="right">{row.email}</TableCell>
                                                            <TableCell align="right">
                                                                {checkPermissions(row.groups)}
                                                            </TableCell>
                                                            <TableCell align="right">{row.last_login}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        )
                    )}

                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 53 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </StyledTableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            colSpan={3}
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

UsersListTable.propTypes = {
    page: PropTypes.number.isRequired,
    setUsedParams: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            phone_number: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            is_admin: PropTypes.bool,
            is_staff: PropTypes.bool,
            is_superuser: PropTypes.bool,
        })
    ).isRequired,
};

export default UsersListTable;
