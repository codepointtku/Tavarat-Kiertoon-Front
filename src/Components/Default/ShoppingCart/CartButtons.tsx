import type { FC } from 'react';
import { Link, type LinkProps, type To } from 'react-router-dom';
import { Button, type ButtonProps, Grid } from '@mui/material';
import { type CartFormData } from './ContactsAndDelivery';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { AnyCallback, ActionsOutput, GlobalState } from 'little-state-machine/dist/types';

interface Props {
    backText: string;
    forwardText: string;
    cartEmpty?: boolean;
    actions?: ActionsOutput<
        AnyCallback,
        { Update: (state: GlobalState, actions: CartFormData) => { data: CartFormData } }
    >;
    formData?: CartFormData;
}

interface CustomButtonProps extends ButtonProps {
    to: To & number;
    component: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
    backText: string;
    actions?: ActionsOutput<
        AnyCallback,
        { Update: (state: GlobalState, actions: CartFormData) => { data: CartFormData } }
    >;
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

function CartButtons({ backText, forwardText, cartEmpty, actions, formData }: Props) {
    console.log(formData);
    return (
        <Grid container justifyContent="space-between" sx={{ marginTop: '2rem' }}>
            {/* <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> */}
            <LinkButton component={Link} to={-1} backText={backText} actions={actions} formData={formData} />
            {/* </Grid> */}
            {/* <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> */}
            <Button type="submit" variant="contained" disabled={cartEmpty} endIcon={<ArrowForwardIcon />}>
                {forwardText}
            </Button>
            {/* </Grid> */}
        </Grid>
    );
}

export default CartButtons;
