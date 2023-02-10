/* eslint-disable react/jsx-props-no-spreading */
// import { useState } from 'react';

import { Container, Box, Stepper, Step, StepLabel, Grid, Typography, Button, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { Form } from 'react-router-dom';

function ShoppingCart() {
    // const [skipped] = useState(new Set());
    const steps = ['Ostoskori', 'Yhteystiedot & toimitus', 'Vahvistus'];

    // const isStepSkipped = (step) => skipped.has(step);
    return (
        <Container sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, padding: 20, margin: '3.125rem 0rem' }}>
            <Form>
                <Box
                    sx={{
                        border: 1,
                        borderStyle: 'solid',
                        borderRadius: 3,
                        borderColor: 'gray',
                        padding: 10,
                        marginBottom: 10,
                    }}
                >
                    <Stepper
                        sx={{
                            '& .Mui-disabled': { opacity: 0.5 },
                        }}
                        activeStep={0}
                        alternativeLabel
                    >
                        {steps.map((label, index) => {
                            const stepProps = {};
                            console.log(index);
                            // const disabled = index === 0 && true;
                            // if (isStepSkipped(index)) {
                            //     stepProps.completed = false;
                            // }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
                {/* map tähän myös */}
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6">Tuotenimi</Typography>
                    </Grid>
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
                <Button variant="contained">Jatka ostoksia</Button>
                <Button variant="contained">Seuraava</Button>
            </Form>
        </Container>
    );
}

export default ShoppingCart;

// return <div style={{ textAlign: 'center', margin: 40 }}>Shopping Cart page</div>;
