import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Form, useSearchParams, useRouteLoaderData, createSearchParams } from 'react-router-dom';

import { Box, Button, IconButton, InputBase, Stack, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import type { rootLoader } from '../../Router/loaders';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    // width: '34ch',
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

export interface CategoryTreeIndexes {
    [key: number]: [];
}

export interface TreeSelectedProps {
    treeSelectedState: {
        categoryTreeSelected: boolean;
        setCategoryTreeSelected: React.Dispatch<React.SetStateAction<boolean>>;
    };
}

function SearchField({ treeSelectedState }: TreeSelectedProps) {
    const { colors, categories, categoryTree } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
    // Initializes object where categories and colors are stored as arrays each in their own properties
    const categoriesAndColors = { categories: [''], colors: [''] };
    const {
        handleSubmit,
        register,
        watch,
        reset,
        setValue,
        formState: { isDirty, isValid },
    } = useForm<SearchInputValue>({ defaultValues: { search: '' } });
    const [searchParams, setSearchParams] = useSearchParams();
    let searchInput = '';
    // Created constant with the value of categoryTree to bypass typescript errors :/
    const categoryTreeIndexes = categoryTree as unknown as CategoryTreeIndexes;

    const onSubmit: SubmitHandler<SearchInputValue> = async (formData) => {
        searchInput = formData.search;

        // Initializes array where both categories and colors get added to
        // Used in reducer to filter all found color and category names to "kategoria" and "varit" params, leaving the rest of search to be added in "haku" param.
        const searchCategoriesAndColorsNames = [] as string[];

        // Maps through all colors and adds color name to array if search field includes color name.
        colors.forEach((color) => {
            const colorNameLowerCase = color.name.toLowerCase();
            if (formData.search.toLowerCase().includes(colorNameLowerCase)) {
                categoriesAndColors.colors[0] === ''
                    ? categoriesAndColors.colors.splice(0, 1, String(color.id))
                    : categoriesAndColors.colors.push(String(color.id));
                // Pushes category name to array to be filtered out from "haku" search param and added to "varit" searchparam.
                searchCategoriesAndColorsNames.push(colorNameLowerCase);
            }
        });

        // Maps through all categories and adds category name to array if search field includes category name and if category name is surrounded by empty space.
        categories.forEach((category) => {
            const categoryNameLowerCase = category.name.toLowerCase();
            if (
                formData.search.toLowerCase().includes(categoryNameLowerCase) &&
                RegExp(`\\b${categoryNameLowerCase}\\b`).test(formData.search.toLowerCase())
            ) {
                categoryTreeIndexes[category.id].forEach((categoryIdInTree: number) => {
                    categoriesAndColors.categories[0] === ''
                        ? categoriesAndColors.categories.splice(0, 1, String(categoryIdInTree))
                        : categoriesAndColors.categories.push(String(categoryIdInTree));
                });
                // Pushes category name to array to be filtered out from "haku" search param to be added to "kategoria" searchparam.
                searchCategoriesAndColorsNames.push(categoryNameLowerCase);
            }
        });

        const initialValue = '';

        // Filter all found color and category names to "kategoria" and "varit" params, leaving the rest of search to be added in "haku" param.
        const filteredSearchWithSpace = searchCategoriesAndColorsNames.reduce((accumulator, currValue, index) => {
            if (index === 0) {
                return formData.search.toLowerCase().replace(currValue, '');
            } else {
                let updatedSearch = accumulator.replace(currValue, '');
                return updatedSearch;
            }
        }, initialValue);
        // Removes white space
        const filteredSearch = filteredSearchWithSpace.replace(/\s/g, '');

        // Decides which params to show based on if they have a value or not.
        switch (true) {
            case categoriesAndColors.categories[0] !== '' && categoriesAndColors.colors[0] !== '':
                setSearchParams((prevParams) => {
                    return createSearchParams({
                        ...Object.fromEntries(prevParams.entries()),
                        sivu: '1',
                        haku: filteredSearch,
                        varit: categoriesAndColors.colors,
                        kategoria: categoriesAndColors.categories,
                    });
                });
                break;
            case categoriesAndColors.categories[0] !== '':
                setSearchParams((prevParams) => {
                    prevParams.delete('varit');

                    return createSearchParams({
                        ...Object.fromEntries(prevParams.entries()),
                        sivu: '1',
                        haku: filteredSearch,
                        kategoria: categoriesAndColors.categories,
                    });
                });
                break;
            case categoriesAndColors.colors[0] !== '':
                setSearchParams((prevParams) => {
                    prevParams.delete('kategoria');

                    return createSearchParams({
                        ...Object.fromEntries(prevParams.entries()),
                        sivu: '1',
                        haku: filteredSearch,
                        varit: categoriesAndColors.colors,
                    });
                });
                break;
            case categoriesAndColors.categories[0] === '' && categoriesAndColors.colors[0] === '':
                setSearchParams((prevParams) => {
                    prevParams.delete('varit');
                    prevParams.delete('kategoria');

                    return createSearchParams({
                        ...Object.fromEntries(prevParams.entries()),
                        sivu: '1',
                        haku: formData.search,
                    });
                });
                break;
        }
    };

    // const searchParamFromUrl = searchParams.get('haku');
    const searchFieldHasInput = watch('search');

    // set search string from url to search field, if user is following a link with search string
    useEffect(() => {
        if (treeSelectedState.categoryTreeSelected) {
            reset();
        }
        if (searchFieldHasInput) {
            reset();
        }
        if (searchInput !== null) {
            setValue('search', searchInput);
        }
    }, [searchInput, setValue, reset, treeSelectedState.categoryTreeSelected]);

    const clearInputField = () => {
        reset();
        categoriesAndColors.categories = [''];
        categoriesAndColors.colors = [''];
        if (searchParams.has('haku')) {
            searchParams.delete('haku');
            searchParams.delete('varit');
            searchParams.delete('kategoria');
            searchParams.delete('sivu');
            setSearchParams(searchParams);
        }
    };

    return (
        <Stack
            component={Form}
            onSubmit={handleSubmit(onSubmit)}
            direction="row"
            // sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Search id="search-wrapper">
                <SearchIcon sx={{ fontSize: 30, color: 'primary.main', margin: '0 1rem 0 1rem' }} />
                <InputBase
                    id="search-text-input-field"
                    {...register('search', { maxLength: 40 })}
                    onFocus={() => !isDirty && treeSelectedState.setCategoryTreeSelected(false)}
                    // autoFocus
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
            <Button id="search-button" type="submit" sx={{ p: '1rem 2rem 1rem 2rem' }} disabled={!isValid || !isDirty}>
                Hae
            </Button>
        </Stack>
    );
}

export default SearchField;
