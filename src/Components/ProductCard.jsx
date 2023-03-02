import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ProductCard({ productName, id, picture }) {
    const [addedToCart, setAddedToCart] = useState(false);
    const [addToCartButtonValue, setValue] = useState('Lisää koriin');

    const handleClickAddToCartBtn = () => {
        setAddedToCart(!addedToCart);
        setValue('Lisätty!');
    };

    return (
        <Box sx={{ minWidth: 180, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 320 }}>
                <CardActionArea component={Link} to={`/tuotteet/${id}`}>
                    <CardMedia
                        component="img"
                        alt="kuva"
                        height="200"
                        image={`http://localhost:8000/media/${picture}`}
                    />
                    <CardContent>
                        <Typography variant="h6">{productName}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.2rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant="outlined"
                            component={Link}
                            to={`/tuotteet/${id}`}
                            size="small"
                            // startIcon={<InfoOutlinedIcon />}
                        >
                            <InfoOutlinedIcon fontSize="small" />
                        </Button>
                        <Button
                            color={addedToCart ? 'success' : 'primary'}
                            size="small"
                            startIcon={<AddShoppingCartOutlinedIcon />}
                            onClick={handleClickAddToCartBtn}
                        >
                            {addToCartButtonValue}
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}

// Types not ready, string type for testing
ProductCard.propTypes = {
    productName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
};

export default ProductCard;
