import { useEffect } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

function PasswordResetNavigate() {
    const navigate = useNavigate();
    const { uid, token } = useParams();
    useEffect(() => {
        navigate(generatePath('/salasananpalautus'), { replace: true, state: { uid, token } });
    }, []);
}

export default PasswordResetNavigate;
