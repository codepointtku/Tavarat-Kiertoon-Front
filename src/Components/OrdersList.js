import { useLoaderData } from "react-router-dom";

import OrderListTable from './DataTable';
import useCustomSearchParams from '../Hooks/useCustomSearchParams';



function OrdersList() {
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 0, rows: 5 });
    const data = useLoaderData();
    console.log(data)

    return (
        usedParams && (
            <OrderListTable page={usedParams.page} rowsPerPage={usedParams.rows} setUsedParams={setUsedParams} />
        )
    );
}

export default OrdersList;
