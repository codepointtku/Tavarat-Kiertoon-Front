import { useState } from 'react';
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

interface OrderInfo {
    orderInfo: { status: 'Waiting' | 'Processing' | 'Delivery' | 'Finished' };
}

function OrderStepper({ orderInfo }: OrderInfo) {
    function activeStepSetter() {
        switch (orderInfo.status) {
            case 'Waiting':
                return 0;
            case 'Processing':
                return 1;
            case 'Delivery':
                return 2;
            case 'Finished':
                return 3;
            default:
                return -1;
        }
    }
    const [activeStep] = useState(activeStepSetter);
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
                sx={{
                    '& .MuiStepLabel-label.Mui-completed': { color: 'success.light' },
                    '& .MuiStepLabel-label.Mui-active': { color: activeStep === 3 ? 'success.light' : 'primary.dark' },
                }}
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
                activeStep={activeStep}
                connector={<OrderStepConnector />}
            >
                {stepElements}
            </Stepper>
        </Box>
    );
}

export default OrderStepper;
