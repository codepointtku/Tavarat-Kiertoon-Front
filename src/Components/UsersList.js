import UsersListTable from './UsersListTable';
import useCustomSearchParams from '../Hooks/useCustomSearchParams';

function UsersList() {
    const [usedParams, setUsedParams] = useCustomSearchParams({ page: 0, rows: 5 });

    return (
        usedParams && (
            <UsersListTable page={usedParams.page} rowsPerPage={usedParams.rows} setUsedParams={setUsedParams} />
        )
    );
}

export default UsersList;
