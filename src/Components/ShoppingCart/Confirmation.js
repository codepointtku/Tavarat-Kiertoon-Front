import { Typography, Box, Grid, Button } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
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
                            p: '75px 150px',
                            borderStyle: 'solid',
                            borderWidth: 5,
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Maksukortti <PaymentIcon sx={{ marginLeft: 3 }} fontSize="large" />
                    </Box>
                </Button>
                <Button variant="text">
                    <Box
                        sx={{
                            p: '75px 150px',
                            borderStyle: 'solid',
                            borderWidth: 5,
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        MobilePay <SmartphoneIcon sx={{ marginLeft: 3 }} fontSize="large" />
                    </Box>
                </Button>
            </Grid>
        </Form>
    );
}

export default Confirmation;
