import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import type { bikeInterface } from './Bikes';
import { useLoaderData } from 'react-router';

/**
 * ModifyBikePage
 * View that allows user to modify bike info
 *
 * @returns JSX.Element
 */
export default function ModifyBikePage() {
    const loaderData = useLoaderData() as bikeInterface;
    console.log('### ModifyBikePage', loaderData);

    return (
        <>
            {/* Button to go back to all bikes listing */}
            <Box width="100%" textAlign="right" marginBottom="1em" marginTop="-2em" marginRight="2em">
                <Button to={`/pyorat/pyoravarasto`} component={Link}>
                    Takaisin Pyörät listaukseen
                </Button>
            </Box>
            {/* Heading */}
            <Box component={Paper} width="100%" textAlign="center" marginBottom="20px">
                <h3>
                    Pyörän <i>{loaderData.frame_number}</i> tiedot
                </h3>
            </Box>
            {/* Bike Model information */}
            <TableContainer component={Paper} sx={{ padding: '2rem', marginBottom: '20px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nimi:</TableCell>
                            <TableCell colSpan={6}>{loaderData.bike.name}</TableCell>
                            <TableCell align="right">
                                <Button>Tähän mallin muokkaus</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Merkki:</TableCell>
                            <TableCell>{loaderData.bike.brand.name}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tyyppi:</TableCell>
                            <TableCell>{loaderData.bike.type.name}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Koko:</TableCell>
                            <TableCell>{loaderData.bike.size.name}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Väri:</TableCell>
                            <TableCell>{loaderData.bike.color.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Kuvaus:</TableCell>
                            <TableCell colSpan={7} sx={{ border: 0 }}>
                                {loaderData.bike.description}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Bike information */}
            <TableContainer component={Paper} sx={{ padding: '2rem', marginBottom: '20px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={8} align="right">
                                <Button>Tähän pyörän muokkaus</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>ID:</TableCell>
                            <TableCell sx={{ border: 0 }}>{loaderData.id}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Tila:</TableCell>
                            <TableCell sx={{ border: 0 }}>{loaderData.state}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varattu Pakettiin:</TableCell>
                            <TableCell sx={{ border: 0 }}>{loaderData.package_only ? 'Kyllä' : 'Ei'}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Runkonumero:</TableCell>
                            <TableCell sx={{ border: 0 }}>{loaderData.frame_number}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Bike Storage information */}
            <TableContainer component={Paper} sx={{ padding: '2rem', marginBottom: '20px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={7}>Varaston tiedot</TableCell>
                            <TableCell align="right">
                                <Button>Tähän varastosiirto / muokkaus</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>ID:</TableCell>
                            <TableCell sx={{ border: 0 }}>{loaderData.storage.id}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Käytössä:</TableCell>
                            <TableCell sx={{ border: 0 }}>{loaderData.storage.in_use ? 'Kyllä' : 'Ei'}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varaston nimi:</TableCell>
                            <TableCell sx={{ border: 0 }}>{loaderData.storage.name}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varaston osoite</TableCell>
                            <TableCell sx={{ border: 0 }}>{loaderData.storage.address}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
