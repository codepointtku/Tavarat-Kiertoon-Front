import { Link } from 'react-router-dom';
import { Card, CardContent, CardActionArea, CardHeader, Typography, Grid, Grow } from '@mui/material';
import { OrderDetailResponse } from '../../../api';

export type OrderCardProps = {
    key: number;
    orderInfo: OrderDetailResponse;
};

function OrderCard({ orderInfo }: OrderCardProps) {
    const date = new Date(orderInfo.delivery_date as string);
    const readableDeliveryDate = date.toLocaleDateString();
    const orderDate = new Date(orderInfo.creation_date);
    const readableOrderDate = orderDate.toLocaleDateString();
    const statusMap = {
        Waiting: 'Odottaa',
        Processing: 'Käsittelyssä',
        Finished: 'Toimitettu',
    };
    return (
        <Grow in timeout={1000}>
            <Card
                sx={{
                    width: 400,
                    minHeight: 300,
                    border: orderInfo.status === 'Finished' ? '1px solid #81C784' : '1px solid #0062ae',
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
                        sx={{ backgroundColor: 'primary.light' }}
                        align="center"
                        color="primary.dark"
                        variant="overline"
                        title={`Tilaus #${orderInfo.id}`}
                    />
                    <CardContent>
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-around"
                            gap={0.5}
                            sx={{ width: 'auto' }}
                        >
                            <Grid direction="row" spacing={1} container>
                                <Grid item>
                                    <Typography variant="body2" color="primary.dark">
                                        Tilauksen tila:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{statusMap[orderInfo.status]}</Typography>
                                </Grid>
                            </Grid>
                            <Grid direction="row" spacing={1} container>
                                <Grid item>
                                    <Typography variant="body2" color="primary.dark">
                                        Tilauspäivä:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{readableOrderDate}</Typography>
                                </Grid>
                            </Grid>
                            <Grid direction="row" spacing={1} container>
                                <Grid item>
                                    <Typography variant="body2" color="primary.dark">
                                        Toimitusosoite:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{orderInfo.delivery_address}</Typography>
                                </Grid>
                            </Grid>
                            <Grid direction="row" spacing={1} container>
                                <Grid item>
                                    <Typography variant="body2" color="primary.dark">
                                        Tilaajan sähköposti:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{orderInfo.contact}</Typography>
                                </Grid>
                            </Grid>
                            <Grid direction="row" spacing={1} container>
                                <Grid item>
                                    <Typography variant="body2" color="primary.dark">
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
                                    <Typography variant="body2" color="primary.dark">
                                        Toimituspäivä:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{readableDeliveryDate}</Typography>
                                </Grid>
                            </Grid>
                            <Grid direction="row" spacing={1} container>
                                <Grid item>
                                    <Typography variant="body2" color="primary.dark">
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
        </Grow>
    );
}

export default OrderCard;
