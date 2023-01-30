import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import StyledTableCell from './StyledTableCell';

function Storages({ storages }) {
    const navigate = useNavigate();
    return (
        <TableContainer align="center" sx={{ padding: '2rem' }}>
            <Table style={{ width: 300 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Varasto ID </StyledTableCell>
                        <StyledTableCell align="right">Nimi</StyledTableCell>
                        <StyledTableCell align="right">Osoite</StyledTableCell>
                        <StyledTableCell align="right">Käytössä</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {storages.map((storage) => (
                        <TableRow
                            onClick={() => navigate(`varastot/${storage.id}`)}
                            style={{ cursor: 'pointer' }}
                            hover
                        >
                            <TableCell>{storage.id}</TableCell>
                            <TableCell align="right">{storage.name}</TableCell>
                            <TableCell align="right">{storage.address}</TableCell>
                            <TableCell align="right">{storage.inUse.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

Storages.propTypes = {
    storages: PropTypes.arrayOf(
        PropTypes.objectOf({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            inUse: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default Storages;
