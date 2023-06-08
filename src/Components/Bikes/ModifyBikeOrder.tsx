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
import { Form, useSubmit } from 'react-router-dom';
import { type FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useState } from 'react';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { getValue } from '@testing-library/user-event/dist/utils';

// Interfaces
interface LoaderDataInterface {
    packet: PacketInterface;
    models: ModelInterface[];
}

interface PacketInterface {
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
    bikes: BikeInterface[];
}

/**
 *
 * @returns
 */
export default function ModifyBikeOrder() {
    // data from backend
    const { packet, models } = useLoaderData() as LoaderDataInterface;

    // local states
    const [selectedModel, setSelectedModel] = useState<number>(models[0] ? models[0].id : 1);
    const [amount, setAmount] = useState(packet.bikes.map((bike) => bike.amount));

    // hook form functions
    const { handleSubmit, control, register, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            packetDescription: packet.description,
            packetName: packet.name,
            bikes: packet.bikes,
        },
    });

    // field array functions
    const { fields, append, remove } = useFieldArray({
        name: 'bikes',
        control,
    });

    // submit
    const submit = useSubmit();
    const onSubmit = (data: FieldValues) => {
        console.log(data);
        const formData = { ...data, bikes: JSON.stringify(data.bikes) };
        submit(formData, {
            method: 'post',
            action: `/pyorat/pyoravarasto/muokkaapaketti/${packet.id}`,
        });
    };

    const handleAddBike = (index: number) => {
        const newAmount = [...amount];
        newAmount[index] = newAmount[index] + 1;
        setAmount(newAmount);
    };

    const handleRemoveBike = (index: number) => {
        const newAmount = [...amount];
        if (newAmount[index] > 0) {
            newAmount[index] = newAmount[index] - 1;
            setAmount(newAmount);
        }
    };

    const handleAddModel = () => {
        const newBike = {
            // id: selectedModel,
            bike: selectedModel,
            amount: 1,
        };
        append(newBike);
        setAmount([...amount, 1]);
    };
    const handleRemoveModel = (index: number) => {
        const newFields = [...fields];
        setAmount(amount.filter((_, i) => i !== index));
        setValue('bikes', newFields);
        remove(index);
    };
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [success, setSuccess] = useState(false);

    // RENDER
    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Box
                width="100%"
                textAlign="center"
                marginBottom="20px"
                paddingBottom="20px"
                borderBottom="1px solid lightgray"
            >
                <Typography variant="h4" component="h1" sx={{ fontFamily: 'Montserrat', color: 'primary.main' }}>
                    Muokkaa {packet.name}a
                </Typography>
            </Box>
            <Box component={Form} method="put" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 0.5,
                            marginRight: '2em',
                            minWidth: 500,
                        }}
                    >
                        <Table>
                            <TableBody>
                                {/*
                                 * Package name and description
                                 */}
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Nimi:</TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            multiline
                                            {...register('packetName')}
                                            value={watch('packetName')}
                                            name="changePacketName"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell colSpan={4}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Kuvaus:</TableCell>
                                    <TableCell colSpan={7}>
                                        <TextField
                                            rows={2}
                                            {...register('packetDescription')}
                                            value={watch('packetDescription')}
                                            multiline
                                            name="packetDescription"
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                                {/*
                                 * Bike Models and amounts
                                 */}
                                {fields.map((field, index) => (
                                    <TableRow {...register(`bikes.${index}.bike`)} key={field.id}>
                                        <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>
                                            {index === 0 ? 'Pyörät: ' : ''}
                                        </TableCell>

                                        <TableCell>
                                            {/* Merkki:  */}
                                            {models.find((model) => model.id === field.bike)?.brand.name}
                                        </TableCell>

                                        <TableCell>
                                            <Box>
                                                <Stack justifyContent="center" direction="row">
                                                    <IconButton color="primary" onClick={() => handleRemoveBike(index)}>
                                                        <RemoveCircleOutlineRoundedIcon />
                                                    </IconButton>
                                                    <Typography variant="h6" sx={{ p: 0.5 }}>
                                                        {amount[index]}
                                                        {/* {watch(`bikes.${index}.amount`)} */}
                                                    </Typography>
                                                    <IconButton color="primary" onClick={() => handleAddBike(index)}>
                                                        <AddCircleRoundedIcon />
                                                    </IconButton>
                                                </Stack>
                                            </Box>
                                        </TableCell>

                                        <TableCell>
                                            {/* Väri:  */}
                                            {models.find((model) => model.id === field.bike)?.color.name}
                                        </TableCell>

                                        <TableCell>
                                            {/* Malli:  */}
                                            {models.find((model) => model.id === field.bike)?.type.name}
                                        </TableCell>

                                        <TableCell>
                                            {/* Nimi:  */}
                                            {models.find((model) => model.id === field.bike)?.name}
                                        </TableCell>

                                        <TableCell>
                                            {/* Kuvaus:  */}
                                            {models.find((model) => model.id === field.bike)?.description}
                                        </TableCell>

                                        <TableCell>
                                            <IconButton
                                                type="button"
                                                sx={{ color: 'primary.main' }}
                                                aria-label="remove"
                                                onClick={() => handleRemoveModel(index)}
                                            >
                                                <DeleteIcon />
                                                Poista
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {/*
                                 * Add new bike model
                                 */}
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>
                                        Lisää uusi
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <FormControl sx={{ width: 300 }}>
                                            <InputLabel id="model-select-label">Valitse malli</InputLabel>
                                            <Select
                                                labelId="model-select-label"
                                                id="model-select-id"
                                                value={selectedModel}
                                                onChange={(event) => setSelectedModel(event.target.value as number)}
                                                label="Valitse malli"
                                                fullWidth
                                            >
                                                {/* {!selectedModel && (
                                                    <MenuItem disabled value="">
                                                        <em>Valitse malli</em>
                                                    </MenuItem>
                                                )} */}
                                                {models.map((model) => (
                                                    <MenuItem key={model.id} value={model.id}>
                                                        {model.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell colSpan={4}>
                                        <IconButton
                                            sx={{ color: 'primary.main' }}
                                            aria-label="add"
                                            onClick={handleAddModel}
                                            disabled={false}
                                        >
                                            <AddCircleRoundedIcon />
                                            <Typography variant="body1">Lisää</Typography>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
                {/*
                 * Submit
                 */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}
                    >
                        Lähetä
                    </Button>
                </Box>
            </Box>
        </TableContainer>
    );
}
