import { Box, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Form, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
    const { register, handleSubmit, formState } = useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSearchSubmit = (data) => {
        console.log(formState.search);
        console.log(data);
        setSearchParams({ search: formState.search }, { replace: true });
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Search component={Form} onSubmit={handleSubmit(handleSearchSubmit)}>
                <InputBase
                    autoFocus
                    type="search"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('search')}
                    placeholder="Etsi tuotteita…"
                    startAdornment={<SearchIcon sx={{ fontSize: 30, color: 'primary.main', marginRight: '3rem' }} />}
                    inputProps={{ 'aria-label': 'searchfield' }}
                    sx={{ color: 'inherit', padding: '1rem 6rem 1rem 1rem' }}
                />
                {/* <Button type="submit" variant="contained" color="primary">
                    Hae
                </Button> */}
            </Search>
        </Box>
    );
}

export default SearchField;
