import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import ListIcon from '@mui/icons-material/List';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function BikesHomePage() {
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                Polkupyörien vuokraus
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Button
                                    component={Link}
                                    to="pyoralista"
                                    sx={{
                                        bgcolor: 'common.white',
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'common.white',
                                        },
                                    }}
                                >
                                    <ListIcon sx={{ marginRight: '5px' }} />
                                    Kaikki Polkupyörät
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">Kaikki saatavilla olevat polkupyörät</Typography>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <Button
                                    component={Link}
                                    to="pyoramallit"
                                    sx={{
                                        bgcolor: 'common.white',
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'common.white',
                                        },
                                    }}
                                >
                                    <BikeScooterIcon sx={{ marginRight: '5px' }} />
                                    Pyörien mallit
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">Kaikkien saatavilla olevat pyörien mallit</Typography>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <Button
                                    component={Link}
                                    to="pyoratilaukset"
                                    sx={{
                                        bgcolor: 'common.white',
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'common.white',
                                        },
                                    }}
                                >
                                    <ScheduleIcon sx={{ marginRight: '5px' }} />
                                    Pyörätilaukset
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">Pyörien varaukset ja toimitukset.</Typography>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <Button
                                    component={Link}
                                    to="pyorapaketit"
                                    sx={{
                                        bgcolor: 'common.white',
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'common.white',
                                        },
                                    }}
                                >
                                    <ViewListIcon sx={{ marginRight: '5px' }} />
                                    Pyöräpaketit
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">Pyöräpakettien mukkaus.</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
