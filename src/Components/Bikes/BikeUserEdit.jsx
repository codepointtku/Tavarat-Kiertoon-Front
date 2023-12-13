import { useForm } from 'react-hook-form';
import { Form, useSubmit, useLoaderData, useActionData, Link } from 'react-router-dom';
import { bikeGroupNames } from './BikeUsers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, TextField, MenuItem, Button, Stack, Tooltip } from '@mui/material';
import AlertBox from '../AlertBox';

export default function () {
    const { bikeUserInfo, userAuthGroups } = useLoaderData();
    const actionData = useActionData();
    console.log(actionData);
    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { isDirty, isValid },
    } = useForm({
        mode: 'all',
        defaultValues: {
            ...bikeUserInfo,
        },
    });
    const submit = useSubmit();
    const handleSubmit = createHandleSubmit((data) => {
        submit(
            {
                bike_group: data.bike_group,
            },
            {
                method: 'put',
            }
        );
    });

    return (
        <>
            {/* {actionData?.type === 'userdataupdate' && actionData?.status === false && (
                <AlertBox text="Käyttäjätietojen tallennus epäonnistui" status="error" />
            )}

            {actionData?.type === 'userdataupdate' &&
                actionData?.status === false &&
                actionData.responseMsg === 'admins cannot edit their own permissions' && (
                    <AlertBox text="Ylläpitäjä ei voi muokata omia käyttöoikeuksiaan" status="warning" />
                )} */}

            {actionData?.status === 200 && (
                <AlertBox
                    text="Käyttäjätiedot tallennettu onnistuneesti."
                    status="success"
                    timer={3000}
                    redirectUrl="/pyorat/pyoravarasto/kayttajat"
                />
            )}
            <Box component={Form} onSubmit={handleSubmit}>
                <TextField
                    select
                    defaultValue={bikeUserInfo.bike_group}
                    required
                    {...register('bike_group', {
                        required: {
                            value: true,
                            message: 'Käyttäjälle on valittava käyttöoikeus',
                        },
                    })}
                >
                    {userAuthGroups
                        .filter((group) => group.name.includes('bicycle'))
                        .map((group) => (
                            <MenuItem key={group.id} value={group.name}>
                                {bikeGroupNames[group.name]}
                            </MenuItem>
                        ))}
                </TextField>
                <Stack>
                    <Button
                        id="save-changes-btn"
                        type="submit"
                        sx={{
                            margin: '4rem 0 1rem 0',
                            '&:hover': {
                                backgroundColor: 'success.dark',
                            },
                        }}
                        disabled={!isDirty || !isValid}
                    >
                        Tallenna muutokset
                    </Button>
                    <Stack direction="row" justifyContent="space-between">
                        <Tooltip title="Takaisin käyttäjät-listaukseen">
                            <Button
                                id="cancel-btn"
                                size="small"
                                component={Link}
                                to="/pyorat/pyoravarasto/kayttajat"
                                startIcon={<ArrowBackIcon />}
                                sx={{ margin: '2rem 0 1rem 0' }}
                            >
                                Poistu tallentamatta
                            </Button>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}
