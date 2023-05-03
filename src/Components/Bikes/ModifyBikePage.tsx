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
    TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Form, Link, redirect, useActionData, useNavigate, useNavigation, useSubmit } from 'react-router-dom';
import type { bikeInterface, bikeModelInterface, storageInterface } from './Bikes';
import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type } from '@testing-library/user-event/dist/type';

// interface submitDataInterface {
//     bike: number;
//     created_at: string;
//     frame_number: string;
//     id: number;
//     number: string;
//     package_only: boolean;
//     state: string; // "AVAILABLE" | "MAINTENANCE" | "RENTED" | "RETIRED"
//     storage: number;
// }

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
    const [frameNumberState, setFrameNumberState] = useState(bikeData.frame_number);

    // storage change handler: used for selecting the correct storage
    const handleStorageChange = (event: SelectChangeEvent) => {
        const storage = storagesData.find((storage) => storage.id.toString() === event.target.value.toString());
        if (storage) {
            const newBike = {
                ...bikeState,
                storage: storage,
            };
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
            setBikeState(newBike);
        }
        setBikeModelState(event.target.value as string);
    };

    // handler for frame number text field change
    const handleFrameNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrameNumberState(event.target.value as string);
    };

    // Form submitting
    // const navigate = useNavigate();
    // const submit = useSubmit();
    // const submitHandler = async () => {
    // only id is used from bike and storage
    // const submitData = {
    //     ...bikeState,
    //     bike: bikeState.bike.id,
    //     storage: bikeState.storage.id,
    //     frame_number: frameNumberState,
    // };

    // console.log('### BlaaBlaa', submitData);

    // send
    // await submit(submitData, {
    //     method: 'put',
    //     action: `/pyorat/pyoravarasto/muokkaa/${bikeState.id}`,
    // });

    // redirect to list page
    // navigate('/pyorat/pyoravarasto');
    // setTimeout(() => {
    //     navigate('/pyorat/pyoravarasto');
    // }, 1);
    // };

    // const actionData = useActionData();
    // useEffect(() => {
    //     if (actionData) {
    //         navigate('/pyorat/pyoravarasto');
    //     }
    // }, [actionData]);

    // https://react-hook-form.com/api/useform/register/
    type FormValues = {
        firstName: string;
        lastName: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
        },
    });

    console.log('errors', errors);

    register('firstName', { required: true });
    register('lastName', { maxLength: 25 });

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

                {/* Information area */}
                <Box
                    component={Form}
                    // method="put"
                    // action={`/pyorat/pyoravarasto/muokkaa/${bikeState.id}`}
                    // onSubmit={submitHandler}
                    onSubmit={handleSubmit((data) => console.log(data))}
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
                                        <TableCell>{bikeState.bike.brand.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Tyyppi:</TableCell>
                                        <TableCell>{bikeState.bike.type.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Koko:</TableCell>
                                        <TableCell>{bikeState.bike.size.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Väri:</TableCell>
                                        <TableCell>{bikeState.bike.color.name}</TableCell>
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
                                        <TableCell colSpan={2}>
                                            <TextField
                                                label="Muokkaa runkonumeroa"
                                                name="changeFrameNumber"
                                                value={frameNumberState}
                                                fullWidth
                                                onChange={handleFrameNumberChange}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Varattu Pakettiin:</TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            {bikeState.package_only ? 'Kyllä' : 'Ei'}
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
                        {/* <Button type="submit" sx={{ padding: '20px' }} onClick={() => redirect('/pyorat/pyoravarasto')}> */}
                        <Button type="submit" sx={{ padding: '20px' }}>
                            {/* <Button type="submit" sx={{ padding: '20px' }}> */}
                            Tallenna muutokset ja palaa listaan
                        </Button>
                    </Box>
                </Box>
            </TableContainer>
        </>
    );
}
