import { Typography, Box, Grid, Button } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { Form } from 'react-router-dom';

function Confirmation() {
    return (
        <Form method="post">
            <Typography variant="h6">Ostosten yhteenveto</Typography>
            <hr />
            <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2, color: 'primary.main' }}>
                Valitse maksutapa
            </Typography>
            <Grid container direction="row" justifyContent="space-around">
                <Button variant="text">
                    <Box
                        sx={{
                            p: '100px 200px',
                            borderStyle: 'solid',
                            borderWidth: 5,
                            fontWeight: 'bold',
                            display: 'flex',
                            alignContent: 'center',
                        }}
                    >
                        Maksukortti <PaymentIcon sx={{ marginLeft: 3 }} />
                    </Box>
                </Button>
                <Button variant="text">
                    <Box sx={{ p: '100px 200px', borderStyle: 'solid', borderWidth: 5, fontWeight: 'bold' }}>
                        MobilePay
                    </Box>
                </Button>
            </Grid>
        </Form>
    );
}

export default Confirmation;
