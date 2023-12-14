import { useLoaderData, Link, useSearchParams, Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
    TextField,
    IconButton,
} from '@mui/material';
import StyledTableCell from '../StyledTableCell'; // used in Table Header
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from '../Pagination';

export const bikeGroupNames = {
    bicycle_admin_group: 'Pyöräylläpitäjä',
    bicycle_group: 'Pyörätilaaja',
    no_bicycle_group: 'Ei pyöräoikeuksia',
};

export default function BikeUsers() {
    const { count, results: userArray } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(userArray);
    const { register, handleSubmit } = useForm({
        defaultValues: { searchString: searchParams.get('viivakoodi') },
    });
    const handleEmailSearch = (formData) => {
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                viivakoodi: formData.searchString,
                sivu: '1',
            });
        });
    };
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" width="100%">
                Käyttäjät
            </Typography>
            <Form onSubmit={handleSubmit(handleEmailSearch)}>
                <TextField
                    type="search"
                    {...register('searchString')}
                    placeholder="Sähköpostihaku"
                    sx={{ backgroundColor: 'white' }}
                    size="medium"
                >
                    <IconButton children={<ClearIcon />} />
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginLeft: 1, padding: 1.5 }}
                >
                    Hae
                </Button>
            </Form>
            <Box width="100%" textAlign="right" marginBottom="1em" marginTop="-2em" marginRight="2em">
                <Button component={Link} to="/pyorat/pyoravarasto/lisaa">
                    Lisää uusi pyörä
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Sähköposti</StyledTableCell>
                            <StyledTableCell align="right">Etunimi</StyledTableCell>
                            <StyledTableCell align="right">Sukunimi</StyledTableCell>
                            <StyledTableCell align="right">Puhelinnumero</StyledTableCell>
                            <StyledTableCell align="right">Aktiivinen</StyledTableCell>
                            <StyledTableCell align="right">Käyttöoikeudet</StyledTableCell>
                            <StyledTableCell align="right">Muokkaa</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userArray?.map((user, index) => {
                            return (
                                <TableRow
                                    key={user.username}
                                    sx={{ background: index % 2 ? 'rgba(199, 215, 235, 0.1)' : 'white' }}
                                    hover
                                >
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.first_name}</TableCell>
                                    <TableCell align="right">{user.last_name}</TableCell>
                                    <TableCell align="right">{user.phone_number}</TableCell>
                                    <TableCell align="right">{user.is_active ? <CheckIcon /> : ''}</TableCell>
                                    <TableCell align="right">{bikeGroupNames[user.bike_group]}</TableCell>
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
            <Pagination count={count} itemsText="Käyttäjiä" />
        </>
    );
}
