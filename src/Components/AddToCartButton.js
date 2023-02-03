import { useState } from 'react';
import PropTypes from "prop-types";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Button } from '@mui/material';


function AddToCartButton({size, productName}){
    const [addedToCart, setAddedToCart] = useState(false);
    const [addToCartButtonValue, setValue] = useState('Lisää koriin');

    const handleClickAddToCartBtn = () => {
        setAddedToCart(!addedToCart);
        setValue(addToCartButtonValue === 'Lisätty!' ? 'Lisää koriin' : 'Lisätty!');
        console.log(productName);
    }

    return (
        <Button
            color={addedToCart ? 'success' : 'primary'}
            size={size}
            aria-label="add to shopping cart"
            startIcon={<AddShoppingCartOutlinedIcon />}
            onClick={handleClickAddToCartBtn}
        >
        {addToCartButtonValue}
        </Button>
    )

}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired
}

export default AddToCartButton