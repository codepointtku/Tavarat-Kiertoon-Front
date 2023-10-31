import { useForm } from 'react-hook-form';
import { Grid, Button, Container, Divider, Stack, TextField, Typography, Box } from '@mui/material';
import { Form, useLoaderData, useSubmit, Link, useNavigation } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HeroText from '../../HeroText';

function SearchWatch() {
    const searchWatchList = useLoaderData();
    const navigation = useNavigation();

    const submit = useSubmit();
    const onSubmit = (data) => {
        submit(data, { method: 'post', action: '/tili/hakuvahti' });
        reset({ words: '' });
    };
    const onDeleteSubmit = (data) => {
        submit(data, { method: 'delete', action: '/tili/hakuvahti' });
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { isDirty, isValid, errors, isSubmitting },
    } = useForm({
        mode: 'all',
        defaultValues: {
            words: '',
        },
    });

    return (
        <Container maxWidth="sm">
            <Stack sx={{ margin: '2rem 0 0 0' }}>
                {searchWatchList.length !== 0 ? (
                    <>
                        <HeroText title="Aktiiviset hakuvahdit" />
                        {searchWatchList.map((searchWatch, i) => {
                            const searchWatchTitled = searchWatch.words.map((word) => {
                                return word[0].toUpperCase() + word.toLowerCase().substring(1);
                            });

                            return (
                                <Stack key={searchWatch.id}>
                                    <Stack direction="row" justifyContent="space-between" sx={{ margin: '1rem 0' }}>
                                        <Typography alignSelf="center">{searchWatchTitled.join(', ')}</Typography>
                                        <Button
                                            onClick={() => onDeleteSubmit(searchWatch)}
                                            disabled={navigation.formData?.get('id') === searchWatch.id.toString()}
                                        >
                                            Poista
                                        </Button>
                                    </Stack>
                                    {searchWatchList.length !== i + 1 && <Divider />}
                                </Stack>
                            );
                        })}
                    </>
                ) : (
                    <HeroText
                        title="Tervetuloa hakuvahtiin!"
                        subtext="Alla olevasta tekstikentästä voi lisätä itsellesi hakuvahdin. Hakuvahti lähettää sinulle sähköpostin, kun hakusanoja vastaava tuote lisätään järjestelmään"
                    />
                )}
            </Stack>
            <Box component={Form} onSubmit={handleSubmit(onSubmit)} justifyContent="center">
                <Stack>
                    <TextField
                        id="textfield-words"
                        type="text"
                        label="Hakusanat"
                        error={!!errors.words}
                        helperText={errors.words?.message?.toString() || ' '}
                        {...register('words', {
                            required: {
                                value: true,
                                message: 'Hakuvahdin hakusana ei voi olla tyhjä',
                            },
                            minLength: {
                                value: 3,
                                message: 'Hakusanan tulee olla vähintään kolme merkkiä pitkä',
                            },
                            maxLength: {
                                value: 50,
                                message: 'Hakuvahti voi olla korkeintaan 50 merkkiä pitkä'
                            },
                            pattern: {
                                value: /(^([a-zA-ZåäöÅÄÖ]{3,}\s){1,}[a-zA-ZåäöÅÄÖ]{3,}$)|(^[a-zA-ZåäöÅÄÖ]{3,}$)/,
                                message:
                                    'Hakusanat tulee erottaa toisistaan välilyönneillä ja koostua vähintään kolmesta kirjaimesta',
                            },
                        })}
                    ></TextField>
                    <Button
                        type="submit"
                        disabled={!isDirty || !isValid || isSubmitting}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'success.dark',
                            },
                        }}
                    >
                        Lisää hakuvahti
                    </Button>
                    <Button
                        component={Link}
                        to="/ohjeet/tili/hakuvahti"
                        sx={{ margin: '1rem 0' }}
                        variant="text"
                        endIcon={<HelpOutlineIcon />}
                    >
                        Ohjeet
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default SearchWatch;
