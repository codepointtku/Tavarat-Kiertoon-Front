// import { useState } from 'react';
import { useRouteLoaderData /* useSearchParams */ } from 'react-router-dom';
import { Box, Grid, Container /* Stack, FormControl, InputLabel, Select, MenuItem */ } from '@mui/material';
// import { OrderDetailResponse } from '../../../api';

import OrderCard from './OrderCard';
// import UserOrderPagination from './UserOrderPagination';
import TypographyTitle from '../../TypographyTitle';

import type { userInfoLoader } from '../../../Router/loaders';

// export interface UserOrders {
//     userOrders: { count: number; results: OrderDetailResponse[] };
// }

function OrdersHistory() {
    const { userOrders } = useRouteLoaderData('account') as Awaited<ReturnType<typeof userInfoLoader>>;

    // const [filter, setFilter] = useState({ ordering: 'creationDateDescending', status: 'finished' });

    // const [searchParams, setSearchParams] = useSearchParams();

    // const handleVaihto = (event: any) => {
    //     switch (filter.ordering) {
    //         case 'creationDateDescending':
    //             setFilter({ ordering: event.target.value, status: filter.status });
    //             setSearchParams({ järjestys: 'vanhinensin' });
    //             break;
    //         case 'creationDateAscending':
    //             setFilter({ ordering: event.target.value, status: filter.status });
    //             setSearchParams({ järjestys: 'uusinensin' });
    //             break;
    //     }
    // };

    const filteredOrders = userOrders?.results
        ?.filter((order) => order.status === 'Finished')
        .map((order) => <OrderCard key={order.id} orderInfo={order} />);

    return (
        <Box id="orders-history-container">
            {/* <Stack direction="row" justifyContent="flex-end" flexWrap="wrap" sx={{ margin: '2rem 0 1rem 0' }}>
                <FormControl>
                    <InputLabel id="filter-ordering-label">Järjestys</InputLabel>
                    <Select
                        labelId="filter-ordering-label"
                        label="Järjestys"
                        value={filter.ordering}
                        onChange={handleVaihto}
                        sx={{ width: 240 }}
                    >
                        <MenuItem value="creationDateDescending">Uusin ensin</MenuItem>
                        <MenuItem value="creationDateAscending">Vanhin ensin</MenuItem>
                    </Select>
                </FormControl>
            </Stack> */}

            <Grid direction="row" gap={5} justifyContent="center" sx={{ mt: 2, p: 2 }} container>
                {filteredOrders?.length === 0 ? (
                    <Container sx={{ mt: 2 }}>
                        <TypographyTitle text="Ei valmiita tilauksia" />
                    </Container>
                ) : (
                    filteredOrders
                )}
            </Grid>
            {/* <UserOrderPagination userOrders={userOrders} /> */}
        </Box>
    );
}

export default OrdersHistory;
