import { useSearchParams } from 'react-router-dom';
import { UserOrders } from './OrdersHistory';

import { Grid, Pagination } from '@mui/material';

function UserOrderPagination({ userOrders }: UserOrders) {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageCount = Math.ceil(userOrders.count / userOrders.results.length);
    // location.href.includes('tilaushistoria') && setSearchParams({ tila: 'Toimitettu' });

    function handlePageChange(event: React.ChangeEvent<unknown>, newPage: number) {
        let assignedParams;
        if (searchParams.has('tila')) {
            assignedParams = {
                tila: searchParams.get('tila') as string,
                sivu: String(newPage),
            };
        } else {
            assignedParams = { sivu: String(newPage) };
        }
        setSearchParams(assignedParams);
    }

    return (
        <Grid justifyContent="center" sx={{ mt: 5 }} container>
            <Pagination
                size="large"
                color="primary"
                count={pageCount}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
            />
        </Grid>
    );
}

export default UserOrderPagination;
