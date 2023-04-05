import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

interface Props {
    productName: string;
    id: number;
    groupId: string;
    picture: string;
}

function ProductCard({ productName, id, groupId, picture }: Props) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 300 }}>
                <CardActionArea component={Link} to={`/tuotteet/${id}`}>
                    <CardMedia
                        component="img"
                        alt="kuva"
                        height="200"
                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${picture}`}
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
                        <AddToCartButton size="small" id={id} groupId={groupId} />
                    </CardActions>
                </Box>
            </Card>
        </Box>
    );
}

export default ProductCard;
