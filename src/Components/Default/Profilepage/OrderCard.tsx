import { Link } from 'react-router-dom';
import { Card, CardContent, CardActionArea, CardHeader, Typography, Grid } from '@mui/material';
import { OrderDetailResponse } from '../../../api';

export type OrderCardProps = {
    key: number;
    orderInfo: OrderDetailResponse;
};

function OrderCard({ orderInfo }: OrderCardProps) {
    const date = new Date(orderInfo.delivery_date as string);
    const readableDeliveryDate = date.toLocaleDateString();
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
                    <Grid container direction="column" justifyContent="space-around" gap={0.5} sx={{ width: 'auto' }}>
                        <Grid direction="row" spacing={1} container>
                            <Grid item>
                                <Typography variant="body2" color="primary.main">
                                    Tilauksen tila:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">{orderInfo.status}</Typography>
                            </Grid>
                        </Grid>
                        <Grid direction="row" spacing={1} container>
                            <Grid item>
                                <Typography variant="body2" color="primary.main">
                                    Toimitusosoite:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">{orderInfo.delivery_address}</Typography>
                            </Grid>
                        </Grid>
                        <Grid direction="row" spacing={1} container>
                            <Grid item>
                                <Typography variant="body2" color="primary.main">
                                    Tilaajan sähköposti:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">{orderInfo.contact}</Typography>
                            </Grid>
                        </Grid>
                        <Grid direction="row" spacing={1} container>
                            <Grid item>
                                <Typography variant="body2" color="primary.main">
                                    Tilauksen tiedot:
                                </Typography>
                            </Grid>
                            <Grid item sx={{ width: 'inherit' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {orderInfo.order_info}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid direction="row" spacing={1} container>
                            <Grid item>
                                <Typography variant="body2" color="primary.main">
                                    Toimituspäivä:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">{readableDeliveryDate}</Typography>
                            </Grid>
                        </Grid>
                        <Grid direction="row" spacing={1} container>
                            <Grid item>
                                <Typography variant="body2" color="primary.main">
                                    Tilaajan puhelinnumero:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">{orderInfo.phone_number}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default OrderCard;
