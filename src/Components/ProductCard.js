import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';

function ProductCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Yksinkertainen tuotekortti - /Components/ProductCard.js
                    </Typography>
                    <Typography>Product: </Typography>
                    <Typography>Description: </Typography>
                    <Typography>Date: </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Linkki productDetails-sivulle</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default ProductCard;
