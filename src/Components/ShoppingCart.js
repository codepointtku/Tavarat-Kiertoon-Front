/* eslint-disable react/jsx-props-no-spreading */
// import { useState } from 'react';

import { Container, Box, Stepper, Step, StepLabel, Grid, Typography, Button, IconButton } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

import { Form } from 'react-router-dom';

function ShoppingCart() {
    // const [skipped] = useState(new Set());
    const steps = ['Ostoskori', 'Yhteystiedot & toimitus', 'Vahvistus'];

    function iconDecider(index) {
        const icons = [<ShoppingCartIcon />, <PermContactCalendarIcon />, <DomainVerificationIcon />];
        console.log(icons);
        return (
            <Box
                sx={{
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    width: 50,
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                {icons[index]}
            </Box>
        );
    }
    // const isStepSkipped = (step) => skipped.has(step);
    // useLoaderData tuotenimen, tuotemäärän ja hinnan hakuun
    return (
        <Container
            sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, p: 20, paddingBottom: 5, margin: '3.125rem 0rem' }}
        >
            <Form method="put">
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
                                    <StepLabel StepIconComponent={() => iconDecider(index)}>{label}</StepLabel>
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
                <Grid container justifyContent="space-between" sx={{ marginTop: 5 }}>
                    <Button type="submit" variant="contained" startIcon={<ArrowBackIcon />}>
                        Jatka ostoksia
                    </Button>
                    <Button type="submit" variant="contained" endIcon={<ArrowForwardIcon />}>
                        Seuraava
                    </Button>
                </Grid>
            </Form>
        </Container>
    );
}

export default ShoppingCart;

// return <div style={{ textAlign: 'center', margin: 40 }}>Shopping Cart page</div>;
