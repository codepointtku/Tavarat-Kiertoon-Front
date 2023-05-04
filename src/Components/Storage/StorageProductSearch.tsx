// import { Box, InputBase } from '@mui/material';
// import { styled, alpha } from '@mui/material/styles';
// import { Form, useSearchParams } from 'react-router-dom';
// import { SubmitHandler, useForm } from 'react-hook-form';

// import SearchIcon from '@mui/icons-material/Search';

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.primary.main, 0.06),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.primary.main, 0.2),
//     },
// }));

// type SearchInputValue = {
//     search: string;
// };

// function SearchField() {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const { register, handleSubmit } = useForm<SearchInputValue>();

//     const handleSearchSubmit: SubmitHandler<SearchInputValue> = (formData) => {
//         console.log(formData.search);
//         console.log(formData);
//         setSearchParams({ search: formData.search }, { replace: true });
//     };

//     return (
//         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             <Form onSubmit={handleSubmit(handleSearchSubmit)}>
//                 <Search>
//                     <InputBase
//                         autoFocus
//                         type="search"
//                         // eslint-disable-next-line react/jsx-props-no-spreading
//                         {...register('search')}
//                         placeholder="Etsi tuotteita…"
//                         startAdornment={
//                             <SearchIcon sx={{ fontSize: 30, color: 'primary.main', marginRight: '3rem' }} />
//                         }
//                         inputProps={{ 'aria-label': 'searchfield' }}
//                         sx={{ color: 'inherit', padding: '1rem 6rem 1rem 1rem' }}
//                     />
//                     {/* <Button type="submit" variant="contained" color="primary">
//                     Hae
//                 </Button> */}
//                 </Search>
//             </Form>
//         </Box>
//     );
// }

// export default SearchField;
