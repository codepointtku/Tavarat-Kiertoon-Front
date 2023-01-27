import { useEffect, useState } from 'react';
import { useLocation, useNavigate, generatePath } from 'react-router';

function AddItem() {
    const location = useLocation();
    const navigate = useNavigate();
    const [item, setItem] = useState();

    useEffect(() => {
        setItem(location.state);
    }, [location]);

    console.log(location);

    return (
        <>
            <button
                type="button"
                onClick={() => navigate(generatePath('/varasto/koodinlukija'), { state: { ...item } })}
            >
                Lue viivakoodi
            </button>
            <h1>Add items</h1>
        </>
    );
}

export default AddItem;
