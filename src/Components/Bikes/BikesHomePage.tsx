import { Box, Paper, Typography } from '@mui/material';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ListIcon from '@mui/icons-material/List';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ViewListIcon from '@mui/icons-material/ViewList';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { Link } from 'react-router-dom';

export default function BikesHomePage() {
    const paperStyle = {
        textDecoration: 'none',
        marginRight: '1rem',
        flex: '1',
        mx: '1rem',
        padding: '2rem',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        backgroundColor: '#FFFFFF', // Add this line to change the background color to pure white
    };
    return (
        <Box display="flex" flexDirection="column" maxWidth="800px" mx="auto">
            <Typography variant="h3" align="center" color="primary.main" mt="2rem" mb="1rem">
                Polkupyörien vuokraus
            </Typography>

            <Box display="flex" justifyContent="space-between" mt="2rem">
                <Paper component={Link} to="kayttajat" sx={paperStyle}>
                    <Box display="flex" alignItems="center">
                        <ViewListIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                        <Typography variant="h5" color="primary.main">
                            Pyöräoikeudet
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt="1rem" color="primary.main">
                        Käyttäjien pyöräoikeuksien muokkaus.
                    </Typography>
                </Paper>
                <Paper component={Link} to="pyoratilaukset" sx={paperStyle}>
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

            <Box display="flex" justifyContent="space-between" mt="2rem">
                <Paper component={Link} to="pyorapaketit" sx={paperStyle}>
                    <Box display="flex" alignItems="center">
                        <BikeScooterIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                        <Typography variant="h5" color="primary.main">
                            Pyöräpaketit
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt="1rem" color="primary.main">
                        Pyöräpakettien muokkaus.
                    </Typography>
                </Paper>
                <Paper component={Link} to="perakarryt" sx={paperStyle}>
                    <Box display="flex" alignItems="center">
                        <RvHookupIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                        <Typography variant="h5" color="primary.main">
                            Peräkärryt
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt="1rem" color="primary.main">
                        Kaikki saatavilla olevat peräkärryt
                    </Typography>
                </Paper>
            </Box>
            <Box display="flex" justifyContent="space-between" m="2rem 0">
                <Paper component={Link} to="pyoralista" sx={paperStyle}>
                    <Box display="flex" alignItems="center">
                        <DirectionsBikeIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                        <Typography variant="h5" color="primary.main">
                            Kaikki Polkupyörät
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt="1rem" color="primary.main">
                        Kaikki saatavilla olevat polkupyörät
                    </Typography>
                </Paper>
                <Paper component={Link} to="pyoramallit" sx={paperStyle}>
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
        </Box>
    );
}
