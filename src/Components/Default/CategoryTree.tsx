import { useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box, Typography } from '@mui/material';

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import type { TreeSelectedProps } from './SearchField';
import type { rootLoader } from '../../Router/loaders';
import type { CategoryResponse } from '../../api';
import type { CategoryTreeIndexes } from './SearchField';

function useExpandedCategories(categoryParam: string, categories: { id: number; parent: null | number }[]) {
    return useMemo(() => {
        const expandedCategories = [];
        const categoryId = Number(categoryParam);

        if (categoryParam) {
            let parent = categoryId as null | undefined | number;
            const findParentCategory = (category: { id: number }) => category.id === parent;

            while (parent) {
                const category = categories.find(findParentCategory);
                expandedCategories.push(String(category?.id));
                parent = category?.parent;
            }
            expandedCategories.reverse();
        }

        return expandedCategories;
    }, [categoryParam, categories]);
}

interface FullTree {
    id: string;
    name: string;
    children: arrayToTree.Tree<CategoryResponse>[];
    product_count?: number;
}

function CategoryTree({ treeSelectedState }: TreeSelectedProps) {
    const { categoryTree, categories } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
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

        treeSelectedState.setCategoryTreeSelected(true);
    };

    const categoryTreeMain = arrayToTree(categories, {
        parentProperty: 'parent',
        customID: 'id',
    });

    const expandedCategories = useExpandedCategories(categoryParams[0], categories);

    const fullTree = {
        id: 'root',
        name: 'Kaikki tuotteet',
        children: categoryTreeMain,
    };

    const renderTree = (nodes: FullTree) => (
        <TreeItem
            key={nodes.id}
            nodeId={String(nodes.id)}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 0.8 }}>
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
        <Box
            sx={{
                display: 'flex',
                // justifyContent: 'center',
                outline: '1px solid blue',
                width: 260,
            }}
        >
            <TreeView
                aria-label="product category tree view"
                defaultExpanded={['root', ...expandedCategories]}
                selected={categoryParams}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
            >
                {renderTree(fullTree)}
            </TreeView>
        </Box>
    );
}

export default CategoryTree;
