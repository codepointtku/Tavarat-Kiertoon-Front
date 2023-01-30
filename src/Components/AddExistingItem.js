import { useNavigate, generatePath } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

function AddExistingItem({ item }) {
    const navigate = useNavigate();
    return (
        <>
            Lisää Esine viivakoodin perusteella
            <Button
                onClick={() => navigate(generatePath('/varasto/koodinlukija'), { state: { ...item, oldItem: true } })}
            >
                Lue Viivakoodi
            </Button>
            Lisää olemassaolevaan esineryhmään
            <Button>Lue Viivakoodi</Button>
        </>
    );
}

AddExistingItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        barcode: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        location: PropTypes.string,
        isOld: PropTypes.bool,
    }).isRequired,
};

export default AddExistingItem;
