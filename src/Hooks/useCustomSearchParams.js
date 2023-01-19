import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// params is dictionary with url searchparams
// works as useState, paramState is dictionary, paramSet works as paramSet(key, value)
// use as: const [usedParams, setUsedParams] = useCustomSearchParams({ page: 2, rows: 10 })
const useCustomSearchParams = (params) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [paramState, setParamState] = useState();

    useEffect(() => {
        const newParams = {};
        Object.keys(params).forEach((key) => {
            if (searchParams.get(key) === null) {
                newParams[key] = params[key];
            } else {
                newParams[key] = searchParams.get(key);
            }
        }, []);
        setSearchParams(newParams);
    }, []);

    useEffect(() => {
        const newParams = {};
        const keys = Array.from(searchParams.keys());

        keys.forEach((key) => {
            newParams[key] = Number(searchParams.get(key));
        });
        setParamState(newParams);
    }, [searchParams]);

    const paramSet = (key, value) => {
        const iniParams = paramState;
        iniParams[key] = value;
        setSearchParams(iniParams);
    };

    return [paramState, paramSet];
};

export default useCustomSearchParams;
