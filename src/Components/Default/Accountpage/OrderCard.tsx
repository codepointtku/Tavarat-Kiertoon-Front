import { Link } from 'react-router-dom';
import { Card, CardContent, CardActionArea, CardHeader, Typography, Grid, Grow, Stack } from '@mui/material';
import type { OrderDetailResponse } from '../../../api';

export type OrderCardProps = {
    key: number;
    orderInfo: OrderDetailResponse;
};

function OrderCard({ orderInfo }: OrderCardProps) {
    // console.log(orderInfo);

    const deliveryDate = new Date(orderInfo.delivery_date as string).toLocaleDateString('fi-FI');
    const orderDate = new Date(orderInfo.creation_date).toLocaleDateString('fi-FI');

    const statusMap = {
        Waiting: 'Odottaa',
        Processing: 'Käsittelyssä',
        Finished: 'Toimitettu',
    };

    return (
        <Grow in timeout={1000}>
            <Card
                // sx={
                //     {
                //         // minWidth: 400,
                //         // minHeight: 300,
                //     }
                // }
                raised
            >
                <CardActionArea component={Link} to={`${orderInfo.id}`} state={{ orderInfo }} sx={{ height: '100%' }}>
                    <CardHeader
                        sx={{ backgroundColor: 'primary.light' }}
                        align="center"
                        title={`Tilaus #${orderInfo.id}`}
                        titleTypographyProps={{ variant: 'h6', color: 'primary.dark' }}
                    />
                    <CardContent>
                        <Stack
                            // container
                            // direction="column"
                            justifyContent="space-around"
                            // gap={0.5}
                            sx={{ width: 'auto' }}
                        >
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" color="primary.dark">
                                    Tilauksen tila:
                                </Typography>
                                <Typography variant="body2">{statusMap[orderInfo.status]}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" color="primary.dark">
                                    Tilauspäivä:
                                </Typography>
                                <Typography variant="body2">{orderDate}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" color="primary.dark">
                                    Toimitusosoite:
                                </Typography>
                                <Typography variant="body2">{orderInfo.delivery_address}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" color="primary.dark">
                                    Vastaanottaja:
                                </Typography>
                                <Typography variant="body2">{orderInfo?.recipient}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" color="primary.dark">
                                    Vastaanottajan puhelinnumero:
                                </Typography>
                                <Typography variant="body2">{orderInfo.recipient_phone_number}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" color="primary.dark">
                                    Lisätiedot:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {orderInfo?.order_info}
                                </Typography>
                            </Stack>
                            {deliveryDate != '1.1.1970' ? (
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2" color="primary.dark">
                                        Noutopäivä:
                                    </Typography>
                                    <Typography variant="body2">{deliveryDate}</Typography>
                                </Stack>
                            ) : null}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    );
}

export default OrderCard;
