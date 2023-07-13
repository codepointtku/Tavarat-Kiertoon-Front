import { Paper } from '@mui/material';
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
        <Carousel animation="slide">
            <Paper sx={{ p: 2 }}>
                {similarProducts.results.map((product) => (
                    <SimilarProductCard product={product as SimilarProduct['product']} />
                ))}
            </Paper>
        </Carousel>
    );
}

export default SimilarProductsCarousel;
