import { useRouteLoaderData, useSearchParams } from 'react-router-dom';

import arrayToTree from 'array-to-tree';

import { TreeView, TreeItem } from '@mui/lab';
import { Box } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// caturl={`localhost:8000/categories/${nodes.id}/products`}

function CategoryTree() {
    const { categories } = useRouteLoaderData('root');

    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get('kategoria');

    const handleClick = (kategoria) => {
        setSearchParams({ kategoria });
    };

    const categoryTreeMain = arrayToTree(categories, {
        parentProperty: 'parent',
        customID: 'id',
    });

    const fullTree = {
        id: 'root',
        name: 'Kaikki tuotteet',
        children: categoryTreeMain,
    };

    const renderTree = (nodes) => {
        return (
            <TreeItem key={nodes.id} nodeId={String(nodes.id)} label={nodes.name} onClick={() => handleClick(nodes.id)}>
                {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
            </TreeItem>
        );
    };

    console.log('categoryTreeMain:', categoryTreeMain);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TreeView
                aria-label="product category tree view"
                defaultExpanded={['root', '6', '7', '8']}
                selected={category}
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
