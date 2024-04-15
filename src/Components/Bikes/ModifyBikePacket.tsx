import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLoaderData } from 'react-router';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Form, useSubmit, useNavigation } from 'react-router-dom';
import { type FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useState } from 'react';
// import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
// import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteBikePacketModal from './DeleteBikePacketModal';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

// Interfaces
interface LoaderDataInterface {
    packet: PacketInterface;
    models: ModelInterface[];
    bikes: LoaderBikesInterface[];
}

export interface PacketInterface {
    id: number;
    name: string;
    description: string;
    bikes: BikeInterface[];
}

interface BikeInterface {
    id: number;
    bike: number;
    amount: number;
}
interface NewBikeInterface {
    bike: number;
    amount: number;
}

interface LoaderBikesInterface {
    bike: ModelInterface;
    color: number | null;
    created_at: string;
    frame_number: string;
    id: number;
    number: string;
    package_only: boolean;
    state: string;
    storage: number;
}

interface ModelInterface {
    id: number;
    name: string;
    description: string;
    type: {
        id: number;
        name: string;
    };
    color: {
        id: number;
        name: string;
    };
    brand: {
        id: number;
        name: string;
    };
    size: {
        id: number;
        name: string;
    };
}

interface FormValues {
    packetName: string;
    packetDescription: string;
    bikes: BikeInterface[] | NewBikeInterface[];
}
interface CreateNewPacketInterface {
    createNewPacket: boolean;
}

/**
 *
 * @returns
 */
export default function ModifyBikePacket({ createNewPacket }: CreateNewPacketInterface) {
    // data from backend
    const { packet, models, bikes } = useLoaderData() as LoaderDataInterface;

    // Local states
    const [, setSelectedModels] = useState<number[]>(models[0] ? [models[0].id] : []);
    const [selectedModel, setSelectedModel] = useState<number>(models[0] ? models[0].id : models[1]?.id || 0);
    const [renderDeleteBikePacket, setRenderDeleteBikePacket] = useState(false);
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    // hook form functions
    const {
        handleSubmit,
        control,
        register,
        watch,
        setValue,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormValues>({
        defaultValues: {
            packetDescription: createNewPacket ? '' : (packet.description as string),
            packetName: createNewPacket ? '' : (packet.name as string),
            bikes: createNewPacket ? [] : (packet.bikes as BikeInterface[]),
        },
    });

    // field array functions
    const { fields, append, remove } = useFieldArray({
        name: 'bikes',
        control,
    });

    // count the number of bikes available for packet
    const maxAmounts = fields.map((field, index) => {
        const count = bikes.reduce((counter, bike) => {
            if (bike.bike.id === field.bike && bike.package_only === false) counter += 1;
            return counter;
        }, 0);
        return count + field.amount;
    });

    // submit
    const submit = useSubmit();
    const onSubmit = async (data: FieldValues) => {
        const formData = { ...data, bikes: JSON.stringify(data.bikes) };
        await submit(formData, {
            method: createNewPacket ? 'post' : 'put',
            action: createNewPacket
                ? `/pyorat/pyoravarasto/lisaapaketti`
                : `/pyorat/pyoravarasto/muokkaapaketti/${packet.id}`,
        });
    };

    // increase the number of bikes (of a model)
    const handleAddBike = (index: number) => {
        const currentAmount = watch(`bikes.${index}.amount`);
        if (currentAmount < maxAmounts[index]) {
            setValue(`bikes.${index}.amount`, watch(`bikes.${index}.amount`) + 1);
        }
    };

    // decrease the number of bikes (of a model)
    const handleRemoveBike = (index: number) => {
        const currentAmount = watch(`bikes.${index}.amount`);
        if (currentAmount > 0) {
            setValue(`bikes.${index}.amount`, currentAmount - 1);
        }
    };

    // add a new bike model
    const handleAddModel = () => {
        const isModelAlreadyAdded = fields.some((field) => field.bike === selectedModel);
        if (!isModelAlreadyAdded) {
            const newBike: NewBikeInterface = {
                bike: selectedModel,
                amount: 0,
            };
            append(newBike);
        }
    };

    // remove a bike model
    const handleRemoveModel = (index: number) => {
        remove(index);
        const removedModel = fields[index].bike;
        setSelectedModels((prevModels) => prevModels.filter((model) => model !== removedModel)); // Remove the deleted model from the selectedModels state
    };

    // RENDER
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                {createNewPacket ? 'Luo uusi paketti' : `Muokkaa pakettia: ${packet.name}`}
            </Typography>
            <TableContainer
                component={Paper}
                elevation={3}
                sx={{ marginBottom: '2rem', paddingX: '4rem', paddingY: '2rem', marginX: '2rem' }}
            >
                <Box component={Form} method="put" onSubmit={handleSubmit(onSubmit)}>
                    <Table>
                        <TableBody>
                            {/*
                             * Package name and description
                             */}
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nimi:</TableCell>
                                <TableCell>
                                    <TextField
                                        // multiline
                                        {...register('packetName', { required: 'Täytä tämä kenttä' })}
                                        color={errors.packetName ? 'error' : 'primary'}
                                        error={!!errors.packetName}
                                        helperText={errors.packetName?.message?.toString() || ' '}
                                        name="packetName"
                                        fullWidth
                                        sx={{ paddingTop: '1.5rem' }}
                                    />
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                        <FormControl sx={{ minWidth: '180px' }}>
                                            <InputLabel id="model-select-label">Valitse malli</InputLabel>
                                            <Select
                                                required
                                                labelId="model-select-label"
                                                id="model-select"
                                                value={selectedModel}
                                                onChange={(e) => setSelectedModel(e.target.value as number)}
                                                label="Valitse malli"
                                            >
                                                {models.map((model) => {
                                                    const isModelAdded = fields.some(
                                                        (field) => field.bike === model.id
                                                    );
                                                    return (
                                                        <MenuItem
                                                            key={model.id}
                                                            value={model.id}
                                                            disabled={isModelAdded}
                                                        >
                                                            {model.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>

                                        <Button sx={{ marginLeft: '1em' }} variant="contained" onClick={handleAddModel}>
                                            Lisää valittu pyörämalli
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>

                            {/*
                             * Bike Models and amounts
                             */}
                            {fields.map((field, index) => (
                                <TableRow key={field.id}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <input
                                            type="hidden"
                                            {...register(`bikes.${index}.bike`, { required: 'Valitse pyörä' })}
                                        />{' '}
                                        {index === 0 ? 'Pyörät: ' : ''}
                                    </TableCell>

                                    {/* Nimi:  */}
                                    <TableCell align="left">
                                        {models.find((model) => model.id === field.bike)?.name}
                                    </TableCell>

                                    <TableCell></TableCell>

                                    <TableCell sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                                        <Box sx={{ pr: '3rem' }}>
                                            <Stack justifyContent="center" alignItems="center" direction="row">
                                                <IconButton
                                                    size="large"
                                                    color="primary"
                                                    onClick={() => handleRemoveBike(index)}
                                                    sx={{ m: 0, p: 0 }}
                                                >
                                                    <IndeterminateCheckBoxIcon
                                                        sx={{ fontSize: '2.5rem', m: 0, p: 0 }}
                                                    />
                                                </IconButton>
                                                <TextField
                                                    size="small"
                                                    value={watch(`bikes.${index}.amount`)}
                                                    InputProps={{
                                                        inputProps: {
                                                            style: { textAlign: 'center' },
                                                        },
                                                    }}
                                                    sx={{ width: '4rem', m: 0, p: 0 }}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleAddBike(index)}
                                                    sx={{ m: 0, p: 0 }}
                                                >
                                                    <AddBoxIcon sx={{ fontSize: '2.5rem', m: 0, p: 0 }} />
                                                </IconButton>
                                            </Stack>
                                        </Box>
                                        <Button onClick={() => handleRemoveModel(index)} variant="outlined">
                                            Poista
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/*
                             * Description
                             */}
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', border: '0' }}>Kuvaus:</TableCell>
                                <TableCell colSpan={3} sx={{ border: '0' }}>
                                    <TextField
                                        rows={2}
                                        {...register('packetDescription', { required: 'Täytä tämä kenttä' })}
                                        // value={watch('packetDescription')}
                                        required
                                        color={errors.packetDescription ? 'error' : 'primary'}
                                        error={!!errors.packetDescription}
                                        helperText={errors.packetDescription?.message?.toString() || ' '}
                                        multiline
                                        fullWidth
                                        sx={{ paddingTop: '1rem' }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-evenly"
                        marginTop="20px"
                        paddingTop="20px"
                        // borderTop="1px solid lightgray"
                    >
                        {/* Submit button */}
                        <Button to={`/pyorat/pyoravarasto/pyorapaketit`} component={Link} sx={{ padding: '1rem' }}>
                            Palaa pyörälistaan tallentamatta
                        </Button>
                        {!createNewPacket && (
                            <Button color="error" onClick={() => setRenderDeleteBikePacket(true)}>
                                Poista tämä paketti
                            </Button>
                        )}
                        <Button
                            type="submit"
                            sx={{ padding: '1rem' }}
                            disabled={isLoading || isSubmitting || isSubmitSuccessful}
                        >
                            Tallenna muutokset ja palaa listaan
                        </Button>
                    </Box>
                </Box>
            </TableContainer>
            <DeleteBikePacketModal
                renderModal={renderDeleteBikePacket}
                setRenderModal={setRenderDeleteBikePacket}
                packetId={packet.id}
            />
        </>
    );
}
