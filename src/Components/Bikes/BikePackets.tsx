import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import { type bikesPacketLoader } from '../../Router/loaders';
import { type PacketInterface } from './ModifyBikeOrder';


function handleRemove(id: number) {
    const confirmed = window.confirm('Are you sure you want to remove this packet?');
    if (confirmed) {
        // Remove the packet from the list
    }
}
export default function BikePackets() {
    const { packet } = useLoaderData() as Awaited<ReturnType<typeof bikesPacketLoader>>;
    // const loaderData = useLoaderData() as LoaderDataInterface;

    const packages = packet;

    return (
        <Box sx={{ width: '100%', height: '100%', padding: '2rem' }}>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Paketin nimi</TableCell>
                            <TableCell align="right">Muokkaa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packages.map((packet: PacketInterface) => (
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
                                <TableCell align="right">
        <Button
            color="secondary"
            onClick={() => handleRemove(packet.id)}
        >
            Remove
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
