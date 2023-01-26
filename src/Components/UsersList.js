import { useLoaderData } from 'react-router-dom';
import UsersListTable from './UsersListTable';
import useCustomSearchParams from '../Hooks/useCustomSearchParams';

function UsersList() {
    const data = useLoaderData();
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 0, rows: 5 });

    return (
        usedParams && (
            <UsersListTable
                page={usedParams.page}
                rowsPerPage={usedParams.rows}
                setUsedParams={setUsedParams}
                rows={data}
            />
        )
    );
}

export default UsersList;
