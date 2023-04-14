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
    Tooltip,
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
    freeDescription: string;
    categoryName: string;
    storageName: string;
    colorName: string;
    measurements: number;
    weight: number;
    count: number;
    pictures: string[];
}

function ProductCard({
    productName,
    id,
    groupId,
    pictures,
    freeDescription,
    categoryName,
    storageName,
    colorName,
    measurements,
    weight,
    count,
}: Props) {
    const [openInfo, setOpenInfo] = useState(false);

    function handleHover(event: any) {
        event.type === 'mouseover' ? setOpenInfo(true) : setOpenInfo(false);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 300 }}>
                <CardActionArea component={Box}>
                    <Carousel animation="slide" duration={850} interval={2000} autoPlay={false}>
                        {pictures.map((picture) => (
                            <Box key={picture} component={Link} to={`/tuotteet/${id}`} color="inherit">
                                <CardMedia
                                    component={Box}
                                    sx={{ position: 'relative', alt: 'kuva' }}
                                    height={200}
                                    image={`${window.location.protocol}//${window.location.hostname}:8000/media/${picture}`}
                                >
                                    {openInfo && (
                                        <Grid
                                            container
                                            direction="column"
                                            sx={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                paddingLeft: 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                                backdropFilter: 'blur(6px)',
                                            }}
                                            justifyContent="space-evenly"
                                        >
                                            <Grid item>
                                                <Typography variant="body2">Kuvaus: {freeDescription}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2">Kategoria: {categoryName}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2">Varastosijainti: {storageName}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2">Väri: {colorName}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2">Mitat: {measurements}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2">Paino: {weight}</Typography>
                                            </Grid>
                                        </Grid>
                                    )}
                                </CardMedia>
                            </Box>
                        ))}
                    </Carousel>
                    <CardContent
                        component={Grid}
                        direction="row"
                        justifyContent="space-between"
                        onMouseOver={(MouseEvent) => handleHover(MouseEvent)}
                        onMouseOut={(MouseEvent) => handleHover(MouseEvent)}
                        container
                    >
                        <Typography variant="h6" fontWeight="fontWeightLight" lineHeight="1">
                            {productName}
                        </Typography>
                        <Tooltip title="määrä varastossa" placement="bottom" sx={{ color: 'primary.main' }} arrow>
                            <Typography variant="subtitle1" fontWeight="400" lineHeight="1" sx={{ mt: 0.5 }}>
                                {count} kpl
                            </Typography>
                        </Tooltip>
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
                    onMouseOver={(MouseEvent) => handleHover(MouseEvent)}
                    onMouseOut={(MouseEvent) => handleHover(MouseEvent)}
                >
                    <CardActions>
                        <Button variant="outlined" component={Link} to={`/tuotteet/${id}`} size="small">
                            <InfoOutlinedIcon fontSize="small" />
                        </Button>
                        <AddToCartButton size="small" id={id} groupId={groupId} count={count} />
                    </CardActions>
                </Box>
            </Card>
        </Box>
    );
}

export default ProductCard;
