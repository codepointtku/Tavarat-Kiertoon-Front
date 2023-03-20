import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Button, Paper } from '@mui/material';
import StyledTableCell from './StyledTableCell';

function Storages({ storages }) {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper} align="center" sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Varasto ID </StyledTableCell>
                        <StyledTableCell align="right">Nimi</StyledTableCell>
                        <StyledTableCell align="right">Osoite</StyledTableCell>
                        <StyledTableCell style={{ minWidth: 130 }} align="right">
                            Käyttötila
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {storages.map((storage) => (
                        <TableRow
                            key={storage.id}
                            onClick={() => navigate(`${storage.id}`)}
                            style={{ cursor: 'pointer' }}
                            hover
                        >
                            <TableCell>{storage.id}</TableCell>
                            <TableCell align="right">{storage.name}</TableCell>
                            <TableCell align="right">{storage.address}</TableCell>
                            <TableCell align="right">{storage.in_use ? 'käytössä' : 'ei käytössä'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <h5>
                <Button>
                    <Link to="luo" style={{ color: 'white' }}>
                        Luo varasto
                    </Link>
                </Button>
            </h5>
        </TableContainer>
    );
}

Storages.propTypes = {
    storages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            in_use: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default Storages;
