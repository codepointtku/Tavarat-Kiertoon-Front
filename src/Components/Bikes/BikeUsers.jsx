import { useLoaderData, Link } from 'react-router-dom';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import StyledTableCell from '../StyledTableCell'; // used in Table Header
import CheckIcon from '@mui/icons-material/Check';

// const bikePermissions = (groups) => {
//     const groupNames = groups.map((group) => group.name);
//     console.log(groupNames);
//     if (groupNames.includes('bicycle_admin_group')) {
//         return 'Pyöräylläpitäjä';
//     } else if (groupNames.includes('bicycle_group')) {
//         return 'Pyörätilaaja';
//     } else {
//         return 'Ei pyöräoikeuksia';
//     }
// };

export default function BikeUsers() {
    const userArray = useLoaderData();

    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" width="100%">
                Käyttäjät
            </Typography>

            <Box width="100%" textAlign="right" marginBottom="1em" marginTop="-2em" marginRight="2em">
                <Button component={Link} to="/pyorat/pyoravarasto/lisaa">
                    Lisää uusi pyörä
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Etunimi</StyledTableCell>
                            <StyledTableCell align="right">Sukunimi</StyledTableCell>
                            <StyledTableCell align="right">Aktiivinen</StyledTableCell>
                            <StyledTableCell align="right">Käyttöoikeudet</StyledTableCell>
                            <StyledTableCell align="right">Muokkaa</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userArray?.map((user, index) => {
                            console.log(user);
                            return (
                                <TableRow
                                    key={user.username}
                                    sx={{ background: index % 2 ? 'rgba(199, 215, 235, 0.1)' : 'white' }}
                                    hover
                                >
                                    <TableCell align="right">{user.first_name}</TableCell>
                                    <TableCell align="right">{user.last_name}</TableCell>
                                    <TableCell align="right">{user.is_active ? <CheckIcon /> : ''}</TableCell>
                                    <TableCell align="right">{user.bike_group}</TableCell>
                                    <TableCell align="right">
                                        <Button to={user.id.toString()} component={Link} variant="outlined">
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
