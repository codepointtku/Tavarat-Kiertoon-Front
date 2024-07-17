import { Link } from 'react-router-dom';

import { Stack, Button } from '@mui/material';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    getGridStringOperators,
    getGridSingleSelectOperators,
} from '@mui/x-data-grid';

import TypographyTitle from '../TypographyTitle';
import type { GridColDef } from '@mui/x-data-grid';
import { ProductStorageResponse, storagesApi } from '../../api';
import { useEffect, useState } from 'react';
import DataGridCustomFilter from './Panel/DataGridCustomFilterPanel';
import CustomDataGridToolBarPanel from './Panel/CustomDataGridToolBarPanel';

function ProductsGrid() {
    //const { products } = useLoaderData() as Awaited<ReturnType<typeof storageProductsLoader>>;
    //const { count, /* next, previous, */ results } = products;
    const [rowData, setRowData] = useState<ProductStorageResponse[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 25,
    });
    const [filterModel, setFilterModel] = useState<{ items: []; quickFilterValues: any[] | undefined }>({
        items: [],
        quickFilterValues: [''],
    });

    const fetchData = async (
        page: number,
        pageSize: number,
        barcodeSearch?: string | undefined,
        category?: number[] | undefined,
        ordering?: string | undefined,
        search?: string | undefined,
        storage?: string | undefined
    ) => {
        const { data: products } = await storagesApi.storagesProductsList(
            true,
            barcodeSearch,
            category,
            ordering,
            page,
            pageSize,
            search,
            storage
        );
        const results = products.results !== undefined ? products.results : [];
        setRowData(results);
        setTotalAmount(products.count !== undefined ? products.count : 0);
    };
    useEffect(() => {
        fetchData(paginationModel.page + 1, paginationModel.pageSize);
    }, []);
    // UPD: BE has new endpoint @ storagesApi (/storages/products). It contains more information than this productApi (/products).

    // productsApi contains:

    // {
    //   "count": 123,
    //   "next": "http://api.example.org/accounts/?page=4",
    //   "previous": "http://api.example.org/accounts/?page=2",
    //   "results": [
    //     {
    //       "id": 0,
    //       "pictures": [
    //         {
    //           "id": 0,
    //           "picture_address": "string"
    //         }
    //       ],
    //       "amount": 0,
    //       "total_amount": 0,
    //       "name": "string",
    //       "price": 0,
    //       "free_description": "string",
    //       "measurements": "string",
    //       "weight": 0,
    //       "category": 0,
    //       "colors": [
    //         0
    //       ]
    //     }
    //   ]
    // }

    const containFilterOperator = getGridStringOperators().filter((val) => val.value === 'contains');
    const columns: GridColDef[] = [
        {
            field: 'product_items',
            headerName: 'Viivakoodi',
            renderCell: (params) => params.value[0].barcode,
            flex: 1,
            filterOperators: containFilterOperator,
        },
        { field: 'name', headerName: 'Tuotenimi', flex: 2, filterOperators: containFilterOperator },
        { field: 'amount', headerName: 'Vapaana', flex: 1, filterable: false },
        { field: 'total_amount', headerName: 'Järjestelmässä', flex: 1, filterable: false },
        // { field: 'category', headerName: 'Kategoriatunnus', flex: 1 },
        { field: 'free_description', headerName: 'Kuvaus', flex: 1, filterOperators: containFilterOperator },
        {
            field: 'id',
            headerName: 'Toiminnot',
            filterable: false,
            renderCell: (params) => (
                <Button component={Link} to={`/admin/tuotteet/${params.value}`} variant="outlined">
                    Avaa
                </Button>
            ),
        },
    ];

    const localizedTextsMap = {
        // https://github.com/mui/mui-x/blob/master/packages/grid/x-data-grid/src/locales/fiFI.ts
        // Root
        noRowsLabel: 'Ei rivejä',
        noResultsOverlayLabel: 'Ei tuloksia.',

        // Density selector toolbar button text
        toolbarDensity: 'Rivit',
        toolbarDensityLabel: 'Riviväli',
        toolbarDensityCompact: 'Kompakti',
        toolbarDensityStandard: 'Vakio',
        toolbarDensityComfortable: 'Tilava',

        // Columns selector toolbar button text
        toolbarColumns: 'Kolumnit',
        toolbarColumnsLabel: 'Valitse kolumnit',

        // Filters toolbar button text
        toolbarFilters: 'Suodattimet',
        toolbarFiltersLabel: 'Näytä suodattimet',
        toolbarFiltersTooltipHide: 'Piilota suodattimet',
        toolbarFiltersTooltipShow: 'Näytä suodattimet',
        toolbarFiltersTooltipActive: (count: any) =>
            count !== 1 ? `${count} aktiivista suodatinta` : `${count} aktiivinen suodatin`,

        // Quick filter toolbar field
        toolbarQuickFilterPlaceholder: 'Hae…',
        toolbarQuickFilterLabel: 'Hae',
        toolbarQuickFilterDeleteIconLabel: 'Tyhjennä',

        // Export selector toolbar button text
        toolbarExport: 'Vie',
        toolbarExportLabel: 'Vie',
        toolbarExportCSV: 'Lataa CSV-muodossa',
        toolbarExportPrint: 'Tulosta',
        toolbarExportExcel: 'Lataa Excel-muodossa',

        // Columns panel text
        columnsPanelTextFieldLabel: 'Etsi kolumni',
        columnsPanelTextFieldPlaceholder: 'Kolumnin otsikko',
        columnsPanelDragIconLabel: 'Järjestä kolumni uudelleen',
        columnsPanelShowAllButton: 'Näytä kaikki',
        columnsPanelHideAllButton: 'Piilota kaikki',

        // Filter panel text
        filterPanelAddFilter: 'Lisää suodatin',
        // filterPanelRemoveAll: 'Remove all',
        filterPanelDeleteIconLabel: 'Poista',
        filterPanelLogicOperator: 'Logiikkaoperaattori',
        filterPanelOperator: 'Operaattorit',
        filterPanelOperatorAnd: 'Ja',
        filterPanelOperatorOr: 'Tai',
        filterPanelColumns: 'Kolumnit',
        filterPanelInputLabel: 'Arvo',
        filterPanelInputPlaceholder: 'Suodattimen arvo',

        // Filter operators text
        filterOperatorContains: 'sisältää',
        filterOperatorEquals: 'on yhtä suuri',
        filterOperatorStartsWith: 'alkaa',
        filterOperatorEndsWith: 'päättyy',
        filterOperatorIs: 'on',
        filterOperatorNot: 'ei ole',
        filterOperatorAfter: 'on jälkeen',
        filterOperatorOnOrAfter: 'on sama tai jälkeen',
        filterOperatorBefore: 'on ennen',
        filterOperatorOnOrBefore: 'on sama tai ennen',
        filterOperatorIsEmpty: 'on tyhjä',
        filterOperatorIsNotEmpty: 'ei ole tyhjä',
        filterOperatorIsAnyOf: 'mikä tahansa seuraavista',
        // 'filterOperator=': '=',
        // 'filterOperator!=': '!=',
        // 'filterOperator>': '>',
        // 'filterOperator>=': '>=',
        // 'filterOperator<': '<',
        // 'filterOperator<=': '<=',

        // Header filter operators text
        // headerFilterOperatorContains: 'Contains',
        // headerFilterOperatorEquals: 'Equals',
        // headerFilterOperatorStartsWith: 'Starts with',
        // headerFilterOperatorEndsWith: 'Ends with',
        // headerFilterOperatorIs: 'Is',
        // headerFilterOperatorNot: 'Is not',
        // headerFilterOperatorAfter: 'Is after',
        // headerFilterOperatorOnOrAfter: 'Is on or after',
        // headerFilterOperatorBefore: 'Is before',
        // headerFilterOperatorOnOrBefore: 'Is on or before',
        // headerFilterOperatorIsEmpty: 'Is empty',
        // headerFilterOperatorIsNotEmpty: 'Is not empty',
        // headerFilterOperatorIsAnyOf: 'Is any of',
        // 'headerFilterOperator=': 'Equals',
        // 'headerFilterOperator!=': 'Not equals',
        // 'headerFilterOperator>': 'Greater than',
        // 'headerFilterOperator>=': 'Greater than or equal to',
        // 'headerFilterOperator<': 'Less than',
        // 'headerFilterOperator<=': 'Less than or equal to',

        // Filter values text
        filterValueAny: 'mikä tahansa',
        filterValueTrue: 'tosi',
        filterValueFalse: 'epätosi',

        // Column menu text
        columnMenuLabel: 'Valikko',
        columnMenuShowColumns: 'Näytä kolumnit',
        // columnMenuManageColumns: 'Manage columns',
        columnMenuFilter: 'Suodata',
        columnMenuHideColumn: 'Piilota',
        columnMenuUnsort: 'Poista järjestys',
        columnMenuSortAsc: 'Järjestä nousevasti',
        columnMenuSortDesc: 'Järjestä laskevasti',

        // Column header text
        columnHeaderFiltersTooltipActive: (count: any) =>
            count !== 1 ? `${count} aktiivista suodatinta` : `${count} aktiivinen suodatin`,
        columnHeaderFiltersLabel: 'Näytä suodattimet',
        columnHeaderSortIconLabel: 'Järjestä',

        // Rows selected footer text
        footerRowSelected: (count: any) =>
            count !== 1 ? `${count.toLocaleString()} riviä valittu` : `${count.toLocaleString()} rivi valittu`,

        // Total row amount footer text
        footerTotalRows: 'Rivejä yhteensä:',

        // Total visible row amount footer text
        footerTotalVisibleRows: (visibleCount: any, totalCount: any) =>
            `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,

        // Checkbox selection text
        checkboxSelectionHeaderName: 'Valintaruutu',
        checkboxSelectionSelectAllRows: 'Valitse kaikki rivit',
        checkboxSelectionUnselectAllRows: 'Poista kaikkien rivien valinta',
        checkboxSelectionSelectRow: 'Valitse rivi',
        checkboxSelectionUnselectRow: 'Poista rivin valinta',

        // Boolean cell text
        booleanCellTrueLabel: 'tosi',
        booleanCellFalseLabel: 'epätosi',

        // Actions cell more text
        actionsCellMore: 'lisää',

        // Column pinning text
        pinToLeft: 'Kiinnitä vasemmalle',
        pinToRight: 'Kiinnitä oikealle',
        unpin: 'Irrota kiinnitys',

        // Tree Data
        treeDataGroupingHeaderName: 'Ryhmä',
        treeDataExpand: 'Laajenna',
        treeDataCollapse: 'Supista',

        // Grouping columns
        groupingColumnHeaderName: 'Ryhmä',
        groupColumn: (name: any) => `Ryhmittelyperuste ${name}`,
        unGroupColumn: (name: any) => `Poista ryhmittelyperuste ${name}`,

        // Master/detail
        detailPanelToggle: 'Yksityiskohtapaneelin vaihto',
        expandDetailPanel: 'Laajenna',
        collapseDetailPanel: 'Tiivistä',

        // Row reordering text
        rowReorderingHeaderName: 'Rivien uudelleenjärjestely',

        // Aggregation
        aggregationMenuItemHeader: 'Koostaminen',
        aggregationFunctionLabelSum: 'summa',
        aggregationFunctionLabelAvg: 'ka.',
        aggregationFunctionLabelMin: 'min.',
        aggregationFunctionLabelMax: 'maks.',
        aggregationFunctionLabelSize: 'koko',
    };

    const onSubmit = async (formdata: {
        filterForm: Array<{ column: string; filter: string; value: string; andor: string | undefined }>;
    }) => {
        let search = undefined;
        let barcode = undefined;
        let storage = undefined;
        let category = undefined;
        formdata.filterForm.map((form) => {
            const column = form.column;
            const filter = form.filter;
            const value = form.value;
            const andor = form.andor;

            switch (column) {
                case 'name':
                    search = value;
                    break;
                case 'free_description':
                    search = value;
                    break;
                case 'product_items':
                    barcode = value;
                    break;
            }
            console.log(column, value);
            if (andor == 'and') {
                console.log('jippii');
            }
        });
        fetchData(1, paginationModel.pageSize, barcode, category, undefined, search, storage);
    };

    if (!rowData) return null;
    const GridX = () => {
        return (
            <div style={{ height: 500 }}>
                <DataGrid
                    // paginationMode={'server'}
                    // rowCount={pageCount}
                    rowCount={totalAmount}
                    rows={rowData}
                    columns={columns}
                    sortingMode="server"
                    filterMode="server"
                    paginationMode="server"
                    pagination
                    paginationModel={paginationModel}
                    filterModel={filterModel}
                    onPaginationModelChange={async (newPaginationModel) => {
                        // fetch data from server
                        setPaginationModel(newPaginationModel);
                        fetchData(newPaginationModel.page + 1, newPaginationModel.pageSize);
                    }}
                    onSortModelChange={async (newSortModel) => {
                        console.log(newSortModel);
                    }}
                    onFilterModelChange={async (newFilterModel) => {
                        // fetch data from server
                        console.log(newFilterModel);
                        setPaginationModel({
                            page: 0,
                            pageSize: paginationModel.pageSize,
                        });
                        fetchData(
                            1,
                            paginationModel.pageSize,
                            newFilterModel.quickFilterValues ? newFilterModel.quickFilterValues[0] : undefined
                        );
                        setFilterModel({ items: [], quickFilterValues: newFilterModel.quickFilterValues });
                    }}
                    slots={{
                        toolbar: () => {
                            return (
                                <CustomDataGridToolBarPanel
                                    columns={columns}
                                    localizedTextsMap={localizedTextsMap}
                                    onSubmit={onSubmit}
                                />
                            );
                        },
                    }}
                    // checkboxSelection
                    localeText={localizedTextsMap}
                    // showColumnVerticalBorder
                    // showCellVerticalBorder
                    // loading
                />
            </div>
        );
    };

    return (
        <Stack id="components-stack" alignItems="center" width="100%">
            <TypographyTitle text="Kaikki tuotteet" />
            <div
                id="datagrid-parent"
                style={{ display: 'flex', height: '100%', width: '100%', margin: '1rem 0 1rem 0' }}
            >
                <div id="datagrid-child" style={{ flexGrow: 1 }}>
                    <GridX />
                </div>
            </div>
        </Stack>
    );
}

export default ProductsGrid;
