import { type FC } from 'react';
import { Link, type LinkProps, type To } from 'react-router-dom';
import { Button, type ButtonProps, Grid } from '@mui/material';
import { type CartFormData } from './ContactsAndDelivery';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { StateMachineActions } from './ContactsAndDelivery';

interface Props {
    backText: string;
    forwardText: string;
    cartEmpty?: boolean;
    actions?: StateMachineActions;
    formData?: CartFormData;
    unconfirmedChangesCartProducts?: object[];
    status?: boolean;
}

interface CustomButtonProps extends ButtonProps {
    to: To & number;
    component: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
    backText: string;
    actions?: StateMachineActions;
    formData?: CartFormData;
}

const LinkButton: FC<CustomButtonProps> = ({ component, to, backText, actions, formData }) => {
    return (
        <Button
            component={component}
            to={to}
            variant="contained"
            onClick={() => actions && actions.Update(formData)}
            startIcon={<ArrowBackIcon />}
        >
            {backText}
        </Button>
    );
};

function CartButtons({
    backText,
    forwardText,
    cartEmpty,
    actions,
    formData,
    unconfirmedChangesCartProducts,
    status,
}: Props) {
    return (
        <Grid container justifyContent="space-between" sx={{ marginTop: '2rem' }}>
            {/* <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> */}
            <LinkButton component={Link} to={-1} backText={backText} actions={actions} formData={formData} />
            {/* </Grid> */}
            {/* <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> */}
            <Button
                type="submit"
                variant="contained"
                disabled={
                    cartEmpty || (unconfirmedChangesCartProducts && unconfirmedChangesCartProducts.length > 0) || status
                }
                endIcon={<ArrowForwardIcon />}
            >
                {forwardText}
            </Button>
            {/* </Grid> */}
        </Grid>
    );
}

export default CartButtons;
