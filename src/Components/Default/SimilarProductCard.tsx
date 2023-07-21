import { Link } from 'react-router-dom';

import {
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    CardHeader,
    Box,
    Grid,
    type ButtonPropsSizeOverrides,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import { type OverridableStringUnion } from '@material-ui/types';
import AddToCartButton from './AddToCartButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface SimilarProduct {
    product: {
        id: number & string;
        amount: number;
        color: [number];
        free_description: string;
        measurements: string;
        name: string;
        weight: number;
        pictures: [{ id: number; picture_address: string }];
    };
}

function SimilarProductCard({ product }: SimilarProduct) {
    return (
        <Card sx={{ width: 200 }}>
            <CardActionArea component={Link} to={`/tuotteet/${product.id}`}>
                <CardMedia
                    component={Box}
                    sx={{ alt: 'kuva' }}
                    height={100}
                    image={`${window.location.protocol}//${window.location.hostname}:8000/media/${product.pictures[0].picture_address}`}
                />
                <CardHeader
                    title={<Typography variant="h6">{product.name}</Typography>}
                    subheader={
                        <Typography variant="subtitle1" fontWeight="400" lineHeight="1" sx={{ mt: 0.5 }}>
                            {product.amount} kpl
                        </Typography>
                    }
                />
            </CardActionArea>
            <CardActions>
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid item>
                        <AddToCartButton
                            size={
                                'small' as OverridableStringUnion<
                                    'small' | 'medium' | 'large',
                                    ButtonPropsSizeOverrides
                                >
                            }
                            id={product.id}
                            groupId={product.id}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip
                            title="Klikkaa saadaksesi lisätietoa tuotteesta"
                            placement="top"
                            sx={{ color: 'primary.main' }}
                            arrow
                        >
                            <IconButton component={Link} to={`/tuotteet/${product.id}`}>
                                <InfoOutlinedIcon sx={{ color: 'primary.main' }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default SimilarProductCard;
