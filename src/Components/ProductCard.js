import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

function ProductCard({ productName, description, dateAdded, id }) {
    const navigate = useNavigate();

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Yksinkertainen tuotekortti - /Components/ProductCard.js
                    </Typography>
                    <Typography>Product: {productName}</Typography>
                    <Typography>Desription: {description}</Typography>
                    <Typography>Date: {dateAdded}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        component={Link}
                        to={`/tuotteet?ID=${id}`}
                        onClick={() => navigate(`/tuotteet?ID=${id}`)}
                        size="small"
                    >
                        Linkki productDetails-sivulle
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

ProductCard.propTypes = {
    productName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default ProductCard;
