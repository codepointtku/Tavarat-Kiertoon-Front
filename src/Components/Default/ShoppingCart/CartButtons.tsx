import type { FC } from 'react';
import { Link, type LinkProps, type To } from 'react-router-dom';
import { Button, type ButtonProps, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    backText: string;
    forwardText: string;
    cartEmpty?: boolean;
}

interface CustomButtonProps extends ButtonProps {
    to: To & number;
    component: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
    backText: string;
}

const LinkButton: FC<CustomButtonProps> = ({ component, to, backText }) => {
    return (
        <Button component={component} to={to} variant="contained" startIcon={<ArrowBackIcon />}>
            {backText}
        </Button>
    );
};

function CartButtons({ backText, forwardText, cartEmpty }: Props) {
    return (
        <Grid container justifyContent="space-between" sx={{ marginTop: '2rem' }}>
            {/* <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> */}
            <LinkButton component={Link} to={-1} backText={backText} />
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
