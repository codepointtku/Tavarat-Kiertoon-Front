import { Link } from 'react-router-dom';
import { Card, CardContent, CardActionArea, CardHeader, Typography, Grid } from '@mui/material';

interface OrderInfo {
    orderInfo: {
        id: number;
        status: string;
        delivery_address: string;
        contact: string;
        order_info: string;
        delivery_date: null | string;
        phone_number: string;
        product_items: [];
    };
}

function OrderCard({ orderInfo }: OrderInfo) {
    return (
        <Card
            sx={{
                width: 400,
                minHeight: 300,
                border: orderInfo.status === 'Finished' ? '1px solid #81C784' : '1px solid #0062ae',
                mt: 2,
            }}
            raised
        >
            <CardActionArea
                component={Link}
                to={`tilaus/${orderInfo.id}`}
                state={{ orderInfo }}
                sx={{ height: '100%' }}
            >
                <CardHeader
                    component={Typography}
                    align="center"
                    color="primary.main"
                    variant="overline"
                    title={`Tilaus #${orderInfo.id}`}
                />
                <CardContent>
                    <Grid container direction="column" justifyContent="space-around" sx={{ width: 'auto' }}>
                        <Grid item>
                            <Typography variant="body2" sx={{ display: 'inline' }} color="primary.main">
                                Tilauksen tila:
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 0.5, display: 'inline' }}>
                                {orderInfo.status}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" sx={{ display: 'inline' }} color="primary.main">
                                Toimitusosoite:
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 0.5, display: 'inline' }}>
                                {orderInfo.delivery_address}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" sx={{ display: 'inline' }} color="primary.main">
                                Tilaajan sähköposti:
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 0.5, display: 'inline' }}>
                                {orderInfo.contact}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" sx={{ display: 'inline' }} color="primary.main">
                                Tilauksen tiedot:
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 0.5, display: 'inline', wordWrap: 'break-word' }}>
                                {orderInfo.order_info}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" sx={{ display: 'inline' }} color="primary.main">
                                Toimituspäivä:
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 0.5, display: 'inline' }}>
                                {orderInfo.delivery_date}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" sx={{ display: 'inline' }} color="primary.main">
                                Tilaajan puhelinnumero:
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 0.5, display: 'inline' }}>
                                {orderInfo.phone_number}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default OrderCard;
