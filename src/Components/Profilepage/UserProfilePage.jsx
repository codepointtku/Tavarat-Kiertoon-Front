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
                <Grid item xs={4} />
            </Grid>
            <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <TypographyTitle text="Käyttäjäprofiili" />
            </Box>
        </>
    );
}

function UserProfilePage() {
    const { userInfo, userOrders } = useLoaderData();

    // console.log('loaderin data:', data);

    //     {
    //     "id": 1,
    // "address_list": [
    // {
    //     "id": 7,
    //     "address": "kahvi123",
    //     "zip_code": "20100",
    //     "city": "turku",
    //     "user": 8
    // }
    //     "last_login": null,
    //     "name": null,
    //     "email": "super",
    //     "creation_date": "2023-04-13T07:59:30.142489Z",
    //     "phone_number": null,
    //     "username": "super",
    //     "groups": [
    //         {
    //             "id": 1,
    //             "name": "user_group",
    //             "permissions": []
    //         },
    //         {
    //             "id": 2,
    //             "name": "admin_group",
    //             "permissions": []
    //         },
    //         {
    //             "id": 3,
    //             "name": "storage_group",
    //             "permissions": []
    //         },
    //         {
    //             "id": 4,
    //             "name": "bicycle_group",
    //             "permissions": []
    //         }
    //     ],
    //     "user_permissions": []
    // }

    return (
        <Container maxWidth="lg" sx={{ marginTop: 2, marginBottom: 2 }}>
            <Hero />

            <Grid container flexDirection="row" justifyContent="space-around" sx={{ border: '1px solid blue' }}>
                <Grid item>
                    <ProfileInfo userInfo={userInfo} />
                </Grid>

                <Grid flexDirection="column" sx={{ border: '1px solid green' }}>
                    <Grid item>
                        <OrdersActive userOrders={userOrders} />
                    </Grid>

                    <Grid item>
                        <OrdersHistory userOrdersHistory={userOrders} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default UserProfilePage;
