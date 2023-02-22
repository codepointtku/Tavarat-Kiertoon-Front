import { useRouteLoaderData } from 'react-router-dom';

import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import arrayToTree from 'array-to-tree';

function CategoryTree() {
    const { categories } = useRouteLoaderData('root');

    const categoryTreeMain = arrayToTree(categories, {
        parentProperty: 'parent',
        customID: 'id',
    });

    const data = {
        id: 'root',
        name: 'Tuotekategoriat',
        children: categoryTreeMain,
    };

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={String(nodes.id)} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, maxWidth: 320, overflowY: 'auto' }}
        >
            {renderTree(data)}
        </TreeView>
    );
}

export default CategoryTree;
