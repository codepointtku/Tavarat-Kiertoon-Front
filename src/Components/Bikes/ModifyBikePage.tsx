import {
    Box,
    Button,
    Checkbox,
    FormControl,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import type { BikeInterface, BikeModelInterface, ColorInterface } from './Bikes';
import { Form, Link, useSubmit } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import DeleteBikeModal from './DeleteBikeModal';
import { type FieldValues, useForm } from 'react-hook-form';

interface ModifyBikePageInterface {
    createNewBike: boolean;
}

/**
 * ModifyBikePage
 * View that allows user to modify bike info or create a new bike.
 * LoaderData:
 * - bikeData : data for current bike
 * - bikeModelsData[] : list of bike models in database
 * - colors: ColorInterface[] : list of colors for the bike
 *
 * @param createNewBike boolean : true = creates a new bike : false = modifies an existing bike
 * @returns JSX.Element
 */
export default function ModifyBikePage({ createNewBike }: ModifyBikePageInterface) {
    // state to control the Delete confirmation modal
    const [renderDeleteBikeModal, setRenderDeleteBikeModal] = useState(false);

    // get loader data
    const { bikeData, bikeModelsData, colors } = useLoaderData() as {
        bikeData: BikeInterface;
        bikeModelsData: BikeModelInterface[];
        colors: ColorInterface[];
    };

    console.log(bikeData)
    // hook form functions and default values
    const { formState, handleSubmit, register, watch } = useForm({
        mode: 'onTouched',
        defaultValues: {
            bikeModelIdSelect: createNewBike ? '' : bikeData.bike.id,
            bikeFrameNumberTextField: createNewBike ? '' : bikeData.frame_number,
            bikeNumberTextField: createNewBike ? '' : bikeData.number,
            bikeStatusSelect: createNewBike ? 'AVAILABLE' : bikeData.state,
            bikeColorIdSelect: createNewBike ? 1 : bikeData.color.id,
            bikePackageOnlyCheckBox: createNewBike ? false : bikeData.package_only,
        },
    });

    // error messages
    const { errors } = formState;

    // possible statuses for a bike
    const currentBikeStatus = ['AVAILABLE', 'MAINTENANCE', 'RENTED', 'RETIRED'];

    // submit the form data
    const submit = useSubmit();
    const onSubmit = (data: FieldValues) => {
        submit(data, {
            method: createNewBike ? 'post' : 'put',
            action: createNewBike ? `/pyorat/pyoravarasto/lisaa/` : `/pyorat/pyoravarasto/muokkaa/${bikeData.id}`,
        });
    };

    // RENDER
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                {createNewBike ? 'Luo uusi pyörä' : 'Muokkaa pyörän tietoja'}
            </Typography>

            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                {/*
                 * Form area
                 */}
                <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 0.5,
                                marginRight: '2em',
                                minWidth: 500,
                            }}
                        >
                            {/*
                             * Bike Model information
                             */}
                            <Table aria-label="customized table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>Nimi:</TableCell>
                                        <TableCell colSpan={2} align="right">
                                            <TextField
                                                id="change-bike-model"
                                                select
                                                label={createNewBike ? 'Valitse pyörämalli' : 'Vaihda pyörämalli'}
                                                {...register('bikeModelIdSelect', {
                                                    required: 'Pakollinen tieto puuttuu',
                                                })}
                                                value={watch('bikeModelIdSelect')}
                                                fullWidth
                                                inputProps={{ required: false }}
                                                required
                                                color={errors.bikeModelIdSelect ? 'error' : 'primary'}
                                                error={!!errors.bikeModelIdSelect}
                                                helperText={errors.bikeModelIdSelect?.message || ' '}
                                                sx={{ marginBottom: '-1rem' }}
                                            >
                                                {bikeModelsData?.map((bikeModel) => {
                                                    return (
                                                        <MenuItem key={bikeModel.id} value={bikeModel.id}>
                                                            {bikeModel.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                            {/*  */}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Merkki:</TableCell>
                                        <TableCell>
                                            {
                                                bikeModelsData.find(
                                                    (model) => model.id === (watch('bikeModelIdSelect') as number)
                                                )?.brand.name
                                            }
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Tyyppi:</TableCell>
                                        <TableCell>
                                            {
                                                bikeModelsData.find(
                                                    (model) => model.id === (watch('bikeModelIdSelect') as number)
                                                )?.type.name
                                            }
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Koko:</TableCell>
                                        <TableCell>
                                            {
                                                bikeModelsData.find(
                                                    (model) => model.id === (watch('bikeModelIdSelect') as number)
                                                )?.size.name
                                            }
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Kuvaus:</TableCell>
                                        <TableCell colSpan={2}>
                                            {
                                                bikeModelsData.find(
                                                    (model) => model.id === (watch('bikeModelIdSelect') as number)
                                                )?.description
                                            }
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3} sx={{ border: 0 }}></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Väri:</TableCell>
                                        <TableCell colSpan={2} align="right" sx={{ border: 0 }}>
                                            <TextField
                                                id="bike-model-color-name"
                                                select
                                                label="Väri"
                                                {...register('bikeColorIdSelect', {
                                                    required: 'Pakollinen tieto puuttuu',
                                                })}
                                                value={watch('bikeColorIdSelect')}
                                                fullWidth
                                                inputProps={{ required: false }}
                                                required
                                                color={errors.bikeColorIdSelect ? 'error' : 'primary'}
                                                error={!!errors.bikeColorIdSelect}
                                                helperText={errors.bikeColorIdSelect?.message || ' '}
                                                sx={{ marginBottom: '-1rem' }}
                                            >
                                                {colors?.map((color) => {
                                                    return (
                                                        <MenuItem key={color.id} value={color.id}>
                                                            {color.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 0.5,
                                marginLeft: '2em',
                                justifyContent: 'space-between',
                                minWidth: 500,
                            }}
                        >
                            {/*
                             * Bike information
                             */}
                            <Table aria-label="customized table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>Runkonumero:</TableCell>
                                        <TableCell colSpan={3} align="right">
                                            <TextField
                                                label="Muokkaa runkonumeroa"
                                                value={watch('bikeFrameNumberTextField')}
                                                {...register('bikeFrameNumberTextField', {
                                                    required: 'Pakollinen tieto puuttuu',
                                                })}
                                                fullWidth
                                                color={errors.bikeFrameNumberTextField ? 'error' : 'primary'}
                                                error={!!errors.bikeFrameNumberTextField}
                                                helperText={errors.bikeFrameNumberTextField?.message?.toString() || ' '}
                                                required
                                                sx={{ marginBottom: '-1rem' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    {/*
                                     * When editing bike this row is not visible
                                     * Unfortenately field can not be disabled cause the value is still used in form
                                     * When adding new bike this field needs to be shown
                                     */}
                                    {/* <TableRow style={{ display: createNewBike ? '' : 'none' }}> */}
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Numero:</TableCell>
                                        <TableCell colSpan={3} align="right">
                                            <TextField
                                                label="Muokkaa Numeroa"
                                                value={watch('bikeNumberTextField')}
                                                {...register('bikeNumberTextField', {
                                                    required: 'Pakollinen tieto puuttuu',
                                                })}
                                                fullWidth
                                                color={errors.bikeNumberTextField ? 'error' : 'primary'}
                                                error={!!errors.bikeNumberTextField}
                                                helperText={errors.bikeNumberTextField?.message?.toString() || ' '}
                                                required
                                                sx={{ marginBottom: '-1rem' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varattu Pakettiin:</TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            <FormControl>
                                                <Checkbox
                                                    checked={watch('bikePackageOnlyCheckBox')}
                                                    color="primary"
                                                    {...register('bikePackageOnlyCheckBox')}
                                                />
                                            </FormControl>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Tila:</TableCell>
                                        <TableCell sx={{ border: 0 }} align="right">
                                            <TextField
                                                id="bike-status-select"
                                                select
                                                label="Valitse pyörän tila"
                                                {...register('bikeStatusSelect', {
                                                    required: 'Pakollinen tieto puuttuu',
                                                })}
                                                value={watch('bikeStatusSelect')}
                                                fullWidth
                                                inputProps={{ required: false }}
                                                required
                                                color={errors.bikeStatusSelect ? 'error' : 'primary'}
                                                error={!!errors.bikeStatusSelect}
                                                helperText={errors.bikeStatusSelect?.message || ' '}
                                                sx={{ marginBottom: '-1rem' }}
                                            >
                                                {currentBikeStatus?.map((status) => {
                                                    return (
                                                        <MenuItem key={status} value={status}>
                                                            {status}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-evenly"
                        marginTop="20px"
                        paddingTop="20px"
                        borderTop="1px solid lightgray"
                    >
                        <Button to={`/pyorat/pyoravarasto/pyoralista`} component={Link} sx={{ padding: '1rem' }}>
                            Palaa pyörälistaan tallentamatta
                        </Button>
                        {!createNewBike && (
                            <Button color="error" onClick={() => setRenderDeleteBikeModal(true)}>
                                Poista tämä pyörä
                            </Button>
                        )}
                        <Button type="submit" sx={{ padding: '1rem' }}>
                            Tallenna muutokset ja palaa listaan
                        </Button>
                    </Box>
                </Box>
                <DeleteBikeModal
                    renderModal={renderDeleteBikeModal}
                    setRenderModal={setRenderDeleteBikeModal}
                    bikeId={bikeData.id}
                />
            </TableContainer>
        </>
    );
}
