import {
    Box,
    Button,
    Card,
    CardMedia,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import { useLoaderData } from 'react-router';
import type { BikeModelInterface } from './Bikes';
import { Link } from 'react-router-dom';

/**
 * List all Bike models.
 *
 * @returns
 */
function BikeModels() {
    const models = useLoaderData() as BikeModelInterface[];

    return (
        <div>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem">
                Pyörämallit
            </Typography>

            <Box width="100%" textAlign="right" marginBottom="1em" marginTop="-4em" marginRight="2em">
                <Button component={Link} to="/pyorat/pyoravarasto/lisaapyoramalli/">
                    Lisää uusi pyörämalli
                </Button>
            </Box>

            <Grid
                container
                spacing={4}
                flexDirection="row"
                paddingBottom="2rem"
                // justifyContent="center"
                justifyContent="left"
                minWidth="500px"
                sx={{ color: 'red' }}
            >
                {models.map((model) => {
                    return (
                        <Grid item key={model.id} xs={6} minWidth="500px">
                            <Card
                                component={Paper}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '0px solid black',
                                    padding: '1rem',
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 400,
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="175"
                                            sx={{ objectFit: 'contain' }}
                                            // image="/bike.jpg"
                                            image={`${window.location.protocol}//${window.location.hostname}:8000/media/${model.picture.picture_address}`} // TODO: Fix pic path
                                            alt="Bike Model"
                                        />
                                        <Button
                                            to={`/pyorat/pyoravarasto/muokkaapyoramalli/${model.id}`}
                                            component={Link}
                                            sx={{ width: '10rem', marginTop: '1rem' }}
                                            variant="outlined"
                                        >
                                            Muokkaa
                                        </Button>
                                    </Box>
                                    <Table size="small">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Nimi:</TableCell>
                                                <TableCell colSpan={3}>{model.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Merkki:</TableCell>
                                                <TableCell>{model.brand.name}</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Tyyppi:</TableCell>
                                                <TableCell>{model.type.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Väri:</TableCell>
                                                <TableCell>{model.color.name}</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Koko:</TableCell>
                                                <TableCell>{model.size.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Kuvaus:</TableCell>
                                                <TableCell colSpan={3} sx={{ border: 0 }}>
                                                    {model.description}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default BikeModels;
