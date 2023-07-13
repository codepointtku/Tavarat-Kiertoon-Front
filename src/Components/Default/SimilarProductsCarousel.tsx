import { Paper, Card } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';

interface Props {
    similarProducts: { count: number; results: [{}] };
}

function SimilarProductsCarousel({ similarProducts }: Props) {
    return (
        <Carousel>
            {/* <Paper>
                <Card>A</Card>
            </Paper> */}
        </Carousel>
    );
}

export default SimilarProductsCarousel;
