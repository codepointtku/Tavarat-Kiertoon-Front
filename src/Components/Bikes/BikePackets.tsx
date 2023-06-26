import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import { type bikesPacketLoader } from '../../Router/loaders';
import { type PacketInterface } from './ModifyBikeOrder';

export default function BikePackets() {
    const { packet } = useLoaderData() as Awaited<ReturnType<typeof bikesPacketLoader>>;

    return (
        <Box sx={{ height: '100%', width: '100%', padding: '2rem' }}>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                Pyöräpaketit
            </Typography>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Button color="primary" to={`/pyorat/pyoravarasto/lisaapaketti`} component={Link}>
                    Uusi paketti
                </Button>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Paketin nimi</TableCell>
                            <TableCell align="right">Muokkaa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packet.map((packet: PacketInterface) => (
                            <TableRow key={packet.id}>
                                <TableCell align="right"> {packet.id} </TableCell>
                                <TableCell align="right"> {packet.name} </TableCell>
                                <TableCell align="right">
                                    <Button
                                        color="primary"
                                        to={`/pyorat/pyoravarasto/muokkaapaketti/${packet.id}`}
                                        component={Link}
                                    >
                                        Muokkaa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
