import useCustomSearchParams from '../Hooks/useCustomSearchParams';
import OrderListTable from './DataTable';

function OrdersList() {
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 1, rows: 5 }, 'page');

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
