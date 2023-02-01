import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function CategoryTree() {
    return (
        <TreeView
            aria-label="category navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto', p: 4 }}
        >
            <TreeItem nodeId="1" label="Tuotekategoriat">
                <TreeItem nodeId="10" label="Huonekalut" />
                <TreeItem nodeId="11" label="Laitteet" />
                <TreeItem nodeId="12" label="Sähköpyörät" />
            </TreeItem>

            <TreeItem nodeId="2" label="Tiedotteet">
                <TreeItem nodeId="20" label="Ajankohtaista" />
                <TreeItem nodeId="30" label="Arkisto" />
            </TreeItem>

            <TreeItem nodeId='40' label="Ohjeet">
                <TreeItem nodeId='41' label='Tilaaminen' />
                <TreeItem nodeId='42' label='Noutokuljetus' />
            </TreeItem>
        </TreeView>
    );
}

export default CategoryTree;