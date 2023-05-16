import OrderListTable from './DataTable';
import useCustomSearchParams from '../../Hooks/useCustomSearchParams';

function OrdersList() {
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 0, rows: 5 });

    return usedParams ? (
        <OrderListTable page={usedParams.page} rowsPerPage={usedParams.rows} setUsedParams={setUsedParams} />
    ) : null;
}

export default OrdersList;
