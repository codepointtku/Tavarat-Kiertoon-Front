import { Link } from 'react-router-dom';

import { Stack, Button, Box, Select, MenuItem, SelectProps } from '@mui/material';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    getGridDefaultColumnTypes,
    getGridStringOperators,
    getGridSingleSelectOperators,
    useGridApiRef,
} from '@mui/x-data-grid';

import TypographyTitle from '../TypographyTitle';

import type {
    GridCellParams,
    GridColDef,
    GridFilterInputValueProps,
    GridFilterItem,
    GridFilterModel,
    GridFilterOperator,
    GridRowId,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { OrderDetailResponse, OrderResponse, ordersApi } from '../../api';
import DataGridCustomFilter from './DataGridCustomFilterPanel';

function OrdersGrid() {
    const [rowData, setRowData] = useState<OrderResponse[] | OrderDetailResponse[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 25,
    });
    const defaultColumnTypes = getGridDefaultColumnTypes();
    const apiRef = useGridApiRef();
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
        quickFilterValues: [''],
    });

    const fetchData = async (
        page = 1,
        pageSize = 25,
        id = undefined,
        orderInfo = undefined,
        recipient = undefined,
        recipientPhone = undefined,
        delivery_address = undefined,
        ordering = undefined,
        orderStatus = undefined
    ) => {
        const { data: orders } = await ordersApi.ordersList(
            delivery_address,
            id,
            orderInfo,
            ordering,
            page,
            pageSize,
            recipient,
            recipientPhone,
            orderStatus
        );
        const results = orders.results !== undefined ? orders.results : [];
        console.log('what');
        setRowData(results);
        setTotalAmount(orders.count !== undefined ? orders.count : 0);
        return { row: results, totalcount: orders.count };
    };
    useEffect(() => {
        fetchData(paginationModel.page + 1, paginationModel.pageSize);
    }, []);

    const restorePaginationState = () => {
        // <---------- Step 4
        const state = apiRef.current.exportState();
        const restoredState = {
            ...state,
            pagination: {
                ...state.pagination,
                paginationModel: {
                    ...state.pagination?.paginationModel,
                    page: 0, // <-- Set the page to the first page
                    pageSize: 25, // <-- Specify the pageSize based on the requirements of your grid.
                },
            },
        };
        apiRef.current.restoreState(restoredState);
    };
    //     "results": [
    //     {
    //       "id": 0,
    //       "status": "string",
    //       "delivery_address": "string",
    //       "delivery_required": true,
    //       "recipient": "string",
    //       "order_info": "string",
    //       "delivery_date": "2023-06-28T11:37:57.850Z",
    //       "recipient_phone_number": "string",
    //       "creation_date": "2023-06-28T11:37:57.850Z",
    //       "user": 0,
    //       "product_items": [
    //         0
    //       ]
    //     }
    //   ]
    const statusOptions: { value: string; label: string }[] = [
        { value: 'Waiting', label: 'Odottaa' },
        { value: 'Processing', label: 'Käsittelyssä' },
        { value: 'Finished', label: 'Toimitettu' },
    ];
    const filterOperators = getGridSingleSelectOperators()
        .filter((operator) => operator.value === 'is')
        .map((operator) => {
            const newOperator = { ...operator };
            const newGetApplyFilterFn = (filterItem: GridFilterItem, column: GridColDef) => {
                return (params: GridCellParams): boolean => {
                    let isOk = true;
                    filterItem?.value?.forEach((fv: any) => {
                        const paramval: any = params.value;
                        isOk = isOk && paramval.includes(fv);
                    });
                    return isOk;
                };
            };
            newOperator.getApplyFilterFn = newGetApplyFilterFn;
            return newOperator;
        });

    const columns: GridColDef[] = [
        {
            field: 'ordernumber',
            headerName: 'Tilausnumero',
            valueGetter: (params: GridValueGetterParams) => `${params.row.id || ''}`,
        },
        {
            field: 'status',
            headerName: 'Tila',
            type: 'singleSelect',
            valueOptions: [
                { value: 'Waiting', label: 'Odottaa' },
                { value: 'Processing', label: 'Käsittelyssä' },
                { value: 'Finished', label: 'Toimitettu' },
            ],
            valueFormatter: ({ id, value, field, api }) => statusOptions.find((opt) => opt.value === value)?.label,

            filterOperators: filterOperators,
        },
        {
            field: 'delivery_address',
            headerName: 'Toimitusosoite',
            valueGetter: (params: GridValueGetterParams) => {
                if (params.row.delivery_address === 'nouto') {
                    return '-';
                } else {
                    return params.row.delivery_address;
                }
            },
            flex: 2,
        },
        { field: 'recipient', headerName: 'Vastaanottaja', flex: 1 },
        { field: 'recipient_phone_number', headerName: 'Puhelinnumero', flex: 1 },
        {
            field: 'delivery_required',
            headerName: 'Toimitus',
            //exclude_filter: true,
            valueGetter: (params: GridValueGetterParams) =>
                params.row.delivery_required === true ? 'Kuljetus' : 'Nouto',
        },
        { field: 'order_info', headerName: 'Lisätiedot', flex: 1 },
        {
            field: 'id',
            headerName: 'Toiminnot',
            //exclude_filter: true,
            renderCell: (params) => (
                <Button variant="outlined" component={Link} to={`/admin/tilaukset/${params.value}`}>
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

    const onSubmit = async (formdata: object) => {
        console.log(formdata);

        fetchData(1, paginationModel.pageSize);
    };
    if (!rowData) return null;
    const DataGridToolBar = () => {
        return (
            <GridToolbarContainer>
                <DataGridCustomFilter columns={columns} localizedTextsMap={localizedTextsMap} onSubmit={onSubmit} />
            </GridToolbarContainer>
        );
    };
    const Customtoolbar = () => {
        return (
            <GridToolbarContainer sx={{ justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <GridToolbarQuickFilter />
                <GridToolbarFilterButton />
                <DataGridCustomFilter columns={columns} localizedTextsMap={localizedTextsMap} onSubmit={onSubmit} />
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    };
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
                    //paginationModel={paginationModel}
                    filterModel={filterModel}
                    apiRef={apiRef}
                    onPaginationModelChange={(newPaginationModel, details) => {
                        // fetch data from server
                        console.log('guh');
                        fetchData(newPaginationModel.page + 1, newPaginationModel.pageSize);
                    }}
                    onSortModelChange={(newSortModel, details) => {
                        console.log(newSortModel);
                    }}
                    onFilterModelChange={(newFilterModel, details) => {
                        // fetch data from server
                        console.log(newFilterModel);
                        console.log(details);

                        if (
                            filterModel.items.length > 0 &&
                            filterModel.items[0].value == newFilterModel.items[0].value
                        ) {
                            return setFilterModel(newFilterModel);
                        }
                        restorePaginationState();
                        console.log('huh');
                        if (newFilterModel.items.length > 0) {
                            switch (newFilterModel.items[0].field) {
                                case 'ordernumber':
                                    fetchData(
                                        paginationModel.page + 1,
                                        paginationModel.pageSize,
                                        newFilterModel.items[0].value
                                    );
                                    break;
                                case 'order_info':
                                    fetchData(
                                        paginationModel.page + 1,
                                        paginationModel.pageSize,
                                        undefined,
                                        newFilterModel.items[0].value
                                    );
                                case 'recipient':
                                    fetchData(
                                        paginationModel.page + 1,
                                        paginationModel.pageSize,
                                        undefined,
                                        undefined,
                                        newFilterModel.items[0].value
                                    );
                                case 'recipient_phone_number':
                                    fetchData(
                                        paginationModel.page + 1,
                                        paginationModel.pageSize,
                                        undefined,
                                        undefined,
                                        undefined,
                                        newFilterModel.items[0].value
                                    );
                                case 'delivery_address':
                                    fetchData(
                                        paginationModel.page + 1,
                                        paginationModel.pageSize,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        newFilterModel.items[0].value
                                    );
                                case 'status':
                                    fetchData(
                                        paginationModel.page + 1,
                                        paginationModel.pageSize,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        newFilterModel.items[0].value
                                    );
                            }
                        }

                        setFilterModel(newFilterModel);
                    }}
                    /*slots={{
                        toolbar: DataGridToolBar,
                    }}*/
                    slots={{
                        toolbar: Customtoolbar,
                    }}
                    localeText={localizedTextsMap}
                    // checkboxSelection
                    // showColumnVerticalBorder
                    // showCellVerticalBorder
                    // loading
                />
            </div>
        );
    };

    return (
        <Stack id="components-stack" alignItems="center" width="100%">
            <TypographyTitle text="Kaikki tilaukset" />
            <div
                id="datagrid-parent"
                style={{ display: 'flex', height: '100%', width: '100%', margin: '1rem 0 1rem 0' }}
            >
                <div id="datagrid-child" style={{ flex: 1 }}>
                    <GridX />
                </div>
            </div>
        </Stack>
    );
}

export default OrdersGrid;
