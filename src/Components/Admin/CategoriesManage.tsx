import { useState, useRef } from 'react';
import { Form, useSubmit, useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box, Button, Container, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';

import DeselectIcon from '@mui/icons-material/Deselect';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
// import InputIcon from '@mui/icons-material/Input';

import HeroText from '../HeroText';
import HeroHeader from '../HeroHeader';
import Tooltip from '../Tooltip';

import type { categoriesManageLoader } from '../../Router/loaders';

import type { Tree } from 'array-to-tree';

// interface FullTree {
//     id: number | string;
//     name: string;
//     children: arrayToTree.Tree<CategoryResponse>[];
//     product_count?: number;
// }

interface CategoryObject {
    id: number | string; // id's are ints except the trees mandatory 'root', hence the str type
    level: number;
    lft: number;
    name: string;
    parent: number | null;
    product_count: number;
    rght: number;
    tree_id: number;
    children?: Tree<CategoryObject>[];
}

type EmptyObject = Record<string, never>;

function CategoryTree() {
    const { categories } = useLoaderData() as Awaited<ReturnType<typeof categoriesManageLoader>>;
    const categoryNamesMap = categories.map((category) => category.name);

    const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(true);
    const [showDeleteErrorMessage, setShowDeleteErrorMessage] = useState<boolean>(false);
    const [selectedChoice, setSelectedChoice] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryObject | EmptyObject | null>(null);
    let selectedNodeRef = useRef<CategoryObject | EmptyObject>({});

    const handleClick = (node: any) => {
        selectedNodeRef.current = node;

        setSelectedCategory(selectedNodeRef.current);
        setShowDeletePrompt(false);
        setShowDeleteErrorMessage(false);
    };

    const categoryTreeMain = arrayToTree(categories, {
        parentProperty: 'parent',
        customID: 'id',
    });

    const fullTree = {
        id: 'root',
        name: 'Kategoriat:',
        product_count: null,
        children: categoryTreeMain,
    };

    const renderTree = (nodes: CategoryObject) => (
        <TreeItem
            key={nodes.id}
            nodeId={String(nodes.id)}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {nodes.name}
                    </Typography>
                    {nodes.product_count === null ? null : (
                        <>
                            {nodes.product_count !== 0 ? (
                                <Typography fontSize="fontSizeSmall" fontWeight="fontWeightThin">
                                    Tuotemäärä: {nodes.product_count}
                                </Typography>
                            ) : (
                                <Typography fontSize="fontSizeSmall" fontWeight="fontWeightThin" color="error.main">
                                    Tyhjä
                                </Typography>
                            )}
                        </>
                    )}
                </Box>
            }
            onClick={() => handleClick(nodes)}
            expandIcon={<ArrowRightOutlinedIcon />}
            collapseIcon={<ArrowDropDownOutlinedIcon />}
        >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node as CategoryObject)) : null}
        </TreeItem>
    );

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            cat: '',
        },
    });

    const submit = useSubmit();

    const onSubmit = (data: any) => {
        if (selectedChoice === null || selectedChoice === undefined) {
            return null;
        }

        if (selectedChoice === 'add') {
            if (selectedCategory?.parent === null || selectedCategory?.id === 'root') {
                const newCategory = {
                    name: getValues('cat'),
                };

                submit(newCategory, { method: 'post' });
                reset();
            }

            const newCategory = {
                ...data,
                name: getValues('cat'),
                parent: selectedCategory?.id,
            };

            submit(newCategory, { method: 'post' });
            reset();
        }

        if (selectedChoice === 'mutate') {
            // parent	integer
            // nullable: true

            const mutatedCategory = {
                ...data,
                id: selectedCategory?.id,
                name: getValues('cat'),
                parent: selectedCategory?.parent,
            };

            submit(mutatedCategory, { method: 'put' });
            reset();
        }
    };

    const handleSubmitCategoryDelete = () => {
        if (selectedCategory?.product_count !== 0 || selectedCategory?.children || selectedCategory?.id === 'root') {
            setShowDeletePrompt(false);
            setShowDeleteErrorMessage(true);
            return;
        }

        // Type 'number' is not assignable to type 'string'.ts(2322)
        // This error probably comes from the CatObj type where it's id can be str | num
        submit({ id: Number(selectedCategory?.id) }, { method: 'delete' });
        setShowDeletePrompt(false);
        setSelectedCategory(null);
        handleChoice('');
    };

    const handleChoice = (value: string) => {
        setSelectedChoice(value);

        if (value === 'delete') {
            setShowDeletePrompt(true);
        }
    };

    const handleDeselect = () => {
        setSelectedCategory(null);
        handleChoice('');
        selectedNodeRef.current = {};
    };

    return (
        <Grid
            container
            id="components-wrapper"
            justifyContent="space-between"
            gap={6}
            marginBottom="1rem"
            flexWrap="wrap-reverse"
        >
            <Grid item xs={12} sm={true}>
                <Box id="treeview-container" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TreeView defaultExpanded={['root']} sx={{ flexGrow: 1, minWidth: 380, overflowY: 'auto' }}>
                        {renderTree(fullTree as unknown as CategoryObject)}
                    </TreeView>
                </Box>
            </Grid>

            {/* /// --- /// */}
            <Grid item xs={12} sm={true}>
                <Stack
                    id="nodeactions-component-container"
                    component={Form}
                    onSubmit={handleSubmit(onSubmit)}
                    direction="column"
                    sx={{
                        display: 'flex',
                        flex: '1',
                        minWidth: 380,
                        paddingTop: '1rem',
                    }}
                >
                    {selectedCategory !== null ? (
                        <Box id="nodeaction-btns-wrapper">
                            <Typography>Valittu: {selectedCategory?.name}</Typography>
                            <Stack direction="row" spacing={4} my="1rem" sx={{ justifyContent: 'center' }}>
                                <Tooltip title="Poista valinta">
                                    <IconButton size="small" onClick={handleDeselect}>
                                        <DeselectIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Lisää uusi kategoria tämän alle">
                                    <IconButton
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: 'success.dark' } }}
                                        onClick={() => handleChoice('add')}
                                        disabled={selectedCategory.level === 2}
                                    >
                                        <AddCircleOutlineIcon
                                            color={selectedChoice === 'add' ? 'success' : 'inherit'}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Nimeä uudelleen">
                                    <IconButton
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: 'warning.main' } }}
                                        onClick={() => handleChoice('mutate')}
                                    >
                                        <EditIcon color={selectedChoice === 'mutate' ? 'warning' : 'inherit'} />
                                    </IconButton>
                                </Tooltip>
                                {/* probably needs a new view @ BE: */}
                                {/* <Tooltip title="Tuotteiden siirto toiseen kategoriaan">
                                    <IconButton
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: 'info.main' } }}
                                        onClick={() => handleChoice('transfer')}
                                    >
                                        <InputIcon />
                                    </IconButton>
                                </Tooltip> */}
                                <Tooltip title="Poista">
                                    <IconButton
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: 'error.main' } }}
                                        onClick={() => handleChoice('delete')}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Divider />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flex: '1',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography>Ei valittua kategoriaa</Typography>
                        </Box>
                    )}

                    <Box id="nodestat-action-area">
                        <Stack marginTop="1.6rem">
                            {selectedChoice === 'add' && (
                                <Box>
                                    <TextField
                                        id="input-color"
                                        type="text"
                                        label="Uusi kategoria"
                                        {...register('cat', {
                                            required: {
                                                value: true,
                                                message: 'Syötä nimi',
                                            },
                                            minLength: {
                                                value: 3,
                                                message: 'Nimen tulee olla vähintään kolme merkkiä pitkä',
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: 'Maksimipituus',
                                            },
                                            validate: (val: string) => {
                                                if (categoryNamesMap.includes(val)) {
                                                    return 'Kategoria on jo järjestelmässä';
                                                }
                                            },
                                        })}
                                        color={isValid ? 'success' : 'primary'}
                                        error={!!errors.cat}
                                        helperText={errors.cat?.message?.toString() || ' '}
                                        disabled={selectedCategory?.level === 2}
                                        fullWidth
                                    />
                                    <Button
                                        type="submit"
                                        disabled={!isValid || selectedCategory?.level === 2}
                                        fullWidth
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'success.dark',
                                            },
                                        }}
                                    >
                                        Lisää
                                    </Button>
                                    {selectedCategory?.level === 2 && (
                                        <Typography fontSize="14px" color="info.main">
                                            Kategoriarakenteen syvyys on rajoitettu kolmeen tasoon
                                        </Typography>
                                    )}
                                </Box>
                            )}

                            {selectedChoice === 'mutate' && (
                                <>
                                    <TextField
                                        id="input-color"
                                        type="text"
                                        label="Nimen muokkaus"
                                        {...register('cat', {
                                            required: {
                                                value: true,
                                                message: 'Syötä nimi',
                                            },
                                            minLength: {
                                                value: 3,
                                                message: 'Nimen tulee olla vähintään kolme merkkiä pitkä',
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: 'Maksimipituus',
                                            },
                                            validate: (val: string) => {
                                                if (categoryNamesMap.includes(val)) {
                                                    return 'Kategoria on jo järjestelmässä';
                                                }
                                            },
                                        })}
                                        error={!!errors.cat}
                                        helperText={errors.cat?.message?.toString() || ' '}
                                        fullWidth
                                    />
                                    <Button
                                        type="submit"
                                        disabled={!isValid}
                                        fullWidth
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'success.dark',
                                            },
                                        }}
                                    >
                                        Vahvista
                                    </Button>
                                </>
                            )}

                            {selectedChoice === 'delete' && (
                                <Box>
                                    {showDeletePrompt && (
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ p: '1rem' }}
                                            spacing="1rem"
                                        >
                                            <Typography variant="body2">Oletko varma?</Typography>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={handleSubmitCategoryDelete}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'error.main',
                                                    },
                                                }}
                                            >
                                                Kyllä
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => setShowDeletePrompt(false)}
                                            >
                                                Peruuta
                                            </Button>
                                        </Stack>
                                    )}

                                    {showDeleteErrorMessage && (
                                        <Box>
                                            <Typography variant="body1">Poistoa ei suoritettu.</Typography>
                                            <Box paddingLeft={2}>
                                                <Typography variant="body2">
                                                    Kategorian poisto on estetty seuraavin ehdoin:
                                                </Typography>
                                                <Typography variant="body2">
                                                    Kategorian on oltava tyhjä tuotteista
                                                </Typography>
                                                <Typography variant="body2">
                                                    Kategorialla ei voi olla ala-kategorioita, vaikka ne olisivat
                                                    tyhjiä.
                                                </Typography>
                                                <Typography variant="body2">
                                                    Rakenteen ylintä osaa ei voi poistaa.
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    );
}

function CategoriesManage() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<DeviceHubIcon />} hideInAdmin />
            <HeroText title="Kategorioiden hallinta" subtext2="Lisää, muokkaa ja poista tuotekategorioita" />
            {/* <Container maxWidth="sm"> */}
            <CategoryTree />
            {/* </Container> */}
        </Container>
    );
}

export default CategoriesManage;
