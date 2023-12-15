import { useForm } from 'react-hook-form';
import { Form, useSubmit, useLoaderData, useActionData, Link } from 'react-router-dom';
import { bikeGroupNames } from './BikeUsers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HeroText from '../HeroText';
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
        <Box display="flex" flexDirection="column" maxWidth="800px" mx="auto">
            {actionData?.status === 403 && (
                <AlertBox text="Ylläpitäjä ei voi muokata omia käyttöoikeuksiaan" status="warning" />
            )}

            {actionData?.status === 200 && (
                <AlertBox
                    text="Käyttäjätiedot tallennettu onnistuneesti."
                    status="success"
                    timer={3000}
                    redirectUrl="/pyorat/pyoravarasto/kayttajat"
                />
            )}
            <Box item>
                <Stack>
                    <HeroText title={`Käyttäjä ${bikeUserInfo.email}`} />
                    <Box component={Form} onSubmit={handleSubmit}>
                        <Stack>
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
                            <Button
                                id="save-changes-btn"
                                type="submit"
                                sx={{
                                    margin: '1rem 0 1rem 0',
                                    '&:hover': {
                                        backgroundColor: 'success.dark',
                                    },
                                }}
                                disabled={!isDirty || !isValid}
                            >
                                Tallenna muutokset
                            </Button>
                            {/* <Stack direction="row" justifyContent="space-between"> */}
                            <Tooltip title="Takaisin käyttäjät-listaukseen">
                                <Button
                                    id="cancel-btn"
                                    // size="small"
                                    component={Link}
                                    to="/pyorat/pyoravarasto/kayttajat"
                                    startIcon={<ArrowBackIcon />}
                                    // sx={{ margin: '2rem 0 1rem 0' }}
                                >
                                    Poistu tallentamatta
                                </Button>
                            </Tooltip>
                            {/* </Stack> */}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
