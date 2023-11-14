import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Box,
    Stack,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
    OutlinedInput,
} from '@mui/material';

import { useLoaderData } from 'react-router';
import StyledTableCell from '../StyledTableCell';

import type { bikeTrailersLoader } from '../../Router/loaders';

export default function BikeTrailers() {
    const data = useLoaderData() as Awaited<ReturnType<typeof bikeTrailersLoader>>;

    console.log(data)
    return (
        <Box width="100%">
            <Typography variant="h3" align="center" color="primary.main" width="100%" sx={{ margin: '0 0 1rem 0' }}>
                Peräkärryt
            </Typography>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Box width="20%"></Box>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left" width="20%">
                                Tunniste
                            </StyledTableCell>
                            <StyledTableCell align="left" width="15%">
                                Rekisterinumero
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((trailer) => (
                            <TableRow
                                key={trailer.id}
                            >
                                <TableCell align="left">{trailer.id}</TableCell>
                                <TableCell align="left">{trailer.register_number}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {data?.length === 0 && (
                    <Typography variant="h6" align="center" paddingTop="1rem">
                        Ei peräkärryjä
                    </Typography>
                )}
            </TableContainer>
        </Box>
    );
}
