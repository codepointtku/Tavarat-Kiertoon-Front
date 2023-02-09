import { useState } from 'react';
import PropTypes from 'prop-types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Button } from '@mui/material';
import { useSubmit } from 'react-router-dom';

function AddToCartButton({ size, id, productName }) {
    const [addedToCart, setAddedToCart] = useState(false);
    const [itemCount, setItemCount] = useState(null);
    const submit = useSubmit();

    const handleClickAddToCartBtn = () => {
        setAddedToCart(!addedToCart);
        // To do: Lisää timer
        setItemCount((prevCount) => `(${prevCount + 1} kpl)`);
        submit(
            { id, productName },
            {
                method: 'post',
                action: '/',
            }
        );
    };

    return (
        <Button
            color={addedToCart ? 'success' : 'primary'}
            size={size}
            aria-label="add to shopping cart"
            startIcon={<AddShoppingCartOutlinedIcon />}
            onClick={handleClickAddToCartBtn}
        >
            Lisää koriin <br /> {itemCount}
        </Button>
    );
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
};

export default AddToCartButton;
