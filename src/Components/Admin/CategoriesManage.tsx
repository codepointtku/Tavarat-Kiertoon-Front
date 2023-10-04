// import { useMemo } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box, Typography } from '@mui/material';

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

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

function CategoryTree() {
    const { categories, categoryTree } = useLoaderData() as Awaited<ReturnType<typeof categoriesManageLoader>>;
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParams = searchParams.getAll('kategoria');
    const categoryTreeIndexes = categoryTree as unknown as CategoryTreeIndexes;

    const handleClick = (categoryId: string) => {
        const iniParams = new URLSearchParams(searchParams);
        iniParams.delete('kategoria');
        iniParams.delete('sivu');
        iniParams.delete('haku');
        iniParams.delete('varit');
        if (categoryId !== 'root') {
            categoryTreeIndexes[categoryId as unknown as number].forEach((each: string) => {
                iniParams.append('kategoria', each);
            });
        }
        setSearchParams(iniParams);
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
                    <Typography
                        variant="caption"
                        color="primary.main"
                        fontSize="fontSizeSmall"
                        fontWeight="fontWeightThin"
                    >
                        {nodes.product_count}
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

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TreeView
                aria-label="product category tree view"
                defaultExpanded={['root']}
                selected={categoryParams}
                sx={{ flexGrow: 1, minWidth: 620, overflowY: 'auto' }}
            >
                {renderTree(fullTree)}
            </TreeView>
        </Box>
    );
}

function CategoriesManage() {
    // const { categories, categoryTree } = useLoaderData() as Awaited<ReturnType<typeof categoriesManageLoader>>;

    // console.log('cats', categories);
    // console.log('tree', categoryTree);

    return <CategoryTree />;
}

export default CategoriesManage;
