import { Link } from 'react-router-dom';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import {
    Box,
    IconButton,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Link as MuiLink,
    Stack,
    type ButtonPropsSizeOverrides,
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { type OverridableStringUnion } from '@material-ui/types';

import AddToCartButton from './AddToCartButton';
import Tooltip from '../Tooltip';

interface Props {
    productName: string;
    id: number;
    groupId: number;
    freeDescription: string;
    categoryName: string;
    storageName: string;
    colors: {
        id: number;
        name: string;
        default: boolean;
    }[];
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
    colors,
    measurements,
    weight,
    count,
}: Props) {
    const [openInfo, setOpenInfo] = useState<Boolean>(false);
    const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout | null>(null);

    function handleHover(event: React.MouseEvent) {
        if (event.type === 'mouseenter') {
            setDelayHandler(setTimeout(() => setOpenInfo(true), 200));
        } else if (event.type === 'mouseleave') {
            setOpenInfo(false);
            delayHandler && clearTimeout(delayHandler);
        }
    }
    return (
        <Card
            sx={{
                width: 276,
                height: 480,
                transition: 'transform 0.1s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
        >
            <CardActionArea component={Box}>
                <Carousel
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
                                height={300}
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
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
                                        {/* <Grid item>
                                            <Typography variant="body2" fontWeight="fontWeightMediumBold">
                                                Varastosijainti: {storageName}
                                            </Typography>
                                        </Grid> */}
                                        <Grid item>
                                            <Typography variant="body2" fontWeight="fontWeightMediumBold">
                                                Väri:{' '}
                                                {colors.map((color) => {
                                                    return `${color.name}, `;
                                                })}
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
                    <Grid container alignItems="center">
                        <Grid item xs={10}>
                            <Typography
                                fontWeight="fontWeightThin"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                            >
                                <MuiLink
                                    component={Link}
                                    to={`/tuotteet/${id}`}
                                    underline="none"
                                    variant="h6"
                                    fontWeight="fontWeightThin"
                                    color="#000"
                                >
                                    {productName}
                                </MuiLink>
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Tooltip title="tilattavissa">
                                <Typography variant="body2" fontWeight="fontWeigthThin">
                                    {count} kpl
                                </Typography>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CardActions>
                    <Stack direction="row" gap={2}>
                        <Tooltip title="Tuotetiedot">
                            <IconButton
                                sx={{
                                    '&.MuiButtonBase-root:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                                component={Link}
                                to={`/tuotteet/${id}`}
                                size="small"
                            >
                                <InfoOutlinedIcon fontSize="large" color="primary" />
                            </IconButton>
                        </Tooltip>
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
                    </Stack>
                </CardActions>
            </Box>
        </Card>
    );
}

export default ProductCard;
