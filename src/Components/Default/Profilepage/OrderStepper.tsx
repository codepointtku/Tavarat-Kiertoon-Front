import { styled } from '@mui/material/styles';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';

const OrderStepConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.dark,
        borderWidth: '0.15rem',
        height: '2rem',
    },
}));

function OrderStepper() {
    const steps = [
        { label: 'Odottaa vastaanottoa', icon: <AccessTimeIcon /> },
        { label: 'Käsittelyssä', icon: <InventoryIcon /> },
        { label: 'Kuljetuksessa', icon: <LocalShippingIcon /> },
        { label: 'Toimitettu', icon: <CheckIcon /> },
    ];

    function setCustomIconComponent(index: number) {
        return (
            <Box
                sx={{
                    borderRadius: '50%',
                    border: '0.1rem solid primary.dark',
                    backgroundColor: 'primary.main',
                    width: 35,
                    height: 35,
                    // p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                {steps[index].icon}
            </Box>
        );
    }

    const stepElements = steps.map((step, index) => (
        <Step key={step.label}>
            <StepLabel
                StepIconComponent={() => setCustomIconComponent(index)}
                sx={{ '& .Mui-completed': { color: 'success.light' }, '& .Mui-active': { color: 'primary.dark' } }}
            >
                {step.label}
            </StepLabel>
        </Step>
    ));

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stepper
                sx={{
                    '& .Mui-disabled': { opacity: 0.5 },
                }}
                orientation="vertical"
                activeStep={1}
                connector={<OrderStepConnector />}
            >
                {stepElements}
            </Stepper>
        </Box>
    );
}

export default OrderStepper;
