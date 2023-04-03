import { useForm } from 'react-hook-form';
import { Form, useSearchParams } from 'react-router-dom';

import { Box, Button, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
}));

function SearchField() {
    const { handleSubmit, register } = useForm();
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    const onSubmit = (formData) => {
        setSearchParams({ haku: formData.search });
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
                    sx={{ color: 'inherit', padding: '0.5rem' }}
                />
            </Search>
            <Button type="submit" sx={{ p: '1rem 2rem 1rem 2rem' }}>
                Hae
            </Button>
        </Box>
    );
}

export default SearchField;
