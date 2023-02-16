/* eslint-disable react/jsx-props-no-spreading */
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import CartView from './CartView';
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
        borderColor: theme.palette.primary.main,
        borderWidth: 'thick',
        borderRadius: 20,
        marginTop: 10,
    },
}));

function ShoppingCart() {
    // const [skipped] = useState(new Set());
    // const [activeStep, setActiveStep] = useState(0);
    const { pathname } = useLocation();
    console.log(pathname);
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
    // console.log(activeStep);

    // muuta yhdeksi funktioksi jossain vaihessa
    // function moveBack() {
    //     switch (activeStep) {
    //         case 2:
    //             return '/ostoskori/vaihe2';
    //         case 1:
    //             return '/ostoskori';
    //         default:
    //             return '/';
    //     }
    // }
    // function moveForward() {
    //     switch (activeStep) {
    //         case 0:
    //             return '/ostoskori/vaihe2';
    //         case 1:
    //             return '/ostoskori/vaihe3';
    //         default:
    //             return '/';
    //     }
    // }

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
                    activeStep={setStep()}
                    connector={<CartStepConnector />}
                    alternativeLabel
                >
                    {steps.map((label, index) => {
                        const stepProps = {};
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
            {/* {(() => {
                    switch (activeStep) {
                        case 0:
                            return <CartView />;
                        case 1:
                            return <ContactsAndDelivery />;

                        case 2:
                            return <Confirmation />;

                        default:
                            return <CartView />;
                    }
                })()} */}
            <Outlet />
            {/* <Grid container justifyContent="space-between" sx={{ marginTop: 5 }}>
                {activeStep === 0 ? (
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        onClick={() => setActiveStep((PrevStep) => PrevStep - 1)}
                        startIcon={<ArrowBackIcon />}
                    >
                        Jatka ostoksia
                    </Button>
                ) : (
                    <Button
                        component={Link}
                        to={moveBack()}
                        variant="contained"
                        onClick={() => setActiveStep((PrevStep) => PrevStep - 1)}
                        startIcon={<ArrowBackIcon />}
                    >
                        Takaisin
                    </Button>
                )}
                <Button
                    component={Link}
                    to={moveForward()}
                    type={activeStep === 3 ? 'submit' : undefined}
                    variant="contained"
                    onClick={() => setActiveStep((PrevStep) => PrevStep + 1)}
                    endIcon={<ArrowForwardIcon />}
                >
                    {activeStep === 2 ? 'Vahvistus' : 'Seuraava'}
                </Button>
            </Grid> */}
        </Container>
    );
}

export default ShoppingCart;
