import { Avatar, Grid } from '@mui/material';

import BackButton from './BackButton';

interface Props {
    Icon: React.ReactNode;
}

function Hero({ Icon }: Props) {
    return (
        <Grid container className="back-btn-avatar-wrapper">
            <Grid item xs={4}>
                <BackButton />
            </Grid>
            <Grid item xs={4} justifyContent="center" alignItems="center">
                <Avatar
                    sx={{
                        bgcolor: 'secondary.dark',
                        width: 48,
                        height: 48,
                    }}
                >
                    {Icon}
                </Avatar>
            </Grid>
            <Grid item xs={4} />
        </Grid>
    );
}

export default Hero;
