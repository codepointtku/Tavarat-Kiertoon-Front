import { Container, Box, Grid, Typography, TextField, Button } from '@mui/material';

function ResetPassword() {
    return (
        <Container>
            <Box sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, padding: 5, mt: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Salasanan palautus
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Grid direction="column" width={500} gap={2} container>
                        <Grid item>
                            <Typography variant="h6">Syötä uusi salasana</Typography>
                        </Grid>
                        <Grid item>
                            <TextField label="Uusi salasana" fullWidth></TextField>
                        </Grid>
                        <Grid item>
                            <TextField label="Uusi salasana uudestaan" fullWidth></TextField>
                        </Grid>
                        <Grid item>
                            <Button type="submit" sx={{ fontWeight: 'fontWeightMediumBold' }}>
                                Palauta salasana
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default ResetPassword;
