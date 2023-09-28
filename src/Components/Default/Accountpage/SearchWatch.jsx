import { useForm } from 'react-hook-form';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';

function SearchWatch() {
    const searchWatchList = useLoaderData();

    const submit = useSubmit();
    const onSubmit = (data) => {
        submit(data, { method: 'post', action: '/tili/hakuvahti' });
        reset(data);
    };
    const onDeleteSubmit = (data) => {
        console.log(data);
        submit(data, { method: 'delete', action: '/tili/hakuvahti' });
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { isDirty, dirtyFields, isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            words: '',
        },
    });

    return (
        <Container>
            <Box>
                <Stack spacing={2} sx={{ margin: '2rem 18rem' }}>
                    {searchWatchList.map((searchWatch, i) => {
                        return (
                            <Stack direction="row" justifyContent="space-between" key={searchWatch.id}>
                                <Typography>
                                    {i + 1}. {searchWatch.words.join(', ')}
                                </Typography>
                                <Button onClick={() => onDeleteSubmit(searchWatch)}>Poista</Button>
                            </Stack>
                        );
                    })}
                </Stack>
            </Box>
            <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ margin: '2rem 18rem' }}>
                    <TextField
                        id="textfield-words"
                        type="text"
                        label="Hakusanat"
                        {...register('words', {
                            required: {
                                value: true,
                                message: 'Hakuvahdin hakusana ei voi olla tyhjä',
                            },
                            minLength: {
                                value: 3,
                                message: 'Hakusanan tulee olla vähintään kolme merkkiä pitkä',
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
