import { Box, Grid, Typography, IconButton } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

function CartView() {
    return (
        <Box>
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
        </Box>
    );
}

export default CartView;
