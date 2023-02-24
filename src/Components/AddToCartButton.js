import { useSubmit, useRouteLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Button } from '@mui/material';

function AddToCartButton({ size, id, name }) {
    const { cartItems } = useRouteLoaderData('root');
    const submit = useSubmit();

    const handleClickAddToCartBtn = () => {
        submit(
            { id, name },
            {
                method: 'post',
                action: '/',
            }
        );
    };

    const itemsInCart = cartItems.filter((item) => item.id === id);
    console.log(itemsInCart);

    // cartItems.map((item) => console.log(Object.values(item).includes()));
    // console.log(cartItems);

    return (
        <Button
            color={itemsInCart.length > 0 ? 'success' : 'primary'}
            size={size}
            aria-label="add to shopping cart"
            startIcon={<AddShoppingCartOutlinedIcon />}
            onClick={handleClickAddToCartBtn}
        >
            Lisää koriin <br /> {cartItems.map((item) => item.id === id && `(${item.count}) kpl`)}
        </Button>
    );
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default AddToCartButton;
