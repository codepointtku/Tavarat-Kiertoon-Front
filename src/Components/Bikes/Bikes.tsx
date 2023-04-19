import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useLoaderData } from "react-router";
import StyledTableCell from "../StyledTableCell";
import { Link } from "react-router-dom";

export interface bikeInterface {
    id: number;
    name: string;
    description: string;
    type: string;
    brand: string;
    size: string;
    color: string;
    package: number;
    serial_number: string;
    reserved: {};
}

export default function Bikes() {

    const bikes = useLoaderData() as bikeInterface[]
    console.log(bikes)
    return (
        <>
        <Box width='100%' textAlign='right' marginBottom='1em' marginTop='-2em' marginRight='2em'>
            <Button onClick={() => {console.log(`Lisää uusi pyörä`)}}>Lisää uusi pyörä</Button>
        </Box>
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {/* <StyledTableCell>
                            Tilaus (ID) <SortByMenu />
                        </StyledTableCell> */}
                        <StyledTableCell align="right">Nimi</StyledTableCell>
                        <StyledTableCell align="right">Merkki</StyledTableCell>
                        <StyledTableCell align="right">Koko</StyledTableCell>
                        <StyledTableCell align="right">Tyyppi</StyledTableCell>
                        <StyledTableCell align="right">Väri</StyledTableCell>
                        <StyledTableCell align="right">Runkonumero</StyledTableCell>
                        <StyledTableCell align="right" width='10%'>Muokkaa</StyledTableCell>
                        {/* <StyledTableCell align="right" width='10%'>Poista</StyledTableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                {bikes?.map( (bike) => {
                    return(
                        <TableRow key={bike.id}>
                            <TableCell align="right">{bike.name}</TableCell>
                            <TableCell align="right">{bike.brand}</TableCell>
                            <TableCell align="right">{bike.size}</TableCell>
                            <TableCell align="right">{bike.type}</TableCell>
                            <TableCell align="right">{bike.color}</TableCell>
                            <TableCell align="right">{bike.serial_number}</TableCell>
                            <TableCell align="right">
                                <Button to={`/pyorat/pyoravarasto/muokkaa/${bike.id}`} component={Link}>Muokkaa</Button>
                            </TableCell>
                           {/* <TableCell align="right"><Button color="error"  onClick={() => {console.log(`Poista ${bike.serial_number}`)}}>Poista</Button></TableCell> */}
                       </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
