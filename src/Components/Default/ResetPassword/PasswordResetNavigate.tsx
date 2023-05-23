import { Navigate, useParams } from 'react-router-dom';

function PasswordResetNavigate() {
    const { uid, token } = useParams();

    return <Navigate to="/salasananpalautus" replace state={{ uid, token }} />;
}

export default PasswordResetNavigate;
