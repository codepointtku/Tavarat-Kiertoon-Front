// import { useState, useEffect } from 'react';
import { useRouteLoaderData /*, useSearchParams */ } from 'react-router-dom';

import { Box, Grid, Container /*, Select, FormControl, InputLabel, MenuItem, Stack */ } from '@mui/material';

import OrderCard from './OrderCard';
// import UserOrderPagination from './UserOrderPagination';
import TypographyTitle from '../../TypographyTitle';

// import type { UserOrders } from './OrdersHistory';
import type { userInfoLoader } from '../../../Router/loaders';
import { type OrderUser } from '../../../api';

function OrdersActive() {
    // const { userOrders } = useRouteLoaderData('account') as Awaited<UserOrders>;
    const { userOrders } = useRouteLoaderData('account') as Awaited<ReturnType<typeof userInfoLoader>>;
    // const orderCards = userOrders?.results?.map((order) => <OrderCard key={order.id} orderInfo={order} />);

    const filteredOrders = userOrders?.results
        ?.filter((order: OrderUser) => order.status === 'Waiting' || order.status === 'Processing')
        .map((order: any) => <OrderCard key={order.id} orderInfo={order} />);

    // useEffect(() => {
    //     switch (filter.status) {
    //         case 'waiting':
    //             setSearchParams({ järjestys: searchParams.get('järjestys') as string, tila: 'Odottaa' });
    //             break;
    //         case 'processing':
    //             setSearchParams({ järjestys: searchParams.get('järjestys') as string, tila: 'Käsitellään' });
    //             break;
    //         case 'all':
    //             setSearchParams({ järjestys: searchParams.get('järjestys') as string, tila: 'Aktiivinen' });
    //             break;
    //     }
    // }, [filter.status]);

    // useEffect(() => {
    //     switch (filter.ordering) {
    //         case 'creationDateDescending':
    //             setSearchParams({ tila: searchParams.get('tila') as string, järjestys: 'Uusinensin' });
    //             break;
    //         case 'creationDateAscending':
    //             setSearchParams({ tila: searchParams.get('tila') as string, järjestys: 'Vanhinensin' });
    //             break;
    //         case 'statusDescending':
    //             setSearchParams({ tila: searchParams.get('tila') as string, järjestys: 'Normaalitilanmukaan' });
    //             break;
    //         case 'statusAscending':
    //             setSearchParams({ tila: searchParams.get('tila') as string, järjestys: 'Käänteinentilanmukaan' });
    //             break;
    //     }
    // }, [filter.ordering]);

    return (
        <Box id="active-orders-container">
            {/* <Stack
                direction="row"
                gap="1rem"
                justifyContent="flex-end"
                flexWrap="wrap"
                sx={{ margin: '2rem 0 1rem 0' }}
            >
                <FormControl>
                    <InputLabel id="filter-ordering-label">Järjestys</InputLabel>
                    <Select
                        labelId="filter-ordering-label"
                        label="Järjestys"
                        value={filter.ordering}
                        onChange={(event) => setFilter({ ordering: event.target.value, status: filter.status })}
                        sx={{ width: 240 }}
                    >
                        <MenuItem value="creationDateDescending">Uusin ensin</MenuItem>
                        <MenuItem value="creationDateAscending">Vanhin ensin</MenuItem>
                        <MenuItem value="statusDescending">Käänteinen tilan mukaan</MenuItem>
                        <MenuItem value="statusAscending">Normaali tilan mukaan</MenuItem>
                    </Select>
                </FormControl> */}

            {/* </Stack> */}
            <Grid container direction="row" gap={5} justifyContent="center" sx={{ p: 2, mt: 2 }}>
                {filteredOrders?.length === 0 ? (
                    <Container sx={{ mt: 2 }}>
                        <TypographyTitle text="Ei aktiivisia tilauksia" />
                    </Container>
                ) : (
                    filteredOrders
                )}
            </Grid>
            {/* <UserOrderPagination userOrders={userOrders} /> */}
        </Box>
    );
}

export default OrdersActive;
