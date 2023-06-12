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
        borderWidth: 'medium',
    },
}));

function OrderStepper() {
    const steps = [
        { label: 'Odottaa vastaanottoa', icon: <AccessTimeIcon /> },
        { label: 'Käsittelyssä', icon: <InventoryIcon /> },
        { label: 'Kuljetuksessa', icon: <LocalShippingIcon /> },
        { label: 'Toimitettu', icon: <CheckIcon /> },
    ];
    const stepElements = steps.map((step) => (
        <Step key={step.label}>
            <StepLabel icon={step.icon}>{step.label}</StepLabel>
        </Step>
    ));

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stepper orientation="vertical" activeStep={1} connector={<OrderStepConnector />}>
                {stepElements}
            </Stepper>
        </Box>
    );
}

export default OrderStepper;
