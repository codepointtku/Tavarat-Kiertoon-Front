/* eslint-disable react/jsx-props-no-spreading */
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

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
        borderColor: theme.palette.primary.main,
        borderWidth: 'thick',
        borderRadius: 20,
        marginTop: 10,
    },
}));

function ShoppingCart() {
    const { pathname } = useLocation();
    const steps = ['Ostoskori', 'Yhteystiedot & toimitus', 'Vahvistus'];
    function setStep() {
        switch (pathname) {
            case '/ostoskori':
                return 0;
            case '/ostoskori/vaihe2':
                return 1;
            case '/ostoskori/vaihe3':
                return 2;
            default:
                return 0;
        }
    }

    // useLoaderData tuotenimi ja tuotemäärä
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
                    activeStep={setStep()}
                    connector={<CartStepConnector />}
                    alternativeLabel
                >
                    {steps.map((label, index) => {
                        const stepProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel StepIconComponent={() => iconDecider(index)}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>
            <Outlet />
        </Container>
    );
}

export default ShoppingCart;
