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
    const [ind, setInd] = useState(0);

    function onHover(e: any) {
        console.log(e.type);
        const CarouselInterval = setInterval(() => setInd((ind) => (ind === pictures.length ? 0 : ind + 1)), 4000);
        // console.log(ind);
        e.type === 'mouseout' && clearInterval(CarouselInterval);
    }

    // console.log(ind);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 300 }}>
                <CardActionArea component={Link} to={`/tuotteet/${id}`}>
                    <Carousel
                        index={ind}
                        animation="slide"
                        duration={850}
                        indicators={false}
                        autoPlay={false}
                        navButtonsAlwaysInvisible
                    >
                        {pictures.map((picture) => (
                            <CardMedia
                                key={picture}
                                component="img"
                                alt="kuva"
                                height="200"
                                onMouseOver={(MouseEvent) => onHover(MouseEvent)}
                                onMouseOut={(MouseEvent) => onHover(MouseEvent)}
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
