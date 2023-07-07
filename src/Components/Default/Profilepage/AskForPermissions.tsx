import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Button,
    TextField,
} from '@mui/material';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

interface SubmitData extends SubmitHandler<FieldValues> {
    admin: boolean;
    storage: boolean;
    bikestorage: boolean;
}

function AskForPermissions() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: SubmitData) => {
        console.log(data);
    };
    return (
        <Container>
            <Typography
                variant="h5"
                color="primary.main"
                sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                Hae käyttöoikeuksia
            </Typography>
            <Typography variant="body2" color="primary.main" align="center">
                Hakemus lähetetään sivuston ylläpidolle.
            </Typography>
            <Grid
                container
                sx={{ mt: 5 }}
                direction="row"
                component={Form}
                onSubmit={handleSubmit(onSubmit as SubmitData)}
            >
                <Grid container sx={{ width: '50%' }} justifyContent="center">
                    <Grid item>
                        <FormControl component="fieldset">
                            <FormLabel>Käyttöoikeudet</FormLabel>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox {...register('admin')} />} label="Admin" />
                                <FormControlLabel control={<Checkbox {...register('storage')} />} label="Varasto" />
                                <FormControlLabel
                                    control={<Checkbox {...register('bikestorage')} />}
                                    label="Pyörävarasto"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container sx={{ width: '50%' }} justifyContent="center">
                    <TextField label="Lisätietoa" placeholder="Lisätietoa" multiline rows={5} />
                </Grid>
                <Grid container justifyContent="center">
                    <Button sx={{ width: 200, p: 2, mt: 5 }} type="submit">
                        Lähetä hakemus
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AskForPermissions;
