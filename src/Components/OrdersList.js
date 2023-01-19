import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import OrderListTable from './DataTable';

function OrdersList() {
    const [searchParams, setSearchParams] = useSearchParams();

    const useCheckSearchParams = (params, check) => {
        const [paramState, setParamState] = useState();

        useEffect(() => {
            if (searchParams.get(check) === null) {
                setSearchParams(params);
            }
        }, []);

        useEffect(() => {
            const newParams = {};
            const keys = Array.from(searchParams.keys());

            keys.forEach((key) => {
                newParams[key] = searchParams.get(key);
            });
            setParamState(newParams);
            console.log(newParams);
        }, [searchParams]);

        const paramSet = (key, value) => {
            const iniParams = paramState;
            iniParams[key] = value;
            setSearchParams(iniParams);
        };

        return [paramState, paramSet];
    };

    const [usedParams, setUsedParams] = useCheckSearchParams({ page: 1, rows: 5 }, 'page');

    useEffect(() => {
        console.log(usedParams);
    }, [usedParams]);

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
