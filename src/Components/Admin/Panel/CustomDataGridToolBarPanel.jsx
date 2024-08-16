import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
    // GridToolbarFilterButton,
} from '@mui/x-data-grid';
import DataGridCustomFilter from './DataGridCustomFilterPanel';

const CustomDataGridToolBarPanel = ({ columns, localizedTextsMap, onSubmit, setFilterItems, filterItems }) => {
    return (
        <GridToolbarContainer sx={{ justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <GridToolbarQuickFilter debounceMs={750} />
            {/* <GridToolbarFilterButton /> */}
            <DataGridCustomFilter
                columns={columns}
                localizedTextsMap={localizedTextsMap}
                onSubmit={onSubmit}
                setFilterItems={setFilterItems}
                filterItems={filterItems}
            />
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};
export default CustomDataGridToolBarPanel;
