import { useLoaderData } from 'react-router';
import UsersListTable from './UsersListTable';
import useCustomSearchParams from '../../Hooks/useCustomSearchParams';

function UsersList() {
    const data = useLoaderData();
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 0, rows: 5 });

    return (
        usedParams && (
            <UsersListTable
                page={usedParams.page}
                rowsPerPage={usedParams.rows}
                setUsedParams={setUsedParams}
                users={data}
            />
        )
    );
}

export default UsersList;
