import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useCustomSearchParams = (params, check) => {
    const [searchParams, setSearchParams] = useSearchParams();
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

export default useCustomSearchParams;
