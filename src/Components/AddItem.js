import { useLocation, useNavigate } from 'react-router';

function AddItem() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <button type="button" onClick={() => navigate('varasto/koodinlukija')}>
                Lue viivakoodi
            </button>
            <h1>Add items</h1>
            {location.state}
        </>
    );
}

export default AddItem;
