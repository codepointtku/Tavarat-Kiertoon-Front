import { Box, Paper, Typography } from '@mui/material';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import ListIcon from '@mui/icons-material/List';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';

export default function BikesHomePage() {
    return (
        <Box display="flex" flexDirection="column" maxWidth="800px" mx="auto" p="2rem">
            <Typography variant="h3" align="center" color="primary.main" mt="2rem" mb="1rem">
                Polkupyörien vuokraus
            </Typography>

            <Box display="flex" justifyContent="space-between" mt="2rem">
                <Paper
                    component={Link}
                    to="pyoralista"
                    sx={{ textDecoration: 'none', flex: '1', mx: '1rem', padding: '2rem', cursor: 'pointer' }}
                >
                    <Box display="flex" alignItems="center">
                        <ListIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                        <Typography variant="h5" color="primary.main">
                            Kaikki Polkupyörät
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt="1rem" color="primary.main">
                        Kaikki saatavilla olevat polkupyörät
                    </Typography>
                </Paper>

                <Paper
                    component={Link}
                    to="pyoramallit"
                    sx={{ textDecoration: 'none', flex: '1', mx: '1rem', padding: '2rem', cursor: 'pointer' }}
                >
                    <Box display="flex" alignItems="center">
                        <BikeScooterIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                        <Typography variant="h5" color="primary.main">
                            Pyörien mallit
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt="1rem" color="primary.main">
                        Kaikkien saatavilla olevat pyörien mallit
                    </Typography>
                </Paper>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="2rem">
                <Paper
                    component={Link}
                    to="pyorapaketit"
                    sx={{
                        textDecoration: 'none',
                        flex: '1',
                        mx: '1rem',
                        padding: '2rem',
                        mb: '2rem',
                        cursor: 'pointer',
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <ViewListIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                        <Typography variant="h5" color="primary.main">
                            Pyöräpaketit
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt="1rem" color="primary.main">
                        Pyöräpakettien muokkaus.
                    </Typography>
                </Paper>

                <Paper
                    component={Link}
                    to="pyoratilaukset"
                    sx={{
                        textDecoration: 'none',
                        flex: '1',
                        mx: '1rem',
                        mb: '2rem',
                        padding: '2rem',
                        cursor: 'pointer',
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <ScheduleIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                        <Typography variant="h5" color="primary.main">
                            Pyörätilaukset
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt="1rem" color="primary.main">
                        Pyörien varaukset ja toimitukset.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
