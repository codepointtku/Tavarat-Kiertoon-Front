import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import StyledTableCell from './StyledTableCell';

function Storages({ storages }) {
    const navigate = useNavigate();
    return (
        <>
            <h2 align="center">Varastot</h2>
            <TableContainer align="center">
                <Table style={{ width: 300, margin: '20px 0px' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ backgroundColor: 'blue' }}>Varasto ID </StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'blue' }} align="right">
                                Nimi
                            </StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'blue' }} align="right">
                                Osoite
                            </StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'blue' }} align="right">
                                Käytössä
                            </StyledTableCell>
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
        </>
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
