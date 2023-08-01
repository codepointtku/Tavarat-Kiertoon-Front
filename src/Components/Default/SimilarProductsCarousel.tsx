import { Grid, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import SimilarProductCard from './SimilarProductCard';
import { type SimilarProduct } from './SimilarProductCard';

export interface SimilarProductCarouselProps {
    similarProducts: { count: number; results: [{}] };
    currentId: number;
}

function SimilarProductsCarousel({ similarProducts, currentId }: SimilarProductCarouselProps) {
    const carouselPageContents = [];
    const similarProductsWithoutSelectedProduct = similarProducts.results.filter(
        (product: any) => product.id != currentId
    );
    const pageCount = Math.floor(similarProducts.results.length / 3);
    let a = 0;
    for (let i = 0; i < pageCount; i++) {
        a += 3;
        carouselPageContents.push(similarProductsWithoutSelectedProduct.slice(a - 3, a));
    }

    return (
        <Box sx={{ p: 2, mb: 5 }}>
            <Carousel
                autoPlay={false}
                cycleNavigation={false}
                navButtonsAlwaysVisible
                indicatorIconButtonProps={{ style: { color: '#bfe6f6' } }}
                activeIndicatorIconButtonProps={{ style: { color: '#009bd8' } }}
            >
                {carouselPageContents.map((productCards) => (
                    <Grid container direction="row" justifyContent="center" gap={5} key={Math.random() * 10000}>
                        {productCards.map((product: any) => (
                            <SimilarProductCard key={product.id} product={product as SimilarProduct['product']} />
                        ))}
                    </Grid>
                ))}
            </Carousel>
        </Box>
    );
}

export default SimilarProductsCarousel;
