import { Form } from 'react-router-dom';
import { Box, Grid, Typography, IconButton, Button } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CartView() {
    return (
        <Form method="put">
            <Grid container direction="row" justifyContent="space-between">
                <Typography variant="h6">Tuotenimi</Typography>
                <Box display="inline-flex">
                    <IconButton color="primary">
                        <RemoveCircleRoundedIcon />
                    </IconButton>
                    <Typography variant="h6">Tuotemäärä</Typography>
                    <IconButton color="primary">
                        <AddCircleRoundedIcon />
                    </IconButton>
                </Box>
                <Typography variant="h6">Hinta</Typography>
            </Grid>
            <hr />
            <Grid container justifyContent="space-between" sx={{ marginTop: 5 }}>
                <Button type="submit" variant="contained" startIcon={<ArrowBackIcon />}>
                    Jatka ostoksia
                </Button>
                <Button type="submit" variant="contained" endIcon={<ArrowForwardIcon />}>
                    Seuraava
                </Button>
            </Grid>
        </Form>
    );
}

export default CartView;
