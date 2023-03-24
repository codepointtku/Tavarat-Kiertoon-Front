import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';

import { Box, Button, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
}));

function SearchField() {
    const { handleSubmit, register } = useForm();
    const submit = useSubmit();

    const onSubmit = (formData) => {
        console.log('hello');
        console.log(formData);
    };

    return (
        <Box component={Form} onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Search>
                <InputBase
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('search')}
                    autoFocus
                    placeholder="Etsi tuotteita…"
                    startAdornment={<SearchIcon sx={{ fontSize: 30, color: 'primary.main', marginRight: '3rem' }} />}
                    inputProps={{ 'aria-label': 'searchfield' }}
                    sx={{ color: 'inherit', padding: '1rem 6rem 1rem 1rem' }}
                />
            </Search>
            <Button type="submit">Eti</Button>
        </Box>
    );
}

export default SearchField;
