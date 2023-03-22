import { useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box, Typography } from '@mui/material';

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

function useExpandedCategories(categoryParam, categories) {
    return useMemo(() => {
        const expandedCategories = [];
        const categoryId = Number(categoryParam);

        if (categoryParam) {
            let parent = categoryId;
            const findParentCategory = (category) => category.id === parent;

            while (parent) {
                const category = categories.find(findParentCategory);
                expandedCategories.push(String(category.id));
                parent = category.parent;
            }
            expandedCategories.reverse();
        }

        return expandedCategories;
    }, []);
}

function CategoryTree() {
    const { categoryTree, categories } = useRouteLoaderData('root');
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParams = searchParams.getAll('kategoria');

    const handleClick = (categoryId) => {
        const iniParams = new URLSearchParams();
        if (categoryId === 'root') {
            iniParams.delete('kategoria');
        } else {
            categoryTree[categoryId].forEach((each) => {
                iniParams.append('kategoria', each);
            });
        }
        setSearchParams(iniParams);
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

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={String(nodes.id)}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.8 }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {nodes.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="primary.main"
                        fontSize="fontSizeSmall"
                        fontWeight="fontWeightThin"
                    >
                        {123}
                    </Typography>
                </Box>
            }
            onClick={() => handleClick(nodes.id)}
            expandIcon={<ArrowRightOutlinedIcon />}
            collapseIcon={<ArrowDropDownOutlinedIcon />}
        >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TreeView
                aria-label="product category tree view"
                defaultExpanded={['root', ...expandedCategories]}
                selected={categoryParams}
                sx={{ flexGrow: 1, maxWidth: 320, overflowY: 'auto' }}
            >
                {renderTree(fullTree)}
            </TreeView>
        </Box>
    );
}

export default CategoryTree;
