import { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

interface Props {
    user: { name: string; email: string; phone_number: string };
    actions: { Update: any };
}

function AutoFilled({ user, actions }: Props) {
    const elementChildren = document.getElementsByName('inputValues');
    console.log(elementChildren.length);
    useEffect(() => {
        // elementChildren.map((child, i) =>
        //     actions.Update(
        //         i === 0
        //             ? `firstName: ${child.value}`
        //             : i === 1
        //             ? `lastName: ${child.value}`
        //             : i === 2
        //             ? `email: ${child.value}`
        //             : i === 3 && `phoneNumber: ${child.value}`
        //     )
        // );
    }, []);
    const fullname = user.name.split(' ');

    return (
        <Grid container spacing={4}>
            <Grid item>
                <TextField label="Etunimi" name="inputValues" variant="outlined" value={fullname[0]} />
            </Grid>
            <Grid item>
                <TextField label="Sukunimi" name="inputValues" variant="outlined" value={fullname[1]} />
            </Grid>
            <Grid item>
                <TextField label="Sähköposti" name="inputValues" variant="outlined" value={user.email} />
            </Grid>
            <Grid item>
                <TextField label="Puh. numero" name="inputValues" variant="outlined" value={user.phone_number} />
            </Grid>
        </Grid>
    );
}

export default AutoFilled;
