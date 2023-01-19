import useCustomSearchParams from '../Hooks/useCustomSearchParams';
import OrderListTable from './DataTable';

function OrdersList() {
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 2, rows: 10 });

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setUsedParams('page', usedParams.page + 1);
                }}
            >
                Test
            </button>
            {usedParams && <h1>{usedParams.page}</h1>}
            <OrderListTable />
        </>
    );
}

export default OrdersList;
