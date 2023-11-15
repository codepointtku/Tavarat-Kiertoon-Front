import { useState } from 'react';
import { Form, useSubmit, useLoaderData, useActionData, } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import StyledTableCell from '../StyledTableCell';

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
    Button,
    Container,
    TextField,
} from '@mui/material';

import DeleteBikeTrailerModal from './DeleteBikeTrailerModal';
import type { bikeTrailersLoader } from '../../Router/loaders';
import type { deleteCreateBikeTrailerAction } from '../../Router/actions';

export default function BikeTrailers() {
    const data = useLoaderData() as Awaited<ReturnType<typeof bikeTrailersLoader>>;
    const response = useActionData() as Awaited<ReturnType<typeof deleteCreateBikeTrailerAction>>;
    const [renderDeleteBikeTrailerModal, setRenderDeleteBikeTrailerModal] = useState(false);
    const [deleteModalItem, setDeleteModalItem] = useState({});

    const submit = useSubmit();
    const onSubmit = (data: any) => {
        submit(data, { method: 'post', action: '/pyorat/pyoravarasto/perakarryt' });
        reset({ register_number: '', trailer_type: 1 });
    };

    const { handleSubmit, register, watch, reset, formState: { isDirty, isValid, errors, isSubmitting }, } = useForm({
        defaultValues: {
            register_number: '',
            trailer_type: 1,
        },
    });

    console.log(deleteModalItem)

    console.log(data)
    return (
        <Box width="100%">
            <Typography variant="h3" align="center" color="primary.main" width="100%" sx={{ margin: '0 0 1rem 0' }}>
                Peräkärryt
            </Typography>
            <Container maxWidth="xl" component={Paper}>
                <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                            id="register-number"
                            type="text"
                            label="Rekisterinumero"
                            error={!!errors.register_number}
                            {...register('register_number', {
                            required: {
                                value: true,
                                message: 'Rekisterinumero puuttuu',
                            },
                            }
                            )}
                    >
                    </TextField>
                    <Button
                        type="submit"
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Lisää peräkärry
                    </Button>
                </Box>
                <TableContainer sx={{ padding: '2rem' }} component={Form}
                        onSubmit={handleSubmit(onSubmit)}>
                    <Box width="20%"></Box>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left" width="20%">
                                    Tunniste
                                </StyledTableCell>
                                <StyledTableCell align="left" width="70%">
                                    Rekisterinumero
                                </StyledTableCell>
                                <StyledTableCell align="left" width="10%">
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((trailer) => (
                                <TableRow
                                    key={trailer.id}
                                >
                                    <TableCell align="left">{trailer.id}</TableCell>
                                    <TableCell align="left">{trailer.register_number}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            id="delete-button"
                                            type="button"
                                            color="error"
                                            onClick={() => {setDeleteModalItem(trailer), setRenderDeleteBikeTrailerModal(true)}}
                                        >
                                            Poista
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {data?.length === 0 && (
                        <Typography variant="h6" align="center" paddingTop="1rem">
                            Ei peräkärryjä
                        </Typography>
                    )}
                </TableContainer>
                <DeleteBikeTrailerModal
                    renderModal={renderDeleteBikeTrailerModal}
                    setRenderModal={setRenderDeleteBikeTrailerModal}
                    trailer={deleteModalItem}
                />
            </Container>
        </Box>
    );
}
