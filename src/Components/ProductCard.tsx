import { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

interface Props {
    productName: string;
    id: number;
    groupId: string;
    pictures: string[];
}

function ProductCard({ productName, id, groupId, pictures }: Props) {
    const [hoveredOver, setHoveredOver] = useState(false);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 300 }}>
                <CardActionArea component={Link} to={`/tuotteet/${id}`}>
                    <Carousel
                        className="carousel"
                        animation="slide"
                        duration={850}
                        interval={2000}
                        indicators={false}
                        autoPlay={hoveredOver}
                        navButtonsAlwaysInvisible
                    >
                        {pictures.map((picture) => (
                            <CardMedia
                                component="img"
                                alt="kuva"
                                height="200"
                                onMouseOut={() => setHoveredOver(true)}
                                // onMouseOut={() => setHoveredOver(false)}
                                image={`${window.location.protocol}//${window.location.hostname}:8000/media/${picture}`}
                            />
                        ))}
                    </Carousel>
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
