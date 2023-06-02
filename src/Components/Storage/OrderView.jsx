import OrderTable from './OrderTable';
import useCustomSearchParams from '../../Hooks/useCustomSearchParams';

function OrderView() {
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 0, rows: 5 });

    return usedParams ? (
        <OrderTable page={usedParams.page} rowsPerPage={usedParams.rows} setUsedParams={setUsedParams} />
    ) : null;
}

export default OrderView;
