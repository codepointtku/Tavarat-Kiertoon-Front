import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Stack,
    TableRow,
    Typography,
    TextField,
} from '@mui/material';
import { Form, useLoaderData } from 'react-router-dom';
import StyledTableCell from '../StyledTableCell'; // used in Table Header
import { Link, useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

/**
 * interface for a single bike
 */
export interface BikeInterface {
    bike: BikeModelInterface;
    created_at: string;
    frame_number: string;
    id: number;
    number: string;
    package_only: boolean;
    state: string; // "AVAILABLE" | "MAINTENANCE" | "RENTED" | "RETIRED"
    color: number;
}

export interface BikeModelInterface {
    brand: { id: number; name: string };
    color: { id: number; name: string; default: boolean };
    description: string;
    id: number;
    name: string;
    size: { id: number; name: string };
    type: { id: number; name: string };
    picture: { id: number; picture_address: string };
}

export interface SubmitDataInterface {
    bike: number;
    created_at: string;
    frame_number: string;
    id: number;
    number: string;
    package_only: boolean;
    state: string; // "AVAILABLE" | "MAINTENANCE" | "RENTED" | "RETIRED"
}

export interface ColorInterface {
    id: number;
    name: string;
    default: boolean;
}

/**
 * Bikes
 * List all bikes in the database
 *
 * @returns JSX.Element
 */
export default function Bikes() {
    const { loaderData, colors } = useLoaderData() as { loaderData: BikeInterface[]; colors: ColorInterface[] };

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
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

    const onSubmit = (data: any) => {
        setCurrentStatusChoices(typeof data.bike__type == 'string' ? data.bike__type.split(',') : data.bike__type);
    };
    const {
        handleSubmit,
        register,
        reset,
        formState: { isDirty, isValid, errors, isSubmitting },
    } = useForm({
        mode: 'all',
        defaultValues: {
            bike__type: '',
        },
    });

    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" width="100%">
                Kaikki Pyörät
            </Typography>

            <Box width="100%" textAlign="right" marginBottom="1em" marginTop="-2em" marginRight="2em">
                <Button component={Link} to="/pyorat/pyoravarasto/lisaa">
                    Lisää uusi pyörä
                </Button>
            </Box>

            <Box
                component={Form}
                sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', width: '480px' }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    id="bike-type"
                    type="text"
                    label="Suodata tyypin mukaan"
                    fullWidth
                    helperText={errors.bike__type?.message?.toString() || ' '}
                    {...register('bike__type', {})}
                ></TextField>
                <Button type="submit" sx={{ marginLeft: '1rem', width: '180px' }} disabled={isSubmitting}>
                    Suodata
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                sx={{ ':hover': { opacity: '80%', cursor: 'pointer' } }}
                                align="right"
                                onClick={() => handleOrderingChange('number')}
                            >
                                <Stack direction="row" alignItems="right" gap={1}>
                                    <Typography variant="inherit">Numero</Typography>
                                    <KeyboardArrowDown />
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ ':hover': { opacity: '80%', cursor: 'pointer' } }}
                                align="right"
                                onClick={() => handleOrderingChange('bike__type')}
                            >
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography variant="inherit">Tyyppi</Typography>
                                    <KeyboardArrowDown />
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell align="right">Väri</StyledTableCell>
                            <StyledTableCell align="right">
                                <div>Varattu</div>
                                <div>pakettiin</div>
                            </StyledTableCell>
                            <StyledTableCell align="right">Muokkaa</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loaderData?.map((bike, index) => {
                            return (
                                <TableRow
                                    key={bike.id}
                                    sx={{ background: index % 2 ? 'rgba(199, 215, 235, 0.1)' : 'white' }}
                                    hover
                                >
                                    <TableCell align="left">{bike.number}</TableCell>
                                    <TableCell align="left">{bike.bike.name}</TableCell>
                                    <TableCell align="right">
                                        {colors?.find((color) => color.id === bike.color)?.name}
                                    </TableCell>
                                    <TableCell align="right">{bike.package_only ? <CheckIcon /> : ''}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            to={`/pyorat/pyoravarasto/muokkaa/${bike.id}`}
                                            component={Link}
                                            variant="outlined"
                                        >
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
