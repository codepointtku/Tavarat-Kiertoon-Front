import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, useSearchParams } from 'react-router-dom';

import { Box, Button, IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '34ch',
    border: '0.1rem solid rgba(0,155,216, 0.4)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
        border: '0.1rem solid rgba(0,155,216, 1)',
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
}));

function SearchField() {
    const { handleSubmit, register, watch, reset, setValue } = useForm<SearchInputValue>();
    const [searchParams, setSearchParams] = useSearchParams();

    type SearchInputValue = {
        formData: object;
        search: string;
    };

    const onSubmit: SubmitHandler<SearchInputValue> = (formData) => {
        setSearchParams({ haku: formData.search });
    };

    const searchFieldInputText = searchParams.get('haku');

    useEffect(() => {
        // if (searchFieldInputText !== null) {
        setValue('search', searchFieldInputText!);
        // }
    }, [searchFieldInputText]);

    const clearBtnWatcher = watch('search');

    const clearInputField = () => {
        if (searchParams.has('haku')) {
            searchParams.delete('haku');
            setSearchParams(searchParams);
        } else {
            reset();
        }
    };

    return (
        <Box
            id="searchform"
            component={Form}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Search id="search-wrapper">
                <SearchIcon sx={{ fontSize: 30, color: 'primary.main', margin: '0 1rem 0 1rem' }} />
                <InputBase
                    id="search-text-input-field"
                    {...register('search')}
                    autoFocus
                    placeholder="Etsi tuotteita…"
                    inputProps={{ 'aria-label': 'searchfield' }}
                    sx={{ color: 'inherit', padding: '0.5rem' }}
                />
                {clearBtnWatcher ? (
                    <IconButton aria-label="clear" onClick={clearInputField} sx={{ marginRight: '1rem' }}>
                        <ClearIcon />
                    </IconButton>
                ) : null}
            </Search>
            <Button id="search-button" type="submit" sx={{ p: '1rem 2rem 1rem 2rem' }}>
                Hae
            </Button>
        </Box>
    );
}

export default SearchField;
