// import { useMemo } from 'react';
// import { createContext, useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Form, useSubmit, useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box, Button, Container, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';

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
    id: number;
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

    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryObject | null>(null);
    let selectedNodeRef = useRef<string | null>(null);

    const handleClick = (node: any) => {
        selectedNodeRef.current = node;
        //         Argument of type 'string | null' is not assignable to parameter of type 'SetStateAction<CategoryObject | null>'.
        //   Type 'string' is not assignable to type 'SetStateAction<CategoryObject | null>'.ts(2345)
        // let selectedNodeRef: React.MutableRefObject<string | null>
        setSelectedCategory(selectedNodeRef.current);
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
        submit(data, { method: 'post' });
        reset();
    };

    const onDeleteSubmit = (color: any) => {
        submit(color, { method: 'delete' });
    };

    const onPutSubmit = (color: any) => {
        const mutatedColor = {
            id: color.id,
            name: getValues('cat'),
        };

        submit(mutatedColor, { method: 'put' });

        reset();
    };

    const handleChoice = (value: string) => {
        console.log(value);
        setSelectedChoice(value);
    };

    console.log(selectedChoice);
    return (
        <Stack direction="row" spacing={4} justifyContent="space-between" marginBottom="1rem">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TreeView
                    aria-label="product category tree view"
                    defaultExpanded={['root']}
                    sx={{ flexGrow: 1, minWidth: 420, overflowY: 'auto' }}
                >
                    {renderTree(fullTree)}
                </TreeView>
            </Box>

            {/* ////// ----- ///// */}

            {/* <NodeDataDisplay /> :
             * i'd like to separate this logic to it's own component, but i'll just bang this up and running in here for now
             */}

            <Box
                id="nodestats-component-wrapper"
                my="1rem"
                sx={{ display: 'flex', flexGrow: '1', padding: '0 2rem 2rem 2rem' }}
            >
                <Box id="nodestats-stats-container" sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
                    {/* id: 1,
    product_count: 32,
    name: 'Huonekalut',
    lft: 1,
    rght: 38,
    tree_id: 1,
    level: 0,
    parent: null, */}

                    {selectedCategory !== null ? (
                        <Box id="nodestat-wrapper">
                            <Typography>Valittu: {selectedCategory?.name}</Typography>
                            <Stack direction="row" spacing={4} my="1rem">
                                <Tooltip title="Lisää uusi kategoria tämän alle">
                                    <IconButton
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: 'success.main' } }}
                                        onClick={() => handleChoice('add')}
                                    >
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Nimeä uudelleen">
                                    <IconButton
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: 'warning.main' } }}
                                        onClick={() => handleChoice('mutate')}
                                    >
                                        <EditIcon />
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
                        </Box>
                    ) : (
                        <Typography>Ei valittua kategoriaa</Typography>
                    )}
                </Box>

                {/* <Stack spacing={2} sx={{ border: '1px solid blue' }}>
                    <Typography>Uuden katin lisäys</Typography>
                    <Divider />
                    <TextField
                        id="input-color"
                        type="text"
                        label="Uusi väri"
                        {...register('cat', {
                            required: {
                                value: true,
                                message: 'Syötä katti',
                            },
                            minLength: {
                                value: 3,
                                message: 'Katin tulee olla vähintään kolme merkkiä pitkä',
                            },
                            maxLength: {
                                value: 30,
                                message: 'Maksimipituus',
                            },
                            validate: (val: string) => {
                                if (categoriesMap.includes(val)) {
                                    return 'Katti on jo järjestelmässä';
                                }
                            },
                        })}
                        error={!!errors.cat}
                        helperText={errors.cat?.message?.toString() || ' '}
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
                        Lisää katti
                    </Button>
                </Stack> */}
            </Box>
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
