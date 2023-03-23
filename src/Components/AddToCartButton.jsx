import { useState } from 'react';
import { useSubmit } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, IconButton, TextField } from '@mui/material';

function AddToCartButton({ size, id }) {
    // const { cartItems } = useRouteLoaderData('frontPage');
    const submit = useSubmit();
    const [amount, setAmount] = useState(1);
    console.log(amount, setAmount);

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

    // const itemsInCart = cartItems?.filter((item) => item.id === id);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Button
                size={size}
                aria-label="add to shopping cart"
                startIcon={<AddShoppingCartOutlinedIcon />}
                onClick={handleClickAddToCartBtn}
            >
                Lisää koriin
            </Button>
            <IconButton aria-label="vähennä yksi" size="small" color="primary">
                <RemoveCircleIcon fontSize="small" />
            </IconButton>
            <TextField align="center" minWidth={20} />
            <IconButton aria-label="lisää yksi" size="small" color="primary">
                <AddCircleIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}

{
    /* <Input type="number" sx={{ width: 30 }} />; */
}
{
    /* <Button
                color={itemsInCart?.length > 0 ? 'success' : 'primary'}
                size={size}
                aria-label="add to shopping cart"
                startIcon={<AddShoppingCartOutlinedIcon />}
                onClick={handleClickAddToCartBtn}
            >
                Lisää koriin <br /> {cartItems?.map((item) => item.id === id && `(${item.count}) kpl`)}
            </Button> */
}

AddToCartButton.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default AddToCartButton;
