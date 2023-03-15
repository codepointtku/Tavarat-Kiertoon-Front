import { useSubmit, useRouteLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Button } from '@mui/material';

function AddToCartButton({ size, id }) {
    const { cartItems } = useRouteLoaderData('frontPage');
    const submit = useSubmit();

    // mitä tietoa back endiin menee kun lomake lähetetään

    const handleClickAddToCartBtn = async () => {
        submit(
            { id },
            {
                method: 'put',
                action: '/',
            }
        );
    };

    const itemsInCart = cartItems?.filter((item) => item.id === id);

    return (
        <Button
            color={itemsInCart?.length > 0 ? 'success' : 'primary'}
            size={size}
            aria-label="add to shopping cart"
            startIcon={<AddShoppingCartOutlinedIcon />}
            onClick={handleClickAddToCartBtn}
        >
            Lisää koriin <br /> {cartItems?.map((item) => item.id === id && `(${item.count}) kpl`)}
        </Button>
    );
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default AddToCartButton;
