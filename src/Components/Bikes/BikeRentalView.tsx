import { Form, useSubmit, useLoaderData, Link,  } from 'react-router-dom';
import type { bikeRentalViewLoader } from '../../Router/loaders';

import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    IconButton,
    Box,
    Collapse,
    Button,
    Stack,
    Container,
    Grid,
    Link as MuiLink,
    Paper,
    Typography,
    Checkbox,
    MenuItem
} from '@mui/material';

export default function BikeRentalView() {
    const rental = useLoaderData() as Awaited<ReturnType<typeof bikeRentalViewLoader>>
    const currentRentalStatus = ['WAITING', 'ACTIVE', 'FINISHED'];

    // Parse Date objects from backend data string
    const dateParse = (value: string) => {
        const date = new Date(value);
        const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        return dateString;
    };
    
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                {`Tilaus #${rental.id}`}
            </Typography>
            <Container maxWidth="xl" component={Paper}>
                <Box id="bike-rental-info" sx={{ margin: '2rem 0 1rem 0'}}>
                    <Table id="bike-rental-state-table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="right" width="50%" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                    Tila:
                                </TableCell>
                                <TableCell>
                                    {rental.state}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table id="bike-rental-info-table">
                        <TableBody>
                            <TableRow>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Alkamispäivä:
                                </TableCell>
                                <TableCell>
                                    {dateParse(rental?.start_date as string)}
                                </TableCell>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Päättymispäivä:
                                </TableCell>
                                <TableCell>
                                {dateParse(rental?.end_date as string)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Tilaaja:
                                </TableCell>
                                <TableCell width="30%">
                                    {rental.user}
                                </TableCell>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Tilausnumero:
                                </TableCell>
                                <TableCell width="30%">
                                    {rental.id}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>            
                </Box>
                <div>Tilausnumero: {rental.id}</div>
                <div>Pyörät: {rental.bike_stock}</div>
                <div>Vastaanottaja: {rental.contact_name}</div>
                <div>Vastaanottajan puh.nro.: {rental.contact_phone_number}</div>
                <div>Toimitusosoite: {rental.delivery_address}</div>
                <div>Alkamispäivä: {rental.start_date}</div>
                <div>Loppumispäivä: {rental.end_date}</div>
                <div>Nouto: {rental.pickup ? 'Kyllä' : 'Ei'}</div>
                <div>
                    {currentRentalStatus?.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </div>
                <div>Tila: {rental.state}</div>
            </Container>
        </>
    )
}