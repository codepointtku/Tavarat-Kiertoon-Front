import { useForm } from 'react-hook-form';
import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';

function SearchWatch() {
    const searchWatchList = useLoaderData();

    const submit = useSubmit();
    const onSubmit = (data) => {
        submit(data, { method: 'post', action: '/tili/hakuvahti' });
        reset({ words: '' });
    };
    const onDeleteSubmit = (data) => {
        console.log(data);
        submit(data, { method: 'delete', action: '/tili/hakuvahti' });
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { isDirty, isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            words: '',
        },
    });

    return (
        <Container>
            <Box>
                <Stack spacing={2} sx={{ margin: '2rem 15rem' }}>
                    {searchWatchList.length !== 0 ? (
                        searchWatchList.map((searchWatch, i) => {
                            const searchWatchTitled = searchWatch.words.map((word) => {
                                return word[0].toUpperCase() + word.toLowerCase().substring(1);
                            });
                            return (
                                <Stack key={searchWatch.id}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography alignSelf="center">{searchWatchTitled.join(', ')}</Typography>
                                        <Button onClick={() => onDeleteSubmit(searchWatch)}>Poista</Button>
                                    </Stack>
                                    {searchWatchList.length !== i + 1 && <Divider sx={{ margin: '1rem 0 0 0' }} />}
                                </Stack>
                            );
                        })
                    ) : (
                        <h1>Ohje</h1>
                    )}
                </Stack>
            </Box>
            <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ margin: '2rem 15rem' }}>
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
                            pattern: {
                                value: /(^([a-zA-ZåäöÅÄÖ]{3,}\s){1,}[a-zA-ZåäöÅÄÖ]{3,})|(^[a-zA-ZåäöÅÄÖ]{3,}$)/,
                                message:
                                    'Hakusanat tulee erottaa toisistaan välilyönneillä ja koostua vähintään kolmesta kirjaimesta',
                            },
                        })}
                    ></TextField>
                    <Button
                        type="submit"
                        disabled={!isDirty || !isValid}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'success.dark',
                            },
                        }}
                    >
                        Tallenna
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default SearchWatch;
