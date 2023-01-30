import { useEffect, useState } from 'react';
import { useLocation, useNavigate, generatePath } from 'react-router';

function AddItem() {
    // empty location.state when item is finally added and site navigates away!
    const location = useLocation();
    const navigate = useNavigate();
    const [item, setItem] = useState();

    useEffect(() => {
        if (location.state) {
            setItem(location.state);
        } else {
            setItem({
                name: '',
                id: '',
                barcode: '',
                category: '',
                location: '',
                oldItem: false,
            });
        }
        if (location.state && location.state.oldItem) {
            // setItem to oldItem when barcode scanning is used to add existing item
            // add call here to back-end to bring in item details
            console.log('oldItem');
        }
    }, [location]);

    console.log(item);

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
