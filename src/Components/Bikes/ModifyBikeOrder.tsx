import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLoaderData } from 'react-router';
import { Box, TextField } from '@mui/material';
import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function ModifyBikeOrder() {
    const { packet, models } = useLoaderData();
    const { register, handleSubmit } = useForm();
    // const submit = useSubmit();
    // const [success, setSuccess, isSubmitting, setIsSubmitting] = useState(false);
    // const onSubmit = (data) => {
    //     const formData = { ...data, category: 'category' };

    //     setIsSubmitting(true);

    //     submit(formData, {
    //         method: 'post',
    //         // action: ',
    //     });

    //     setSuccess(true);
    // };

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
                    <i>Muokkaa pakettia</i>
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
                                    <TableCell colSpan={2}>
                                        <TextField
                                            {...register('name')}
                                            // value={packet.name}
                                            name="changePacketName"
                                            fullWidth
                                            label="Muokkaa nimeä"
                                        />
                                    </TableCell>
                                    <TableCell>asdasd</TableCell>
                                    <TableCell>asdasd</TableCell>
                                    <TableCell>asdasd</TableCell>
                                    <TableCell>asdasd</TableCell>
                                    <TableCell>asdasd</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>kuvaus:</TableCell>
                                    <TableCell colSpan={2}>
                                        <TextField
                                            {...register('description')}
                                            label="Muokkaa kuvausta"
                                            name="changePacketDescription"
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>

                                {packet.bikes.map((packet, index) => (
                                    <TableRow key={packet.bike}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>
                                            {index === 0 ? 'Pyörät: ' : ''}
                                        </TableCell>
                                        <TableCell>Tyyppi: {packet.bike}</TableCell>
                                        <TableCell>Määrä: {packet.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>
        </TableContainer>
    );
}
