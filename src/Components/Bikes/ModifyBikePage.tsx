import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Form, Link } from 'react-router-dom';
import type { bikeInterface, bikeModelInterface, storageInterface } from './Bikes';
import { useLoaderData } from 'react-router';
import { useState } from 'react';

/**
 * ModifyBikePage
 * View that allows user to modify bike info
 *
 * @returns JSX.Element
 */
export default function ModifyBikePage() {
    // get data for current bike, all bikeModels and all storages
    const { bikeData, bikeModelsData, storagesData } = useLoaderData() as {
        bikeData: bikeInterface;
        bikeModelsData: bikeModelInterface[];
        storagesData: storageInterface[];
    };

    // states
    const [storageState, setStorageState] = useState('');
    const [bikeModelState, setBikeModelState] = useState('');
    const [bikeState, setBikeState] = useState(bikeData);

    // storage change handler: used for selecting the correct storage
    const handleStorageChange = (event: SelectChangeEvent) => {
        const storage = storagesData.find((storage) => storage.id.toString() === event.target.value.toString());
        if (storage) {
            const newBike = {
                ...bikeState,
                storage: storage,
            };
            console.log('### newStorage', newBike.bike.name, newBike.storage.name);
            setBikeState(newBike);
        }
        setStorageState(event.target.value as string);
    };

    // bike model change handler: used for changing the model of the bike
    const handleBikeModelChange = (event: SelectChangeEvent) => {
        const bikeModel = bikeModelsData.find((bikeModel) => bikeModel.id.toString() === event.target.value.toString());
        if (bikeModel) {
            const newBike = {
                ...bikeState,
                bike: bikeModel,
            };
            console.log('### newBikeModel', newBike.bike.name, newBike.storage.name);
            setBikeState(newBike);
        }
        setBikeModelState(event.target.value as string);
    };

    // RENDER
    return (
        <>
            {/* Button to go back to all bikes listing */}
            <Box width="100%" textAlign="right" marginBottom="1em" marginTop="-2em" marginRight="2em">
                <Button to={`/pyorat/pyoravarasto`} component={Link}>
                    Takaisin Pyörät listaukseen
                </Button>
            </Box>
            {/* Heading */}
            <Box component={Paper} width="100%" textAlign="center" marginBottom="20px">
                <h3>
                    Pyörän <i>{bikeData.frame_number}</i> tiedot
                </h3>
            </Box>

            {/* Information area */}
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Box component={Form} sx={{ display: 'flex', flexDirection: 'row' }}>
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
                                    <TableCell>{bikeData.bike.name}</TableCell>
                                    <TableCell align="right">
                                        <FormControl>
                                            <InputLabel id="change-bike-model-label">Vaihda pyörämalli</InputLabel>
                                            <Select
                                                labelId="change-bike-model-label"
                                                id="change-bike-model"
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
                                    <TableCell>{bikeData.bike.brand.name}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tyyppi:</TableCell>
                                    <TableCell>{bikeData.bike.type.name}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Koko:</TableCell>
                                    <TableCell>{bikeData.bike.size.name}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Väri:</TableCell>
                                    <TableCell>{bikeData.bike.color.name}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Kuvaus:</TableCell>
                                    <TableCell colSpan={2} sx={{ border: 0 }}>
                                        {bikeData.bike.description}
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
                                    <TableCell>{bikeData.frame_number}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" sx={{ padding: '15px' }}>
                                            Muokkaa runkonumeroa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varattu Pakettiin:</TableCell>
                                    <TableCell sx={{ border: 0 }}>{bikeData.package_only ? 'Kyllä' : 'Ei'}</TableCell>
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
                                    <TableCell>{bikeData.storage.name}</TableCell>
                                    <TableCell align="right">
                                        <FormControl>
                                            <InputLabel id="change-bike-storage-label">Vaihda varasto</InputLabel>
                                            <Select
                                                labelId="change-bike-storage-label"
                                                id="change-bike-storage"
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
                                    <TableCell sx={{ border: 0 }}>{bikeData.storage.address}</TableCell>
                                    <TableCell sx={{ border: 0 }}></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </TableContainer>
        </>
    );
}
