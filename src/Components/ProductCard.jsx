import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function ProductCard({ productName, id, groupId, picture, amount }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 400 }}>
                <CardActionArea component={Link} to={`/tuotteet/${id}`}>
                    <CardMedia
                        component="img"
                        alt="kuva"
                        height="200"
                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${picture}`}
                    />
                    <CardContent component={Grid} direction="row" justifyContent="space-between" container>
                        <Typography variant="h6" fontWeight="fontWeightLight" lineHeight="1">
                            {productName}
                        </Typography>
                        <Typography variant="string" fontWeight="400" lineHeight="1" sx={{ mt: 0.5 }}>
                            Varastossa {amount} kpl
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
                        <AddToCartButton size="small" id={id} groupId={groupId} />
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
    groupId: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
};

export default ProductCard;
