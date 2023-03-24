import { useForm } from 'react-hook-form';
import { Form, useSearchParams } from 'react-router-dom';

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
    // const submit = useSubmit();
    const [searchParams, setSearchParams] = useSearchParams();

    const onSubmit = () => {
        console.log('hellou');
        // console.log('formData:', formData);
        // console.log('formData.search:', formData.search);
        // setSearchParams({ hakusana: formData.search });
    };
    // console.log('searchParams:', searchParams);

    const handleMoro = () => {
        setSearchParams({ moro: 'nappia_painettu' });
        console.log('sP:', searchParams);
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
            <Button onClick={handleMoro} type="submit" sx={{ p: '0 2rem 0 2rem' }}>
                Hae
            </Button>
        </Box>
    );
}

export default SearchField;
