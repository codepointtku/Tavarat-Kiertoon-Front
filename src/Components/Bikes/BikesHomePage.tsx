import { Box, ButtonBase, Paper, Typography } from '@mui/material';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import ListIcon from '@mui/icons-material/List';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';

export default function BikesHomePage() {
    return (
        <Box display="flex" flexDirection="column" maxWidth="800px" mx="auto">
            <Typography variant="h3" align="center" color="primary.main" mt="2rem" mb="1rem">
                Polkupyörien vuokraus
            </Typography>

            <Box display="flex" justifyContent="space-between" mt="1rem">
                <Paper sx={{ flex: '1', mx: '1rem', padding: '1rem' }}>
                    <ButtonBase
                        component={Link}
                        to="pyoralista"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'common.white',
                            color: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'common.white',
                            },
                        }}
                    >
                        <ListIcon sx={{ marginRight: '5px' }} />
                        <Typography variant="body1">Kaikki Polkupyörät</Typography>
                    </ButtonBase>
                    <Typography variant="body1" mt="0.5rem">
                        Kaikki saatavilla olevat polkupyörät
                    </Typography>
                </Paper>

                <Paper sx={{ flex: '1', mx: '1rem', padding: '1rem' }}>
                    <ButtonBase
                        component={Link}
                        to="pyoramallit"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'common.white',
                            color: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'common.white',
                            },
                        }}
                    >
                        <BikeScooterIcon sx={{ marginRight: '5px' }} />
                        <Typography variant="body1">Pyörien mallit</Typography>
                    </ButtonBase>
                    <Typography variant="body1" mt="0.5rem">
                        Kaikkien saatavilla olevat pyörien mallit
                    </Typography>
                </Paper>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="1rem">
                <Paper sx={{ flex: '1', mx: '1rem', padding: '1rem', mb: '1rem' }}>
                    <ButtonBase
                        component={Link}
                        to="pyorapaketit"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'common.white',
                            color: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'common.white',
                            },
                        }}
                    >
                        <ViewListIcon sx={{ marginRight: '5px' }} />
                        <Typography variant="body1">Pyöräpaketit</Typography>
                    </ButtonBase>
                    <Typography variant="body1" mt="0.5rem">
                        Pyöräpakettien mukkaus.
                    </Typography>
                </Paper>

                <Paper sx={{ flex: '1', mx: '1rem', mb: '1rem', padding: '1rem' }}>
                    <ButtonBase
                        component={Link}
                        to="pyoratilaukset"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'common.white',
                            color: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'common.white',
                            },
                        }}
                    >
                        <ScheduleIcon sx={{ marginRight: '5px' }} />
                        <Typography variant="body1">Pyörätilaukset</Typography>
                    </ButtonBase>
                    <Typography variant="body1" mt="0.5rem">
                        Pyörien varaukset ja toimitukset.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
