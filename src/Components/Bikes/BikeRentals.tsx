import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Box,
    Stack,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
    OutlinedInput,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useLoaderData } from 'react-router';
import StyledTableCell from '../StyledTableCell';
import type { bikeRentalLoader } from '../../Router/loaders';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { KeyboardArrowDown } from '@mui/icons-material';

function getYearAndMonth(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-indexed months
    return date.toLocaleDateString('FI-fi');
}

export default function BikeRentals() {
    const { results, count } = useLoaderData() as Awaited<ReturnType<typeof bikeRentalLoader>>;
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const statusChoices = ['WAITING', 'ACTIVE', 'FINISHED'];
    const [currentStatusChoices, setCurrentStatusChoices] = useState<string[]>([]);

    useEffect(() => {
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                suodata: currentStatusChoices,
            });
        });
    }, [currentStatusChoices, setSearchParams]);

    function handleOrderingChange(fieldName: string) {
        console.log(fieldName);
        setSearchParams((prevParams) => {
            if (searchParams.get('jarjesta') === fieldName) {
                return createSearchParams({
                    ...Object.fromEntries(prevParams.entries()),
                    jarjesta: `-${fieldName}`,
                });
            }
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                jarjesta: fieldName,
            });
        });
    }

    const handleFilteringChange = (event: SelectChangeEvent<typeof currentStatusChoices>) => {
        const {
            target: { value },
        } = event;
        setCurrentStatusChoices(typeof value === 'string' ? value.split(',') : value);
    };

    const statusTranslate = (value: string) => {
        if (value === 'WAITING') {
            return 'Odottaa';
        }
        if (value === 'ACTIVE') {
            return 'Aktiivinen';
        }
        if (value === 'FINISHED') {
            return 'Päättynyt';
        } else {
            return value;
        }
    };

    return (
        <Box width="100%">
            <Typography variant="h3" align="center" color="primary.main" width="100%" sx={{ margin: '0 0 1rem 0' }}>
                Tilaukset
            </Typography>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Box width="20%">
                    <FormControl sx={{ minWidth: '100%', marginBottom: 2 }}>
                        <InputLabel id="filter-by-state-label">Suodata tila</InputLabel>
                        <Select
                            labelId="filter-by-state-label"
                            id="filter-by-state"
                            value={currentStatusChoices}
                            autoWidth
                            multiple
                            input={<OutlinedInput label="Suodata tila" sx={{}} />}
                            renderValue={(selected) => selected.map((status) => `${statusTranslate(status)} `)}
                            onChange={handleFilteringChange}
                            MenuProps={{ PaperProps: { style: { minWidth: 250 } } }}
                        >
                            {statusChoices?.map((status) => (
                                <MenuItem key={status} value={status}>
                                    <Checkbox checked={currentStatusChoices.indexOf(status) > -1} />
                                    <ListItemText primary={statusTranslate(status)} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                sx={{ ':hover': { opacity: '80%', cursor: 'pointer' } }}
                                align="left"
                                width="10%"
                                onClick={() => handleOrderingChange('id')}
                            >
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography variant="inherit">Tilaus</Typography>
                                    <KeyboardArrowDown />
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ ':hover': { opacity: '80%', cursor: 'pointer' } }}
                                align="left"
                                width="10%"
                                onClick={() => handleOrderingChange('state')}
                            >
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography variant="inherit">Tila</Typography>
                                    <KeyboardArrowDown />
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ ':hover': { opacity: '80%', cursor: 'pointer' } }}
                                align="left"
                                width="10%"
                                onClick={() => handleOrderingChange('start_date')}
                            >
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography variant="inherit">Alkaa</Typography>
                                    <KeyboardArrowDown />
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ ':hover': { opacity: '80%', cursor: 'pointer' } }}
                                align="left"
                                width="10%"
                                onClick={() => handleOrderingChange('end_date')}
                            >
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography variant="inherit">Päättyy</Typography>
                                    <KeyboardArrowDown />
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell align="left" width="20%">
                                Toimitusosoite
                            </StyledTableCell>
                            <StyledTableCell align="center" width="10%">
                                Nouto
                            </StyledTableCell>
                            <StyledTableCell align="left" width="15%">
                                Vastaanottaja
                            </StyledTableCell>
                            <StyledTableCell align="left" width="5%">
                                Puhelinnumero
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results?.map((rental) => (
                            <TableRow
                                key={rental.id}
                                style={{ cursor: 'pointer' }}
                                hover
                                onClick={() => navigate(`/pyorat/pyoravarasto/pyoratilaukset/${rental.id}`)}
                            >
                                <TableCell align="left">{rental.id}</TableCell>
                                <TableCell align="left">{statusTranslate(rental.state)}</TableCell>
                                <TableCell align="left">{getYearAndMonth(rental.start_date)}</TableCell>
                                <TableCell align="left">{getYearAndMonth(rental.end_date)}</TableCell>
                                <TableCell align="left">{rental.delivery_address}</TableCell>
                                <TableCell align="center">{rental.pickup ? 'Kyllä' : 'Ei'}</TableCell>
                                <TableCell align="left">{rental.contact_name}</TableCell>
                                <TableCell align="left">{rental.contact_phone_number}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination count={count} itemsText="Tilauksia" />
            </Box>
        </Box>
    );
}
