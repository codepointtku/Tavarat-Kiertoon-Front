import { useSubmit, useRouteLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Button } from '@mui/material';

function AddToCartButton({ size, id, productName }) {
    const { cart } = useRouteLoaderData('base');
    const submit = useSubmit();
    const cartItems = cart.map((item) => item.productName).filter((name) => name === productName);

    const handleClickAddToCartBtn = () => {
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
            color={cartItems.length > 0 ? 'success' : 'primary'}
            size={size}
            aria-label="add to shopping cart"
            startIcon={<AddShoppingCartOutlinedIcon />}
            onClick={handleClickAddToCartBtn}
        >
            Lisää koriin <br /> {cartItems.length > 0 && `(${cartItems.length}) kpl`}
        </Button>
    );
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
};

export default AddToCartButton;
