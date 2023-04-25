import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useLoaderData } from 'react-router';
import StyledTableCell from '../StyledTableCell'; // used in Table Header
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

/**
 * interface for a single bike
 */
export interface bikeInterface {
    bike: bikeModelInterface;
    created_at: string;
    frame_number: string;
    id: number;
    number: string;
    package_only: boolean;
    state: string; // "AVAILABLE" | "MAINTENANCE" | "RENTED" | "RETIRED"
    storage: storageInterface;
}

export interface bikeModelInterface {
    brand: { id: number; name: string };
    color: { id: number; name: string };
    description: string;
    id: number;
    name: string;
    size: { id: number; name: string };
    type: { id: number; name: string };
}

export interface storageInterface {
    address: string;
    id: number;
    in_use: boolean;
    name: string;
}

/**
 * Bikes
 * List all bikes in the database
 *
 * @returns JSX.Element
 */
export default function Bikes() {
    const loaderData = useLoaderData() as bikeInterface[];

    return (
        <>
            <Box width="100%" textAlign="right" marginBottom="1em" marginTop="-2em" marginRight="2em">
                <Button
                    onClick={() => {
                        console.log(`Lisää uusi pyörä`);
                    }}
                >
                    Lisää uusi pyörä
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Merkki</StyledTableCell>
                            <StyledTableCell align="right">Koko</StyledTableCell>
                            <StyledTableCell align="right">Tyyppi</StyledTableCell>
                            <StyledTableCell align="right">Väri</StyledTableCell>
                            <StyledTableCell align="right">
                                <div>Varattu</div>
                                <div>pakettiin</div>
                            </StyledTableCell>
                            <StyledTableCell align="right" width="30%">
                                Runkonumero
                            </StyledTableCell>
                            <StyledTableCell align="right" width="10%">
                                Muokkaa
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loaderData?.map((bike, index) => {
                            return (
                                <TableRow
                                    key={bike.id}
                                    sx={{ background: index % 2 ? 'rgba(199, 215, 235, 0.1)' : 'white' }}
                                    hover
                                >
                                    <TableCell align="right">{bike.bike.brand.name}</TableCell>
                                    <TableCell align="right">{bike.bike.size.name}</TableCell>
                                    <TableCell align="right">{bike.bike.type.name}</TableCell>
                                    <TableCell align="right">{bike.bike.color.name}</TableCell>
                                    <TableCell align="right">{bike.package_only ? <CheckIcon /> : ''}</TableCell>
                                    <TableCell align="right">{bike.frame_number}</TableCell>
                                    <TableCell align="right">
                                        <Button to={`/pyorat/pyoravarasto/muokkaa/${bike.id}`} component={Link}>
                                            Muokkaa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
