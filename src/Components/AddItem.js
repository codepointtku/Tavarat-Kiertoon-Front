import { useLocation, useNavigate, generatePath } from 'react-router';

function AddItem() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);

    return (
        <>
            <button type="button" onClick={() => navigate(generatePath('/varasto/koodinlukija'))}>
                Lue viivakoodi
            </button>
            <h1>Add items</h1>
        </>
    );
}

export default AddItem;
