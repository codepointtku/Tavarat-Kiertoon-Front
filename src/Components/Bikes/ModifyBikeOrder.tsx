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
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function ModifyBikeOrder() {
    const { packet, models } = useLoaderData() as LoaderDataInterface;
    const submit = useSubmit();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const { register, watch, handleSubmit } = useForm({
        defaultValues: {
            packetDescription: packet.description,
            packetName: packet.name,
        },
    });
    const [amount, setAmount] = useState(packet.bikes.map((packet) => packet.amount));
    const [bikesState, setBikesState] = useState(packet.bikes);

    const [selectedModel, setSelectedModel] = useState<number>(models[0].id);

    const handleAddBike = (index: number) => {
        setBikesState((prevState) => {
            const newState = [...prevState];
            newState[index].amount += 1;
            return newState;
        });
        setAmount((prevAmount) => {
            const newAmount = [...prevAmount];
            newAmount[index] += 1;
            return newAmount;
        });
    };

    const handleRemoveBike = (index: number) => {
        const newAmount = [...amount];
        if (newAmount[index] > 0) {
            newAmount[index] -= 1;
            setAmount(newAmount);
        }
    };
    const handleRemovePacket = (index: number) => {
        const newBikes = [...bikesState];
        newBikes.splice(index, 1);
        setBikesState(newBikes);
        const newAmount = [...amount];
        newAmount.splice(index, 1);
        setAmount(newAmount);
    };
    const handleAddModel = (modelId: number) => {
        const modelToAdd = models.find((model) => model.id === modelId);
        if (modelToAdd) {
            const newBike = {
                id: packet.bikes.length + 1,
                bike: modelToAdd.id,
                amount: 1,
            };
            setBikesState((prevState) => [...prevState, newBike]);
            setAmount((prevAmount) => [...prevAmount, 1]);
            setSelectedModel(null);
        }
    };
    const onSubmit = (data) => {
        const formData = { ...data, category: 'category' };

        setIsSubmitting(true);

        submit(formData, {
            method: 'post',
            action: `/pyorat/pyoravarasto/muokkaapaketti/${packet.id}`,
        });

        setSuccess(true);
    };
    console.log('bikes', bikesState);
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
                        <Table>
                            <TableBody>
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
                                    <TableCell colSpan={5}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>Kuvaus:</TableCell>
                                    <TableCell colSpan={8}>
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

                                {bikesState.map((packet, index) => (
                                    <TableRow key={packet.bike}>
                                        <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>
                                            {index === 0 ? 'Pyörät: ' : ''}
                                        </TableCell>
                                        <TableCell>
                                            Merkki: {models.find((model) => model.id === packet.bike)?.brand.name}
                                        </TableCell>

                                        <TableCell>
                                            <Box>
                                                <Stack justifyContent="center" direction="row">
                                                    <IconButton color="primary" onClick={() => handleRemoveBike(index)}>
                                                        <RemoveCircleOutlineRoundedIcon />
                                                    </IconButton>
                                                    <Typography variant="h6" sx={{ p: 0.5 }}>
                                                        {amount[index]}
                                                    </Typography>
                                                    <IconButton color="primary" onClick={() => handleAddBike(index)}>
                                                        <AddCircleRoundedIcon />
                                                    </IconButton>
                                                </Stack>
                                            </Box>
                                        </TableCell>
                                        <TableCell colSpan={5}></TableCell>
                                        <TableCell>
                                            Väri: {models.find((model) => model.id === packet.bike)?.color.name}
                                        </TableCell>
                                        <TableCell>
                                            Malli: {models.find((model) => model.id === packet.bike)?.type.name}
                                        </TableCell>

                                        <TableCell>
                                            Nimi: {models.find((model) => model.id === packet.bike)?.name}
                                        </TableCell>
                                        <TableCell>
                                            Kuvaus: {models.find((model) => model.id === packet.bike)?.description}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                sx={{ color: 'primary.main' }}
                                                aria-label="remove"
                                                onClick={() => handleRemovePacket(index)}
                                            >
                                                <DeleteIcon />
                                                Poista
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>
                                        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                                            <InputLabel id="model-label">Valitse malli</InputLabel>
                                            <Select
                                                labelId="model-label"
                                                // value={selectedModel}
                                                {...register('bikes')}
                                                onChange={(event) => setSelectedModel(event.target.value as number)}
                                                fullWidth
                                                // displayEmpty
                                            >
                                                {!selectedModel && (
                                                    <MenuItem disabled value="">
                                                        <em>Valitse malli</em>
                                                    </MenuItem>
                                                )}
                                                {models.map((model) => (
                                                    <MenuItem key={model.id} value={model.id}>
                                                        {model.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            sx={{ color: 'primary.main' }}
                                            aria-label="add"
                                            onClick={() => handleAddModel(selectedModel)}
                                            disabled={!selectedModel}
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
