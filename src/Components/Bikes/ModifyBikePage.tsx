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
    // console.log('### ModifyBikePage', loaderData)

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

            {/* Option B */}
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {/* Bike Model information */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 0.5, marginRight: '2em' }}>
                        <Table sx={{ minWidth: 300 }} aria-label="customized table">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Nimi:</TableCell>
                                    <TableCell>{loaderData.bike.name}</TableCell>
                                    <TableCell align="right">
                                        <Button>Vaihda pyörän malli</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Merkki:</TableCell>
                                    <TableCell>{loaderData.bike.brand.name}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tyyppi:</TableCell>
                                    <TableCell>{loaderData.bike.type.name}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Koko:</TableCell>
                                    <TableCell>{loaderData.bike.size.name}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Väri:</TableCell>
                                    <TableCell>{loaderData.bike.color.name}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Kuvaus:</TableCell>
                                    <TableCell colSpan={2} sx={{ border: 0 }}>
                                        {loaderData.bike.description}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 0.5,
                            marginLeft: '2em',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Table sx={{ minWidth: 300 }} aria-label="customized table">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Runkonumero:</TableCell>
                                    <TableCell>{loaderData.frame_number}</TableCell>
                                    <TableCell align="right">
                                        <Button>Muokkaa runkonumeroa</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varattu Pakettiin:</TableCell>
                                    <TableCell sx={{ border: 0 }}>{loaderData.package_only ? 'Kyllä' : 'Ei'}</TableCell>
                                    <TableCell sx={{ border: 0 }}></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* Bike Storage information */}
                        <Table sx={{ minWidth: 300 }} aria-label="customized table">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Varaston nimi:</TableCell>
                                    <TableCell>{loaderData.storage.name}</TableCell>
                                    <TableCell align="right">
                                        <Button>Vaihda varastoa</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varaston osoite</TableCell>
                                    <TableCell sx={{ border: 0 }}>{loaderData.storage.address}</TableCell>
                                    <TableCell sx={{ border: 0 }}></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </TableContainer>
        </>
    );
}
