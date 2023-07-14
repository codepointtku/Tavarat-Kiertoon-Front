import { Paper, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import SimilarProductCard from './SimilarProductCard';
import { SimilarProduct } from './SimilarProductCard';

interface Props {
    similarProducts: { count: number; results: [{}] };
}

function SimilarProductsCarousel({ similarProducts }: Props) {
    const carouselPageContents = [];
    const pageCount = similarProducts.results.length / 3;
    var a = 0;

    for (let i = 0; i < pageCount; i++) {
        a += 3;
        carouselPageContents.push(similarProducts.results.slice(a - 3, a));
    }

    return (
        <Paper variant="outlined" sx={{ p: 2, mb: 5, borderColor: 'primary.light' }}>
            <Carousel
                autoPlay={false}
                cycleNavigation={false}
                indicatorIconButtonProps={{ style: { color: '#bfe6f6' } }}
                activeIndicatorIconButtonProps={{ style: { color: '#009bd8' } }}
            >
                {carouselPageContents.map((productCards) => (
                    <Grid container direction="row" justifyContent="center" gap={5}>
                        {productCards.map((product) => (
                            <SimilarProductCard product={product as SimilarProduct['product']} />
                        ))}
                    </Grid>
                ))}
            </Carousel>
        </Paper>
    );
}

export default SimilarProductsCarousel;
