import { Avatar, Grid, SvgIcon } from '@mui/material';

import BackButton from './BackButton';

// USAGE: Back Button & Avatar/Icon -block container, used in pages hero element.
// Takes in Material UI Icon as a prop.

// EXAMPLE: (@ExampleComponent.tsx):
// // import YourIcon from '@mui/icons-material/YourIcon';
// // import HeroHeader from './Components/HeroHeader';

// // <HeroHeader Icon={<YourIcon />} />;

interface Props {
    Icon: React.ReactNode;
    hideInAdmin?: boolean;
}

function HeroHeader({ Icon, hideInAdmin }: Props) {
    return (
        <Grid container className="back-btn-avatar-wrapper-hero-header">
            <Grid item xs={4}>
                {!hideInAdmin && <BackButton />}
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Avatar
                    sx={{
                        bgcolor: 'secondary.dark',
                        width: 48,
                        height: 48,
                    }}
                >
                    <SvgIcon fontSize="large">{Icon}</SvgIcon>
                </Avatar>
            </Grid>
            <Grid item xs={4} />
        </Grid>
    );
}

export default HeroHeader;
