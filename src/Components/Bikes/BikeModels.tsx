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
import type { bikeModelInterface } from './Bikes';

/**
 * List all Bike models.
 *
 * @returns
 */
function BikeModels() {
    const models = useLoaderData() as bikeModelInterface[];
    console.log(models);

    return (
        <div>
            <Typography variant="h3" align="center" color="primary.main" mb="4rem">
                Pyörämallit
            </Typography>

            <Grid
                container
                component={Paper}
                spacing={4}
                flexDirection="row"
                paddingRight="2rem"
                paddingBottom="2rem"
                justifyContent="center"
                minWidth="500px"
                sx={{ color: 'red' }}
            >
                {models.map((model) => {
                    return (
                        <Grid item key={model.id} xs={6} minWidth="500px">
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '0px solid black',
                                    padding: '1rem',
                                }}
                                elevation={0}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 250, height: 210, marginRight: '1rem' }}
                                            image="/br.jpg"
                                            alt="Bike Model"
                                        />
                                        <Button sx={{ width: '10rem', marginTop: '1rem' }}>Muokkaa</Button>
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
                                                    {model.description} Culpa pariatur cillum consectetur elit occaecat.
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
