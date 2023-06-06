import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Form, Link, useSubmit } from 'react-router-dom';
import type { bikeInterface, bikeModelInterface, storageInterface } from './Bikes';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import DeleteBikeModal from './DeleteBikeModal';
import { type FieldValues, useForm, Controller } from 'react-hook-form';
import { CheckBox } from '@mui/icons-material';

interface ModifyBikePageInterface {
    createNewBike: boolean;
}

/**
 * ModifyBikePage
 * View that allows user to modify bike info or create a new bike.
 * LoaderData:
 * - bikeData : data for current bike
 * - bikeModelsData[] : list of bike models in database
 * - storagesData[] : list of all storage places in database
 *
 * @param createNewBike boolean : true = creates a new bike : false = modifies an existing bike
 * @returns JSX.Element
 */
export default function ModifyBikePage({ createNewBike }: ModifyBikePageInterface) {
    // state to control the Delete confirmation modal
    const [renderDeleteBikeModal, setRenderDeleteBikeModal] = useState(false);

    // get loader data
    const { bikeData, bikeModelsData, storagesData } = useLoaderData() as {
        bikeData: bikeInterface;
        bikeModelsData: bikeModelInterface[];
        storagesData: storageInterface[];
    };

    // hook form functions and default values
    const { control, formState, handleSubmit, register, watch } = useForm({
        mode: 'onTouched',
        defaultValues: {
            bikeModelIdSelect: createNewBike ? '' : bikeData.bike.id,
            bikeStorageIdSelect: createNewBike ? '' : bikeData.storage.id,
            bikeFrameNumberTextField: createNewBike ? '' : bikeData.frame_number,
            bikeNumberTextField: createNewBike ? '' : bikeData.number,
            bikeStatusSelect: createNewBike ? 'AVAILABLE' : bikeData.state,
            bikePackageOnlyCheckBox: createNewBike ? false : bikeData.package_only
        }
    });

    // error messages
    const { errors } = formState;

    // possible statuses for a bike
    const currentBikeStatus = ['AVAILABLE', 'MAINTENANCE', 'RENTED', 'RETIRED'];

    // submit the form data
    // const submit = useSubmit();
    const onSubmit = (data: FieldValues) => {
        console.log('### data', data)

        // submit(
        //     data,
        //     {
        //         method: createNewBike ? 'post' : 'put',
        //         action: createNewBike ? `/pyorat/pyoravarasto/lisaa/` : `/pyorat/pyoravarasto/muokkaa/${bikeData.id}`
        //     }
        // )
    }

// -------------------------------------------------------------------------

    // states needed for the form data
    // const [storageState, setStorageState] = useState(createNewBike ? '' : bikeData.storage.id.toString());
    // const [bikeModelState, setBikeModelState] = useState(createNewBike ? '' : bikeData.bike.id.toString());
    const [bikeState, setBikeState] = useState(bikeData);
    // const [frameNumberState, setFrameNumberState] = useState(createNewBike ? '' : bikeData.frame_number);
    // const [bikeNumberState, setBikeNumberState] = useState(createNewBike ? '' : bikeData.number);
    // const [packageOnly, setPackageOnly] = useState(createNewBike ? false : bikeData.package_only);
    // const [statusState, setStatusState] = useState(createNewBike ? 'AVAILABLE' : bikeData.state);


    // storage change handler: used for selecting the correct storage
    // const handleStorageChange = (event: SelectChangeEvent) => {
    //     const storage = storagesData.find((storage) => storage.id.toString() === event.target.value.toString());
    //     if (storage) {
    //         const newBike = {
    //             ...bikeState,
    //             storage: storage,
    //         };
    //         setBikeState(newBike);
    //         setStorageState(newBike.storage.id.toString());
    //     }
    // };

    // bike model change handler: used for changing the model of the bike
    // const handleBikeModelChange = (event: SelectChangeEvent) => {
    //     const bikeModel = bikeModelsData.find((bikeModel) => bikeModel.id.toString() === event.target.value.toString());
    //     if (bikeModel) {
    //         const newBike = {
    //             ...bikeState,
    //             bike: bikeModel,
    //         };
    //         setBikeState(newBike);
    //         setBikeModelState(newBike.bike.id.toString());
    //     }
    // };

    // handler for frame number text field change
    // const handleFrameNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFrameNumberState(event.target.value as string);
    // };

    // handler for bike number text field change
    // Note! Field is not rendered when modifying the bike but the value is still needed
    // const handleBikeNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setBikeNumberState(event.target.value as string);
    // };

    // handler for package_only tab.
    // JTo: Not completely sure if this is needed here or not
    // const handlePackageOnly = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setPackageOnly(event.target.checked);
    // };

    // const handleStatusChange = (event: SelectChangeEvent) => {
    //     setStatusState(event.target.value);
    // };

    // RENDER
    return (
        <>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                {/* Header */}
                <Box
                    width="100%"
                    textAlign="center"
                    marginBottom="20px"
                    paddingBottom="20px"
                    borderBottom="1px solid lightgray"
                >
                    <h3>{createNewBike ? 'Luo uusi pyörä' : 'Muokkaa pyörän tietoja'}</h3>
                </Box>

                {/*
                 * Form area
                 */}
                <Box
                    component={Form}
                    onSubmit={handleSubmit(onSubmit)}
                    // method={createNewBike ? 'post' : 'put'}
                    // action={
                    //     createNewBike ? `/pyorat/pyoravarasto/lisaa/` : `/pyorat/pyoravarasto/muokkaa/${bikeState.id}`
                    // }
                >
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
                                        <TableCell sx={{ fontWeight: 'bold' }}>Nimi:</TableCell>
                                        {/* <TableCell>{bikeState.bike.name}</TableCell> */}
                                        <TableCell>{bikeModelsData.find(model => model.id === (watch('bikeModelIdSelect') as number) )?.name}</TableCell>
                                        <TableCell align="right">
                                            {/* <FormControl>
                                                <InputLabel id="change-bike-model-label">Vaihda pyörämalli</InputLabel>
                                                <Select
                                                    labelId="change-bike-model-label"
                                                    id="change-bike-model"
                                                    name="changeBikeModel"
                                                    value={bikeModelState}
                                                    label="Vaihda pyörämalli"
                                                    onChange={handleBikeModelChange}
                                                    sx={{ width: '200px' }}
                                                >
                                                    {bikeModelsData.map((bikeModel) => {
                                                        return (
                                                            <MenuItem key={bikeModel.id} value={bikeModel.id}>
                                                                {bikeModel.name}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                            </FormControl> */}
                                            {/*  */}
                                            <TextField
                                                id="change-bike-model"
                                                select
                                                label="Vaihda pyörämalli"
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
                                        {/* <TableCell>{bikeState.bike.brand?.name}</TableCell> */}
                                        <TableCell>{bikeModelsData.find(model => model.id === (watch('bikeModelIdSelect') as number) )?.brand.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Tyyppi:</TableCell>
                                        <TableCell>{bikeModelsData.find(model => model.id === (watch('bikeModelIdSelect') as number) )?.type.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Koko:</TableCell>
                                        <TableCell>{bikeModelsData.find(model => model.id === (watch('bikeModelIdSelect') as number) )?.size.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Väri:</TableCell>
                                        <TableCell>{bikeModelsData.find(model => model.id === (watch('bikeModelIdSelect') as number) )?.color.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Kuvaus:</TableCell>
                                        <TableCell colSpan={2} sx={{ border: 0 }}>
                                            {bikeModelsData.find(model => model.id === (watch('bikeModelIdSelect') as number) )?.description}
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
                                        <TableCell sx={{ fontWeight: 'bold' }}>Runkonumero:</TableCell>
                                        <TableCell colSpan={3} align="right">
                                            {/* <FormControl>
                                                <TextField
                                                    label="Muokkaa runkonumeroa"
                                                    name="changeFrameNumber"
                                                    value={frameNumberState}
                                                    fullWidth
                                                    onChange={handleFrameNumberChange}
                                                />
                                            </FormControl> */}
                                            {/*  */}
                                            <TextField
                                                label="Muokkaa runkonumeroa"
                                                value={watch('bikeFrameNumberTextField')}
                                                {...register('bikeFrameNumberTextField', { required: 'Pakollinen tieto puuttuu' })}
                                                fullWidth
                                                color={errors.bikeFrameNumberTextField ? 'error' : 'primary'}
                                                error={!!errors.bikeFrameNumberTextField}
                                                helperText={errors.bikeFrameNumberTextField?.message?.toString() || ' '}
                                                required
                                                sx={{ marginBottom: '-1rem' }}
                                            />
                                            {/*  */}
                                        </TableCell>
                                    </TableRow>
                                    {/*
                                     * When editing bike this row is not visible
                                     * Unfortenately field can not be disabled cause the value is still used in form
                                     * When adding new bike this field needs to be shown
                                     */}
                                    <TableRow
                                        style={{
                                            display: createNewBike ? '' : 'none',
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: 'bold' }}>Numero:</TableCell>
                                        <TableCell colSpan={3} align="right">
                                            {/* <FormControl>
                                                <TextField
                                                    label="Muokkaa Numeroa"
                                                    name="changeBikeNumber"
                                                    value={bikeNumberState}
                                                    fullWidth
                                                    onChange={handleBikeNumberChange}
                                                />
                                            </FormControl> */}
                                            {/*  */}
                                            <TextField
                                                label="Muokkaa Numeroa"
                                                value={watch('bikeNumberTextField')}
                                                {...register('bikeNumberTextField', { required: 'Pakollinen tieto puuttuu' })}
                                                fullWidth
                                                color={errors.bikeNumberTextField ? 'error' : 'primary'}
                                                error={!!errors.bikeNumberTextField}
                                                helperText={errors.bikeNumberTextField?.message?.toString() || ' '}
                                                required
                                                sx={{ marginBottom: '-1rem' }}
                                            />
                                            {/*  */}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varattu Pakettiin:</TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            {/* {bikeState.package_only ? 'Kyllä' : 'Ei'} */}
                                            {/* <FormControl>
                                                <Checkbox
                                                    checked={packageOnly}
                                                    onChange={handlePackageOnly}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    name="changePackageOnly"
                                                />
                                            </FormControl> */}
                                            {/*  */}
                                            {/* <CheckBox
                                                {...register('bikePackageOnlyCheckBox')}
                                                id='bike-package-only-checkbox'
                                                checked={watch('bikePackageOnlyCheckBox')}
                                            /> */}
                                            {/*  */}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Tila:</TableCell>
                                        <TableCell sx={{ border: 0 }} align="right">
                                            {/* <FormControl>
                                                <InputLabel id="change-bike-status-label">
                                                    Vaihda Pyörän Tilaa
                                                </InputLabel>
                                                <Select
                                                    labelId="change-bike-status-label"
                                                    id="change-bike-status"
                                                    name="changeBikeStatus"
                                                    value={statusState}
                                                    label="Vaihda Pyörän Tilaa"
                                                    onChange={handleStatusChange}
                                                    sx={{ width: '200px' }}
                                                >
                                                    {currentBikeStatus.map((status) => {
                                                        return (
                                                            <MenuItem key={status} value={status}>
                                                                {status}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                            </FormControl> */}
                                            {/*  */}
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
                                            {/*  */}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/*
                             * Bike Storage information
                             */}
                            <Table aria-label="customized table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Varaston nimi:</TableCell>
                                        <TableCell>{storagesData.find(storage => storage.id === (watch('bikeStorageIdSelect') as number) )?.name}</TableCell>

                                        <TableCell align="right">
                                            {/* <FormControl>
                                                <InputLabel id="change-bike-storage-label">Vaihda varasto</InputLabel>
                                                <Select
                                                    labelId="change-bike-storage-label"
                                                    id="change-bike-storage"
                                                    name="changeBikeStorage"
                                                    value={storageState}
                                                    label="Vaihda varasto"
                                                    onChange={handleStorageChange}
                                                    sx={{ width: '200px' }}
                                                >
                                                    {storagesData.map((storage) => {
                                                        return (
                                                            <MenuItem key={storage.id} value={storage.id}>
                                                                {storage.name}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                            </FormControl> */}
                                            {/*  */}
                                            <TextField
                                                id="bike-select-storage-id"
                                                select
                                                label="Vaihda varasto"
                                                {...register('bikeStorageIdSelect', {
                                                    required: 'Pakollinen tieto puuttuu',
                                                })}
                                                value={watch('bikeStorageIdSelect')}
                                                fullWidth
                                                inputProps={{ required: false }}
                                                required
                                                color={errors.bikeStorageIdSelect ? 'error' : 'primary'}
                                                error={!!errors.bikeStorageIdSelect}
                                                helperText={errors.bikeStorageIdSelect?.message || ' '}
                                                sx={{ marginBottom: '-1rem' }}
                                            >
                                                {storagesData?.map((storage) => {
                                                    return (
                                                        <MenuItem key={storage.id} value={storage.id}>
                                                            {storage.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </TextField>
                                            {/*  */}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varaston osoite</TableCell>
                                        <TableCell sx={{ border: 0 }}>{storagesData.find(storage => storage.id === (watch('bikeStorageIdSelect') as number) )?.address}</TableCell>
                                        <TableCell sx={{ border: 0 }}></TableCell>
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
                        <Button to={`/pyorat/pyoravarasto`} component={Link} sx={{ padding: '20px' }}>
                            Palaa pyörälistaan tallentamatta
                        </Button>
                        {!createNewBike && (
                            <Button color="error" onClick={() => setRenderDeleteBikeModal(true)}>
                                Poista tämä pyörä
                            </Button>
                        )}
                        <Button type="submit" sx={{ padding: '20px' }}>
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
