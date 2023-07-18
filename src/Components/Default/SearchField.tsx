import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, useSearchParams, useRouteLoaderData } from 'react-router-dom';

import { Box, Button, IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import type { rootLoader } from '../../Router/loaders';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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

type SearchInputValue = {
    search: string;
};

function SearchField() {
    const { colors, categories } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
    const categoriesAndColors = { categories: [''], colors: [''] };
    const { handleSubmit, register, watch, reset, setValue } = useForm<SearchInputValue>();
    const [searchParams, setSearchParams] = useSearchParams();

    const onSubmit: SubmitHandler<SearchInputValue> = async (formData) => {
        const filteredSearch = [];
        colors.map((color) => {
            if (formData.search.includes(color.name)) {
                categoriesAndColors.colors[0] === ''
                    ? categoriesAndColors.colors.splice(0, 1, String(color.id))
                    : categoriesAndColors.colors.push(String(color.id));
                filteredSearch.push(formData.search.replace(color.name, 'b'));
            }
        });
        categories.map((category) => {
            if (formData.search.includes(category.name)) {
                categoriesAndColors.categories[0] === ''
                    ? categoriesAndColors.categories.splice(0, 1, String(category.id))
                    : categoriesAndColors.categories.push(String(category.id));
                filteredSearch.push(formData.search.replace(category.name, 'c'));
            }
        });

        // console.log(filteredSearch);
        switch (true) {
            case categoriesAndColors.categories[0] !== '' && categoriesAndColors.colors[0] !== '':
                setSearchParams({
                    haku: formData.search,
                    varit: categoriesAndColors.colors,
                    kategoriat: categoriesAndColors.categories,
                });
                break;
            case categoriesAndColors.categories[0] !== '':
                setSearchParams({ haku: formData.search, kategoriat: categoriesAndColors.categories });
                break;
            case categoriesAndColors.colors[0] !== '':
                setSearchParams({ haku: formData.search, varit: categoriesAndColors.colors });
                break;
            case categoriesAndColors.categories[0] === '' && categoriesAndColors.colors[0] === '':
                setSearchParams({ haku: formData.search });
                break;
        }
    };

    const searchParamFromUrl = searchParams.get('haku');
    const searchFieldHasInput = watch('search');

    // set search string from url to search field, if user is following a link with search string
    useEffect(() => {
        if (searchFieldHasInput) {
            reset();
        }
        if (searchParamFromUrl !== null) {
            setValue('search', searchParamFromUrl);
        }
    }, [searchParamFromUrl, setValue, reset]);

    const clearInputField = () => {
        reset();
        categoriesAndColors.categories = [''];
        categoriesAndColors.colors = [''];
        if (searchParams.has('haku')) {
            searchParams.delete('haku');
            searchParams.delete('varit');
            searchParams.delete('kategoriat');
            setSearchParams(searchParams);
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
                {searchFieldHasInput ? (
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
