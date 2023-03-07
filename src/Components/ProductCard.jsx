import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function ProductCard({ productName, id, picture }) {
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
                    <Button
                        variant="outlined"
                        component={Link}
                        to={`/tuotteet/${id}`}
                        size="small"
                        sx={{ marginRight: 1 }}
                        startIcon={<InfoOutlinedIcon />}
                    >
                        Lisää tietoa
                    </Button>
                    <AddToCartButton size="small" id={id} />
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
