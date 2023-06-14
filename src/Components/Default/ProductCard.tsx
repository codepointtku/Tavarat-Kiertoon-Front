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
    type ButtonPropsSizeOverrides,
} from '@mui/material';
import { type OverridableStringUnion } from '@material-ui/types';
import Carousel from 'react-material-ui-carousel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

interface Props {
    productName: string;
    id: number;
    groupId: number;
    freeDescription: string;
    categoryName: string;
    storageName: string;
    colorName: string;
    measurements: string;
    weight: number;
    count: number;
    pictures: { id: number; picture_address: string }[];
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
    const [openInfo, setOpenInfo] = useState<Boolean>(false);
    const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout | null>(null);

    function handleHover(event: React.MouseEvent) {
        if (event.type === 'mouseenter') {
            setDelayHandler(setTimeout(() => setOpenInfo(true), 500));
        } else if (event.type === 'mouseleave') {
            setOpenInfo(false);
            delayHandler && clearTimeout(delayHandler);
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 300, height: 365 }}>
                <CardActionArea component={Box}>
                    <Carousel
                        animation="slide"
                        duration={850}
                        interval={2000}
                        autoPlay={false}
                        indicatorIconButtonProps={{ style: { color: '#bfe6f6' } }}
                        activeIndicatorIconButtonProps={{ style: { color: '#009bd8' } }}
                    >
                        {pictures.map((picture) => (
                            <Box key={picture.picture_address} component={Link} to={`/tuotteet/${id}`} color="inherit">
                                <CardMedia
                                    component={Box}
                                    sx={{ position: 'relative', alt: 'kuva' }}
                                    height={200}
                                    image={`${window.location.protocol}//${window.location.hostname}:8000/media/${picture.picture_address}`}
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
                                                <Typography variant="body2" fontWeight="fontWeightMediumBold">
                                                    Kuvaus: {freeDescription}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" fontWeight="fontWeightMediumBold">
                                                    Kategoria: {categoryName}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" fontWeight="fontWeightMediumBold">
                                                    Varastosijainti: {storageName}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" fontWeight="fontWeightMediumBold">
                                                    Väri: {colorName}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" fontWeight="fontWeightMediumBold">
                                                    Mitat: {measurements}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" fontWeight="fontWeightMediumBold">
                                                    Paino: {weight}
                                                </Typography>
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
                        onMouseEnter={(MouseEvent) => handleHover(MouseEvent)}
                        onMouseLeave={(MouseEvent) => handleHover(MouseEvent)}
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
                >
                    <CardActions>
                        <Button
                            variant="outlined"
                            component={Link}
                            to={`/tuotteet/${id}`}
                            size="small"
                            onMouseEnter={(MouseEvent) => handleHover(MouseEvent)}
                            onMouseLeave={(MouseEvent) => handleHover(MouseEvent)}
                        >
                            <InfoOutlinedIcon fontSize="small" />
                        </Button>
                        <AddToCartButton
                            size={
                                'small' as OverridableStringUnion<
                                    'small' | 'medium' | 'large',
                                    ButtonPropsSizeOverrides
                                >
                            }
                            id={id as number & string}
                            groupId={groupId}
                            count={count}
                        />
                    </CardActions>
                </Box>
            </Card>
        </Box>
    );
}

export default ProductCard;
