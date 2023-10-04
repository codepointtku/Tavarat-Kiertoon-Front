// import { useMemo } from 'react';
// import { createContext, useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useLoaderData } from 'react-router-dom';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box, Container, Stack, Typography } from '@mui/material';

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

import HeroText from '../HeroText';
import HeroHeader from '../HeroHeader';

import type { categoriesManageLoader } from '../../Router/loaders';
import type { CategoryResponse } from '../../api';
export interface CategoryTreeIndexes {
    [key: number]: [];
}

interface FullTree {
    id: string;
    name: string;
    children: arrayToTree.Tree<CategoryResponse>[];
    product_count?: number;
}

// const NodeContext = createContext(null)

// <NodeContext.Provider value={}>

// </NodeContext.Provider>

function CategoryTree() {
    const { categories, categoryTree } = useLoaderData() as Awaited<ReturnType<typeof categoriesManageLoader>>;

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    let selectedNodeRef = useRef<string | null>(null);

    const handleClick = (node: string) => {
        selectedNodeRef.current = node;
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
            onClick={() => handleClick(nodes.id)}
            expandIcon={<ArrowRightOutlinedIcon />}
            collapseIcon={<ArrowDropDownOutlinedIcon />}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node as unknown as FullTree))
                : null}
        </TreeItem>
    );

    // console.log('selectedCategory', selectedCategory);

    return (
        <Stack direction="row" spacing={4} justifyContent="space-between">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TreeView
                    aria-label="product category tree view"
                    defaultExpanded={['root']}
                    sx={{ flexGrow: 1, minWidth: 320, overflowY: 'auto' }}
                >
                    {renderTree(fullTree)}
                </TreeView>
            </Box>

            {/*
             * i'd like to separate this logic to it's own component, but i'll just bang this up and running in here for now
             */}

            <Box sx={{ display: 'flex', flexGrow: '1', border: '1px solid red', padding: '2rem' }}>
                <p>yolo</p>
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
