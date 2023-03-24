import { useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function useExpandedCategories(categoryParam, categories) {
    return useMemo(() => {
        const expandedCategories = [];
        const categoryId = Number(categoryParam);

        if (categoryParam) {
            let parent = categoryId;
            while (parent) {
                const category = categories.find(({ id }) => id === parent);
                expandedCategories.push(String(category.id));
                parent = category.parent;
            }
            expandedCategories.reverse();
        }

        return expandedCategories;
    }, []);
}

function CategoryTree() {
    const { categories } = useRouteLoaderData('root');

    const [searchParams, setSearchParams] = useSearchParams();

    const categoryParam = searchParams.get('kategoria');

    const handleClick = (kategoria) => {
        if (kategoria !== 'root') {
            setSearchParams({ kategoria });
        }
    };

    const categoryTreeMain = arrayToTree(categories, {
        parentProperty: 'parent',
        customID: 'id',
    });

    const expandedCategories = useExpandedCategories(categoryParam, categories);

    const fullTree = {
        id: 'root',
        name: 'Kaikki tuotteet',
        children: categoryTreeMain,
    };

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={String(nodes.id)} label={nodes.name} onClick={() => handleClick(nodes.id)}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TreeView
                aria-label="product category tree view"
                defaultExpanded={['root', ...expandedCategories]}
                selected={categoryParam}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ flexGrow: 1, maxWidth: 320, overflowY: 'auto' }}
            >
                {renderTree(fullTree)}
            </TreeView>
        </Box>
    );
}

export default CategoryTree;
