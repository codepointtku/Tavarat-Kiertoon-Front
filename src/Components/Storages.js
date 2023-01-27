import PropTypes from 'prop-types';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';

function Storages({ storages }) {
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
                            <StyledTableRow>
                                <StyledTableCell>{storage.id}</StyledTableCell>
                                <StyledTableCell align="right">{storage.name}</StyledTableCell>
                                <StyledTableCell align="right">{storage.address}</StyledTableCell>
                                <StyledTableCell align="right">{storage.inUse.toString()}</StyledTableCell>
                            </StyledTableRow>
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
