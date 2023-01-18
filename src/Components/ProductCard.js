import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductCard({ productName, description, dateAdded, id }) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card>
                <CardContent>
                    <CardMedia
                        component="img"
                        alt="kuva"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                    />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Yksinkertainen tuotekortti - /Components/ProductCard.js
                    </Typography>
                    <Typography>Product: {productName}</Typography>
                    <Typography>Desription: {description}</Typography>
                    <Typography>Date: {dateAdded}</Typography>
                </CardContent>
                <CardActions>
                    <Button component={Link} to={`/tuotteet/${id}`} size="small">
                        Linkki productDetails-sivulle
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
    dateAdded: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default ProductCard;
