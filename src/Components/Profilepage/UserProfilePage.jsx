import { useLoaderData } from 'react-router-dom';

import { Avatar, Box, Container, Grid } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';

import BackButton from '../BackButton';
import TypographyTitle from '../TypographyTitle';

import ProfileInfo from './ProfileInfo';
import OrdersActive from './OrdersActive';
import OrdersHistory from './OrdersHistory';

function Hero() {
    const iconHover = {
        '&:hover .MuiAvatar-root': {
            backgroundColor: 'secondary.dark',
        },
    };

    return (
        <>
            <Grid container>
                <Grid item xs={4}>
                    <BackButton />
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={[
                        iconHover,
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    ]}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.main',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <Person2Icon />
                    </Avatar>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <TypographyTitle text="Käyttäjäprofiili" />
            </Box>
        </>
    );
}

function UserProfilePage() {
    const data = useLoaderData();

    return (
        <Container maxWidth="lg" sx={{ marginTop: 2, marginBottom: 2 }}>
            <Hero />
            <ProfileInfo data={data} />
            <OrdersActive data={data} />
            <OrdersHistory data={data} />
        </Container>
    );
}

export default UserProfilePage;
