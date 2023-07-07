import { useState, useEffect } from 'react';
import { useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { Box, Grid, Typography, Container, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import OrderCard from './OrderCard';
import UserOrderPagination from './UserOrderPagination';
import TypographyTitle from '../../TypographyTitle';
import { UserOrders } from './OrdersHistory';

function ProfileInfo() {
    const [filter, setFilter] = useState({ ordering: 'creationDateDescending', status: 'all' });
    const [searchParams, setSearchParams] = useSearchParams();
    const { userOrders } = useRouteLoaderData('profile') as Awaited<UserOrders>;

    const activeOrders = userOrders.results.filter((order) => order.status !== 'Finished');
    const activeOrdersCards = activeOrders.map((order) => <OrderCard key={order.id} orderInfo={order} />);

    useEffect(() => {
        switch (filter.ordering) {
            case 'creationDateDescending':
                setSearchParams();
                break;
        }
    }, [filter]);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" color="primary.main" align="center">
                Aktiiviset tilaukset
            </Typography>
            <Box sx={{ width: '100%', px: 10 }}>
                <Grid container direction="row" justifyContent="flex-end" gap={2}>
                    <Grid item alignSelf="center">
                        <Typography variant="h6" color="primary.main" align="right">
                            Filteröinti
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="filter-ordering-label">Järjestys</InputLabel>
                            <Select
                                labelId="filter-ordering-label"
                                label="Järjestys"
                                value={filter.ordering}
                                onChange={(event) => setFilter({ ordering: event.target.value, status: filter.status })}
                                sx={{ width: 240 }}
                            >
                                <MenuItem value="creationDateDescending">Uusin ensin tilauspäivän mukaan</MenuItem>
                                <MenuItem value="creationDateAscending">Vanhin ensin tilauspäivän mukaan</MenuItem>
                                <MenuItem value="statusDescending">Uusin ensin tilan mukaan</MenuItem>
                                <MenuItem value="statusAscending">Vanhin ensin tilan mukaan</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="filter-status-label">Tila</InputLabel>
                            <Select
                                labelId="filter-status-label"
                                label="Tila"
                                value={filter.status}
                                onChange={(event) =>
                                    setFilter({ ordering: filter.ordering, status: event.target.value })
                                }
                                sx={{ width: 240 }}
                            >
                                <MenuItem value="waiting">Odottaa</MenuItem>
                                <MenuItem value="processing">Käsittelyssä</MenuItem>
                                <MenuItem value="all">Kaikki</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Grid container direction="row" gap={5} justifyContent="center" sx={{ p: 2, mt: 2 }}>
                {activeOrdersCards.length === 0 ? (
                    <Container sx={{ mt: 2 }}>
                        <TypographyTitle text="Ei aktiivisia tilauksia" />
                    </Container>
                ) : (
                    activeOrdersCards
                )}
            </Grid>
            <UserOrderPagination userOrders={userOrders} />
        </Box>
    );
}

export default ProfileInfo;
