import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ProductCard({ productName, description, id }) {
    const [addedToCart, setAddedToCart] = useState(false);
    const [addToCartButtonValue, setValue] = useState('Lisää koriin');

    const handleClickAddToCartBtn = () => {
        setAddedToCart(!addedToCart);
        setValue('Lisätty!');
    };

    return (
        <Box sx={{ minWidth: 240 }}>
            <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                    <Link to={`/products/${id}`}>
                        <CardMedia component="img" alt="kuva" height="200" image="br.jpg" />
                    </Link>
                    <CardContent>
                        <Typography variant="h6">{productName}</Typography>
                        <Typography variant="body2" paragraph>
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        variant="outlined"
                        component={Link}
                        to={`/tuotteet/${id}`}
                        size="small"
                        startIcon={<InfoOutlinedIcon />}
                    >
                        Lisää tietoa
                    </Button>
                    <Button
                        color={addedToCart ? 'success' : 'primary'}
                        size="small"
                        startIcon={<AddShoppingCartOutlinedIcon />}
                        onClick={handleClickAddToCartBtn}
                    >
                        {addToCartButtonValue}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

// Types not ready, string type for testing
ProductCard.propTypes = {
    productName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default ProductCard;
