import { FC } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';
import { Button, ButtonProps, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    backText: string;
    forwardText: string;
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

function CartButtons({ backText, forwardText }: Props) {
    return (
        <Grid container justifyContent="space-between" sx={{ marginTop: 5 }}>
            <LinkButton component={Link} to={-1} backText={backText} />
            <Button type="submit" variant="contained" endIcon={<ArrowForwardIcon />}>
                {forwardText}
            </Button>
        </Grid>
    );
}

export default CartButtons;
