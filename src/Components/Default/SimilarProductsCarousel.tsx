import { Paper, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import SimilarProductCard from './SimilarProductCard';
import { SimilarProduct } from './SimilarProductCard';

interface Props {
    similarProducts: { count: number; results: [{}] };
}

function SimilarProductsCarousel({ similarProducts }: Props) {
    const carouselPageContents = [];
    const pageCount = similarProducts.results.length / 4;
    var a = 0;

    for (let i = 0; i < pageCount; i++) {
        a += 4;
        carouselPageContents.push(similarProducts.results.slice(a - 4, a));
    }

    return (
        <Paper variant="outlined" sx={{ p: 2, mb: 2, borderColor: 'primary.light' }}>
            <Carousel
                animation="slide"
                autoPlay={false}
                // cycleNavigation={false}
                indicatorIconButtonProps={{ style: { color: '#bfe6f6' } }}
                activeIndicatorIconButtonProps={{ style: { color: '#009bd8' } }}
            >
                {carouselPageContents.map((productCards) => (
                    <Grid container direction="row" gap={5} sx={{ ml: 6 }}>
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
