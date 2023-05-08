import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormGroup,
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
import { Form, Link } from 'react-router-dom';
import type { bikeInterface, bikeModelInterface, storageInterface } from './Bikes';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

interface ModifyBikePageInterface {
    createNewBike: boolean;
}

/**
 * ModifyBikePage
 * View that allows user to modify bike info
 *
 * @returns JSX.Element
 */
export default function ModifyBikePage({ createNewBike }: ModifyBikePageInterface) {
    // get data for current bike, all bikeModels and all storages
    const { bikeData, bikeModelsData, storagesData } = useLoaderData() as {
        bikeData: bikeInterface;
        bikeModelsData: bikeModelInterface[];
        storagesData: storageInterface[];
    };

    // states needed for the form data
    const [storageState, setStorageState] = useState(createNewBike ? '' : bikeData.storage.id.toString());
    const [bikeModelState, setBikeModelState] = useState(createNewBike ? '' : bikeData.bike.id.toString());
    const [bikeState, setBikeState] = useState(bikeData);
    const [frameNumberState, setFrameNumberState] = useState(createNewBike ? '' : bikeData.frame_number);
    const [bikeNumberState, setBikeNumberState] = useState(createNewBike ? '' : bikeData.number);
    const [packageOnly, setPackageOnly] = useState(createNewBike ? false : bikeData.package_only);

    // storage change handler: used for selecting the correct storage
    const handleStorageChange = (event: SelectChangeEvent) => {
        const storage = storagesData.find((storage) => storage.id.toString() === event.target.value.toString());
        if (storage) {
            const newBike = {
                ...bikeState,
                storage: storage,
            };
            setBikeState(newBike);
            setStorageState(newBike.storage.id.toString());
        }
    };

    // bike model change handler: used for changing the model of the bike
    const handleBikeModelChange = (event: SelectChangeEvent) => {
        const bikeModel = bikeModelsData.find((bikeModel) => bikeModel.id.toString() === event.target.value.toString());
        if (bikeModel) {
            const newBike = {
                ...bikeState,
                bike: bikeModel,
            };
            setBikeState(newBike);
            setBikeModelState(newBike.bike.id.toString());
        }
    };

    // handler for frame number text field change
    const handleFrameNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrameNumberState(event.target.value as string);
    };

    // handler for bike number text field change
    // Note! Field is not rendered when modifying the bike but the value is still needed
    const handleBikeNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBikeNumberState(event.target.value as string);
    };

    const handlePackageOnly = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackageOnly(event.target.checked);
    };

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
                    <h3>
                        Pyörän <i>{bikeState.frame_number}</i> tiedot
                    </h3>
                </Box>

                {/*
                 * Form area
                 */}
                <Box
                    component={Form}
                    method={createNewBike ? 'post' : 'put'}
                    action={
                        createNewBike ? `/pyorat/pyoravarasto/lisaa/` : `/pyorat/pyoravarasto/muokkaa/${bikeState.id}`
                    }
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
                                        <TableCell>{bikeState.bike.name}</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
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
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Merkki:</TableCell>
                                        <TableCell>{bikeState.bike.brand?.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Tyyppi:</TableCell>
                                        <TableCell>{bikeState.bike.type?.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Koko:</TableCell>
                                        <TableCell>{bikeState.bike.size?.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Väri:</TableCell>
                                        <TableCell>{bikeState.bike.color?.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Kuvaus:</TableCell>
                                        <TableCell colSpan={2} sx={{ border: 0 }}>
                                            {bikeState.bike.description}
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
                                        <TableCell colSpan={2} align="right">
                                            <TextField
                                                label="Muokkaa runkonumeroa"
                                                name="changeFrameNumber"
                                                value={frameNumberState}
                                                fullWidth
                                                onChange={handleFrameNumberChange}
                                            />
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
                                        <TableCell colSpan={2}>
                                            <TextField
                                                label="Muokkaa Numeroa"
                                                name="changeBikeNumber"
                                                value={bikeNumberState}
                                                fullWidth
                                                onChange={handleBikeNumberChange}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varattu Pakettiin:</TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            {/* {bikeState.package_only ? 'Kyllä' : 'Ei'} */}
                                            <Checkbox
                                                checked={packageOnly}
                                                onChange={handlePackageOnly}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ border: 0 }}></TableCell>
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
                                        <TableCell>{bikeState.storage.name}</TableCell>
                                        <TableCell align="right">
                                            <FormControl>
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
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varaston osoite</TableCell>
                                        <TableCell sx={{ border: 0 }}>{bikeState.storage.address}</TableCell>
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
                        <Button type="submit" sx={{ padding: '20px' }}>
                            Tallenna muutokset ja palaa listaan
                        </Button>
                    </Box>
                </Box>
            </TableContainer>
        </>
    );
}
