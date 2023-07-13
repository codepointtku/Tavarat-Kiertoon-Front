import { Card, CardActionArea, CardActions, CardContent, CardMedia, CardHeader } from '@mui/material';

export interface SimilarProduct {
    product: {
        id: number;
        amount: number;
        color: [number];
        free_description: string;
        measurements: string;
        name: string;
        weight: number;
        pictures: [{ id: number; address: string }];
    };
}

function SimilarProductCard({ product }: SimilarProduct) {
    return (
        <Card sx={{ width: 200, height: 243 }}>
            <CardActionArea>
                <CardMedia />
                <CardContent>
                    <CardHeader title="Testi" />
                    <CardActions></CardActions>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default SimilarProductCard;
