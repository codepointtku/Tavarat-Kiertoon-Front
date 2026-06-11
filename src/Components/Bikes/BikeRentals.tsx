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
    TextField,
    IconButton,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useLoaderData } from 'react-router';
import StyledTableCell from '../StyledTableCell';
import type { bikeRentalLoader } from '../../Router/loaders';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { KeyboardArrowDown } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fi } from 'date-fns/locale';

function getYearAndMonth(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-indexed months
    return date.toLocaleDateString('FI-fi');
}

export default function BikeRentals() {
    const { loaderData, bikes } = useLoaderData() as Awaited<ReturnType<typeof bikeRentalLoader>>;
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const statusChoices = ['WAITING', 'ACTIVE', 'FINISHED'];
    const [currentStatusChoices, setCurrentStatusChoices] = useState<string[]>([]);
    const [currentBikeChoice, setCurrentBikeChoice] = useState<number | ''>('');
    const [currentEndDate, setCurrentEndDate] = useState<string>('');
    const [currentStartDate, setCurrentStartDate] = useState<string>('');

    useEffect(() => {
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                pyora: currentBikeChoice !== '' ? currentBikeChoice.toString() : '',
                suodata: currentStatusChoices,
                loppupvm: currentEndDate,
                alkupvm: currentStartDate,
            });
        });
    }, [currentStatusChoices, currentEndDate, currentStartDate, currentBikeChoice, setSearchParams]);

    function handleOrderingChange(fieldName: string) {
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
    const handlefilteringBikeChange = (event: SelectChangeEvent<typeof currentBikeChoice>) => {
        const {
            target: { value },
        } = event;
        setCurrentBikeChoice(value === '' ? '' : Number(value));
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
                <Box width="100%">
                    <FormControl sx={{ minWidth: '20%', marginBottom: 2, marginRight: 2 }}>
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
                    <FormControl sx={{ minWidth: '20%', marginBottom: 2, marginRight: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
                            <DatePicker
                                label="Alkupäivämäärä"
                                value={currentStartDate == '' ? null : new Date(currentStartDate)}
                                onChange={(newValue) => {}}
                                onAccept={(newDate) => {
                                    setCurrentStartDate(new Date(newDate || '').toISOString().split('T')[0]);
                                }}
                                renderInput={(params) => (
                                    <Box sx={{ position: 'relative', display: 'inline-block', width: 'max-content' }}>
                                        <TextField {...params} />
                                        <IconButton
                                            style={{
                                                position: 'absolute',
                                                top: '.5rem',
                                                margin: 'auto',
                                                right: '30px',
                                            }}
                                            onClick={() => setCurrentStartDate('')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                maxDate={currentEndDate ? new Date(currentEndDate) : undefined}
                                views={['month', 'day']}
                                openTo="month"
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ minWidth: '20%', marginBottom: 2, marginRight: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
                            <DatePicker
                                label="Loppupäivämäärä"
                                value={currentEndDate == '' ? null : new Date(currentEndDate)}
                                onChange={(newValue) => {}}
                                onAccept={(newDate) => {
                                    setCurrentEndDate(new Date(newDate || '').toISOString().split('T')[0]);
                                }}
                                renderInput={(params) => (
                                    <Box sx={{ position: 'relative', display: 'inline-block', width: 'max-content' }}>
                                        <TextField {...params} />
                                        <IconButton
                                            style={{
                                                position: 'absolute',
                                                top: '.5rem',
                                                margin: 'auto',
                                                right: '30px',
                                            }}
                                            onClick={() => setCurrentEndDate('')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                minDate={currentStartDate ? new Date(currentStartDate) : undefined}
                                views={['month', 'day']}
                                openTo="month"
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ minWidth: '20%', marginBottom: 2, marginRight: 1 }}>
                        <InputLabel id="filter-by-bike-label">Suodata Pyörä</InputLabel>
                        <Select
                            labelId="filter-by-bike-label"
                            id="filter-by-bike"
                            value={currentBikeChoice}
                            autoWidth
                            input={<OutlinedInput label="Suodata pyörä" sx={{}} />}
                            //renderValue={(selected) => selected.map((bike) => `${bikeTranslate(bike)} `)}
                            onChange={handlefilteringBikeChange}
                            MenuProps={{ PaperProps: { style: { minWidth: 250 } } }}
                        >
                            <MenuItem key={-1} value={''}>
                                Ei suodatusta
                            </MenuItem>
                            {bikes?.map((bike) => (
                                <MenuItem key={bike.id} value={bike.id}>
                                    {bike.name}
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
                            <StyledTableCell align="left" width="20%">
                                Toimipaikka/Lisätieto
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
                        {loaderData.results?.map((rental) => (
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
                                <TableCell align="left" sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                                    {rental.extra_info}
                                </TableCell>
                                {/* <TableCell align="center">{rental.pickup ? 'Kyllä' : 'Ei'}</TableCell> */}
                                <TableCell align="left">{rental.contact_name}</TableCell>
                                <TableCell align="left">{rental.contact_phone_number}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {loaderData.results?.length === 0 && (
                    <Typography variant="h6" align="center" paddingTop="1rem">
                        Valituilla suodattimilla ei löytynyt tilauksia
                    </Typography>
                )}
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination count={loaderData.count} itemsText="Tilauksia" />
            </Box>
        </Box>
    );
}
