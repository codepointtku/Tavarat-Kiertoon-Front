/* eslint-disable react/jsx-props-no-spreading */
// import { useState } from 'react';

import { styled } from '@mui/system';
import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

import CartView from './CartView';
// import ContactsAndDelivery from './ContactsAndDelivery';
// import Confirmation from './Confirmation';

function iconDecider(index) {
    const icons = [<ShoppingCartIcon />, <PermContactCalendarIcon />, <DomainVerificationIcon />];
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

const CartStepConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
        display: 'flex',
        alignSelf: 'center',
        borderColor: theme.palette.primary.main,
        borderWidth: 'thick',
        borderRadius: 20,
    },
}));

function ShoppingCart() {
    // const [skipped] = useState(new Set());
    const steps = ['Ostoskori', 'Yhteystiedot & toimitus', 'Vahvistus'];

    // const isStepSkipped = (step) => skipped.has(step);
    // useLoaderData tuotenimen, tuotemäärän ja hinnan hakuun
    return (
        <Container
            sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, p: 20, paddingBottom: 5, margin: '3.125rem 0rem' }}
        >
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
                    activeStep={1}
                    connector={<CartStepConnector />}
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
            <CartView />
        </Container>
    );
}

export default ShoppingCart;

// return <div style={{ textAlign: 'center', margin: 40 }}>Shopping Cart page</div>;
