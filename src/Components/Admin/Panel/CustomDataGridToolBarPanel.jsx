import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
    /* GridToolbarFilterButton, */
    getGridStringOperators,
    getGridSingleSelectOperators,
} from '@mui/x-data-grid';
import DataGridCustomFilter from './DataGridCustomFilterPanel';

const CustomDataGridToolBarPanel = ({ columns, localizedTextsMap, onSubmit }) => {
    return (
        <GridToolbarContainer sx={{ justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <GridToolbarQuickFilter debounceMs={750} />
            {/* <GridToolbarFilterButton /> */}
            <DataGridCustomFilter columns={columns} localizedTextsMap={localizedTextsMap} onSubmit={onSubmit} />
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};
export default CustomDataGridToolBarPanel;
