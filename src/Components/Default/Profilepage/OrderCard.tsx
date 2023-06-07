import { Card, CardContent, CardActionArea, CardHeader, Typography, Grid } from '@mui/material';

function OrderCard() {
    return (
        <Card sx={{ width: 300, height: 150, mt: 2 }} raised>
            <CardActionArea sx={{ height: 'inherit' }}>
                <CardHeader
                    component={Typography}
                    align="center"
                    color="primary.main"
                    variant="overline"
                    title="Tilaus #1"
                />
                <CardContent>
                    <Grid container direction="column">
                        <Grid container justifyContent="space-between" direction="row">
                            <Grid item justifyContent="space-between">
                                <Typography variant="body2" color="primary.main">
                                    Tietoa:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="primary.main">
                                    Lisää tietoa:
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="space-between" direction="row">
                            <Grid item></Grid>
                            <Grid item></Grid>
                        </Grid>
                        <Grid container justifyContent="space-between" direction="row">
                            <Grid item></Grid>
                            <Grid item></Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default OrderCard;
