import { useState } from 'react';
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
    const [hover, setHover] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    // const [ind, setInd] = useState(0);

    // function onHover(e: any) {
    //     console.log(e.type);
    //     let CarouselInterval;
    //     e.type === 'mouseover'
    //         ? (CarouselInterval = setInterval(() => setInd((ind) => (ind === pictures.length ? 0 : ind + 1)), 4000))
    //         : clearInterval(CarouselInterval);
    //     // console.log(ind);
    // }

    function onHover(e: any) {
        console.log(e.type);
        e.type === 'mouseover' ? setHover(true) : setTimeout(() => setHover(false), 3000);
    }

    console.log(hover);

    // alt="kuva"
    // height="200"

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 300 }}>
                <CardActionArea component={Link} to={`/tuotteet/${id}`}>
                    {openInfo ? (
                        <>
                            <CardMedia
                                sx={{
                                    position: 'relative',
                                    alt: 'kuva',
                                }}
                                height={200}
                                component={Box}
                                image={`${window.location.protocol}//${window.location.hostname}:8000/media/${pictures[0]}`}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                        backdropFilter: 'blur(6px)',
                                    }}
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography variant="h6">info</Typography>
                                    </Grid>
                                </Grid>
                            </CardMedia>
                            {/* <Box
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    filter: 'blur(6px)',
                                    zIndex: 1,
                                }}
                            /> */}
                        </>
                    ) : (
                        <Carousel
                            // index={ind}
                            animation="slide"
                            duration={850}
                            interval={2000}
                            indicators={false}
                            autoPlay={hover}
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
                    )}
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
                    onMouseOver={() => setOpenInfo(true)}
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
