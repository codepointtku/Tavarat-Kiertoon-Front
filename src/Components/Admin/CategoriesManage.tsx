// import { useMemo } from 'react';
// import { createContext, useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Form, useSubmit, useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box, Button, Container, Divider, IconButton, Popover, Stack, TextField, Typography } from '@mui/material';

import DeselectIcon from '@mui/icons-material/Deselect';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import InputIcon from '@mui/icons-material/Input';

import HeroText from '../HeroText';
import HeroHeader from '../HeroHeader';

import type { categoriesManageLoader } from '../../Router/loaders';
import type { CategoryResponse } from '../../api';
import Tooltip from '../Tooltip';

// interface CategoryTreeIndexes {
//     [key: number]: [];
// }

interface FullTree {
    id: string;
    name: string;
    children: arrayToTree.Tree<CategoryResponse>[];
    product_count?: number;
}

interface CategoryObject {
    id: number | string;
    level: number;
    lft: number;
    name: string;
    parent: number | null;
    product_count: number;
    rght: number;
    tree_id: number;
    children?: [];
}

// const NodeContext = createContext(null)

// <NodeContext.Provider value={}>

// </NodeContext.Provider>

function CategoryTree() {
    const { categories, categoryTree } = useLoaderData() as Awaited<ReturnType<typeof categoriesManageLoader>>;
    const categoryNamesMap = categories.map((category) => category.name);

    const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(true);
    const [showDeleteErrorMessage, setShowDeleteErrorMessage] = useState<boolean>(false);
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryObject | null>(null);
    let selectedNodeRef = useRef<string | null>(null);

    const handleClick = (node: any) => {
        selectedNodeRef.current = node;
        //         Argument of type 'string | null' is not assignable to parameter of type 'SetStateAction<CategoryObject | null>'.
        //   Type 'string' is not assignable to type 'SetStateAction<CategoryObject | null>'.ts(2345)
        // let selectedNodeRef: React.MutableRefObject<string | null>
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
        children: categoryTreeMain,
    };

    const renderTree = (nodes: FullTree) => (
        <TreeItem
            key={nodes.id}
            nodeId={String(nodes.id)}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {nodes.name}
                    </Typography>

                    <Typography color="primary.main" fontSize="fontSizeSmall" fontWeight="fontWeightThin">
                        Tuotemäärä: {nodes.product_count}
                    </Typography>
                </Box>
            }
            onClick={() => handleClick(nodes)}
            expandIcon={<ArrowRightOutlinedIcon />}
            collapseIcon={<ArrowDropDownOutlinedIcon />}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node as unknown as FullTree))
                : null}
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

    const handleCategoryDelete = () => {
        if (selectedCategory?.product_count !== 0 || selectedCategory.children) {
            setShowDeletePrompt(false);
            setShowDeleteErrorMessage(true);
            return;
        }

        submit({ id: selectedCategory?.id }, { method: 'delete' });
        setShowDeletePrompt(false);
        setSelectedCategory(null);
        handleChoice(null);
    };

    const handleChoice = (value: string | null) => {
        setSelectedChoice(value);

        if (value === 'delete') {
            setShowDeletePrompt(true);
        }
    };

    return (
        <Stack id="components-wrapper" direction="row" spacing={4} justifyContent="space-between" marginBottom="1rem">
            <Box id="treeview-container" sx={{ display: 'flex', justifyContent: 'center' }}>
                <TreeView defaultExpanded={['root']} sx={{ flexGrow: 1, minWidth: 420, overflowY: 'auto' }}>
                    {renderTree(fullTree)}
                </TreeView>
            </Box>

            {/* /// --- /// */}
            {/* <NodeActionsDisplay /> :
             * i'd like to separate this logic to it's own component, but i'll just bang this up and running in here for now */}

            <Stack
                id="nodeactions-component-container"
                component={Form}
                onSubmit={handleSubmit(onSubmit)}
                direction="column"
                sx={{
                    display: 'flex',
                    flex: '1',
                    minWidth: 420,
                    padding: '1rem 2rem 2rem 2rem',
                }}
            >
                {selectedCategory !== null ? (
                    <Box id="nodeaction-btns-wrapper">
                        <Typography>Valittu: {selectedCategory?.name}</Typography>
                        <Stack direction="row" spacing={4} my="1rem" sx={{ justifyContent: 'center' }}>
                            <Tooltip title="Poista valinta">
                                <IconButton
                                    size="small"
                                    // sx={{ '&:hover': { backgroundColor: 'success.dark' } }}
                                    onClick={() => handleChoice(null)}
                                >
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
                                    <AddCircleOutlineIcon color={selectedChoice === 'add' ? 'success' : 'inherit'} />
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
                            <Tooltip title="Tuotteiden siirto toiseen kategoriaan">
                                <IconButton
                                    size="small"
                                    sx={{ '&:hover': { backgroundColor: 'info.main' } }}
                                    onClick={() => handleChoice('transfer')}
                                >
                                    <InputIcon />
                                </IconButton>
                            </Tooltip>
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
                                            onClick={handleCategoryDelete}
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

                                {showDeleteErrorMessage ? (
                                    <Box>Poistoa ei voi suorittaa koska jaadijaadi</Box>
                                ) : (
                                    <Box>Tässä on ihan vaan laatikko, ollaan delete choicessa</Box>
                                )}
                            </Box>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Stack>
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
