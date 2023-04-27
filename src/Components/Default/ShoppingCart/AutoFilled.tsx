import { Grid, TextField } from '@mui/material';

interface Props {
    user: { name: string; email: string; phone_number: string };
    actions: { Update: any };
}

function AutoFilled({ user, actions }: Props) {
    console.log(actions);
    const fullname = user.name.split(' ');

    return (
        <Grid container spacing={4}>
            <Grid item>
                <TextField label="Etunimi" variant="outlined" value={fullname[0]} />
            </Grid>
            <Grid item>
                <TextField label="Sukunimi" variant="outlined" value={fullname[1]} />
            </Grid>
            <Grid item>
                <TextField label="Sähköposti" variant="outlined" value={user.email} />
            </Grid>
            <Grid item>
                <TextField label="Puh. numero" variant="outlined" value={user.phone_number} />
            </Grid>
        </Grid>
    );
}

export default AutoFilled;
