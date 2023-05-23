import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLoaderData } from 'react-router';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

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
    name: string;
    description: string;
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
    const { register, watch, handleSubmit } = useForm({
        defaultValues: {
            packetDescription: packet.description,
            packetName: packet.name,
        },
    });
    // const submit = useSubmit();
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [success, setSuccess] = useState(false);
    const [amount, setAmount] = useState(packet.bikes.map((packet) => packet.amount));
    // const onSubmit = (data) => {
    //     const formData = { ...data, category: 'category' };

    //     setIsSubmitting(true);

    //     submit(formData, {
    //         method: 'post',
    //         // action: ',
    //     });

    //     setSuccess(true);
    // };

    console.log('models', models);
    console.log('packet.bikes', packet.bikes);

    const handleAddBike = (index: number) => {
        const newAmount = [...amount];
        newAmount[index] += 1;
        setAmount(newAmount);
    };
    const handleRemoveBike = (index: number) => {
        const newAmount = [...amount];
        if (newAmount[index] > 0) {
            newAmount[index] -= 1;
            setAmount(newAmount);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Box
                width="100%"
                textAlign="center"
                marginBottom="20px"
                paddingBottom="20px"
                borderBottom="1px solid lightgray"
            >
                <h3>
                    <i>Muokkaa {packet.name}a</i>
                </h3>
            </Box>
            <Box
                component={Form}
                // onSubmit={handleSubmit(onSubmit)}
                method="put"
                // action={`/pyorat/pyoravarasto/muokkaapaketti/${packet.id}`}
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
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Nimi:</TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            multiline
                                            {...register('packetName')}
                                            value={watch('packetName')}
                                            name="changePacketName"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell>4</TableCell>
                                    <TableCell>5</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>kuvaus:</TableCell>
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

                                {packet.bikes.map((packet, index) => (
                                    <TableRow key={packet.bike}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>
                                            {index === 0 ? 'Pyörät: ' : ''}
                                        </TableCell>
                                        <TableCell>
                                            merkki: {models.find((model) => model.id === packet.bike).brand.name}
                                        </TableCell>

                                        <TableCell>
                                            <Box>
                                                <Stack justifyContent="center" direction="row">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleRemoveBike('remove', index)}
                                                    >
                                                        <RemoveCircleOutlineRoundedIcon />
                                                    </IconButton>
                                                    <Typography variant="h6" sx={{ p: 0.5 }}>
                                                        {amount[index]}
                                                    </Typography>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleAddBike('add', index)}
                                                    >
                                                        <AddCircleRoundedIcon />
                                                    </IconButton>
                                                </Stack>
                                            </Box>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell>
                                            Väri:{models.find((model) => model.id === packet.bike).color.name}
                                        </TableCell>
                                        <TableCell>
                                            Malli:{models.find((model) => model.id === packet.bike).type.name}
                                        </TableCell>

                                        <TableCell>
                                            nimi:{models.find((model) => model.id === packet.bike).name}
                                        </TableCell>
                                        <TableCell>
                                            Kuvaus:{models.find((model) => model.id === packet.bike).description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
                    <Button type="submit">Lähetä</Button>
                </Box>
            </Box>
        </TableContainer>
    );
}
