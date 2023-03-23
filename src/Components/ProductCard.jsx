import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function ProductCard({ productName, id, picture }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 400 }}>
                <CardActionArea component={Link} to={`/tuotteet/${id}`}>
                    <CardMedia
                        component="img"
                        alt="kuva"
                        height="200"
                        image={`http://localhost:8000/media/${picture}`}
                    />
                    <CardContent>
                        <Typography variant="h6" fontWeight="fontWeightLight" lineHeight="1">
                            {productName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '0.2rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CardActions>
                        <Button variant="outlined" component={Link} to={`/tuotteet/${id}`} size="small">
                            <InfoOutlinedIcon fontSize="small" />
                        </Button>
                        <AddToCartButton size="small" id={id} />
                    </CardActions>
                </Box>
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
