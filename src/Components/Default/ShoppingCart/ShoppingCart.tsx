/* eslint-disable react/jsx-props-no-spreading */
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

function iconDecider(index: number) {
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
        marginRight: 4,
        marginLeft: 3,
        zIndex: -1,
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Container
                id="shopping-process-container"
                maxWidth="lg"
                sx={{
                    border: '0.1rem solid #bfe6f6',
                    borderRadius: '1rem',
                    // pt: '1rem',
                    pb: '2rem',
                    mt: '1rem',
                    mb: '2rem',
                }}
            >
                <Box
                    id="shopping-process-stepper-container"
                    sx={{
                        // border: '0.1rem solid #bfe6f6',
                        // borderRadius: '1rem',
                        p: '2rem',
                        mb: 5,
                    }}
                >
                    <Stepper
                        id="shopping-process-stepper"
                        sx={{
                            '& .Mui-disabled': { opacity: 0.5 },
                        }}
                        activeStep={setStep()}
                        connector={<CartStepConnector />}
                        alternativeLabel
                    >
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={() => iconDecider(index)}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
                <Outlet />
            </Container>
        </Box>
    );
}

export default ShoppingCart;
