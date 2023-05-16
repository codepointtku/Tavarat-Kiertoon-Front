import { Box, Button, Card, CardMedia, Grid, TextField, Typography } from '@mui/material';
import { useLoaderData } from 'react-router';
import type { bikeModelInterface } from './Bikes';
import { Link } from 'react-router-dom';

/**
 * Modify a single Bike Model.
 * Note! This feature is propably rarely (or never) used
 *
 * @returns
 */
function ModifyBikeModelPage() {
    const bikeModel = useLoaderData() as bikeModelInterface;

    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                Muokkaa pyörämallia
            </Typography>

            <Box display="flex" width="100%" alignItems="center" flexDirection="column">
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '0px solid black',
                        padding: '1rem',
                        maxWidth: '1000px',
                        marginBottom: '2rem',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 400, marginRight: '1rem' }}
                            image="/br.jpg"
                            alt="Bike Model"
                        />
                        <Grid container flexDirection="row" spacing={2} paddingTop="1rem">
                            <Grid item xs={6}>
                                <TextField label="Nimi" fullWidth value={bikeModel.name} />
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={6}>
                                <TextField label="Merkki" fullWidth value={bikeModel.brand.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Väri" fullWidth value={bikeModel.color.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Koko" fullWidth value={bikeModel.size.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Tyyppi" fullWidth value={bikeModel.type.name} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Kuvaus" fullWidth value={bikeModel.description} />
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                <Box display="flex" width="100%" justifyContent="center">
                    <Button
                        to="/pyorat/pyoravarasto/pyoramallit"
                        component={Link}
                        sx={{ width: '12rem', padding: '1rem' }}
                    >
                        Palaa Tallentamatta
                    </Button>
                    <Button
                        color="error"
                        onClick={() => console.log('### ModifyBikeModelPage: Painoit POISTA nappia')}
                        sx={{ width: '12rem', marginX: '3rem', padding: '1rem' }}
                    >
                        Poista
                    </Button>
                    <Button
                        onClick={() => console.log('### ModifyBikeModelPage: Painoit TALLENNA JA PALAA nappia')}
                        sx={{ width: '12rem', padding: '1rem' }}
                    >
                        Tallenna ja palaa
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ModifyBikeModelPage;
