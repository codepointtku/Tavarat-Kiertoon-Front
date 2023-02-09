import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import { Form } from 'react-router-dom';

function ShoppingCart() {
    const steps = ['Ostoskori', 'Yhteystiedot & toimitus', 'Vahvistus'];
    return (
        <Container sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, padding: 20, margin: '50px 0px' }}>
            <Form>
                <Box
                    sx={{
                        border: 1,
                        borderStyle: 'solid',
                        borderRadius: 3,
                        borderColor: 'gray',
                        padding: 10,
                    }}
                >
                    <Stepper alternativeLabel activeStep={0}>
                        {steps.map((title) => (
                            <Step key={title}>
                                <StepLabel>{title}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Form>
        </Container>
    );
}

export default ShoppingCart;

// return <div style={{ textAlign: 'center', margin: 40 }}>Shopping Cart page</div>;
