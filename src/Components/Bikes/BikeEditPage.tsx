import { Box, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import type { bikeInterface } from "./Bikes";
import { useLoaderData } from "react-router";

export default function BikeEditPage() {
    const bike = useLoaderData() as bikeInterface;
    return(
        <>
        <Box width='100%' textAlign='right' marginBottom='1em' marginTop='-2em' marginRight='2em'>
            <Button to={`/pyorat/pyoravarasto`} component={Link}>Takaisin Pyörät listaukseen</Button>
        </Box>
        <Box component={Paper} width="100%" textAlign='center'>
            <h3>Muokkaa {bike.name} {bike.serial_number}</h3>
        </Box>
        </>
    )
}